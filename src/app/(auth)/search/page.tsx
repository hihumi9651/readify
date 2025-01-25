'use client'

import React, { useEffect, useState, useCallback, Suspense  } from 'react';
import debounce from 'lodash/debounce';
import { useBookSearch } from "@/app/_hooks/useBookSearch";
import { useFirebaseAuth } from '@/app/_hooks/useFirebaseAuth';
import { BookCard } from "@/app/_components/ui/BookCard/BookCard.test";
import { BookWithStatus, RegisteredBookStatus } from "@/app/_types/books";
import Loading from '@/app/loading';


export default function BookshelfPage() {
  return (
      <Suspense fallback={<Loading />}>
          <BookshelfContent />
      </Suspense>
  )
}

function BookshelfContent() {

  const firebaseAuth = useFirebaseAuth();
  const { books, loading, error, search } = useBookSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [booksWithStatus, setBooksWithStatus] = useState<BookWithStatus[]>([]);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      search(query);
    }, 500),  // 500ms待機
    []
  );

  //検索フォーム
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    debouncedSearch(searchQuery);
  }

  // 本の登録状態を取得
  useEffect(() => {
      const fetchRegistrationStatus = async () => {
          if (!books.length) return;

          const isbns = books
              .map(book => book.volumeInfo.industryIdentifiers
                  ?.find(id => id.type === "ISBN_13")
                  ?.identifier)
              .filter((isbn): isbn is string => isbn !== undefined);

          console.log("APIにリクエスト投げます。")

          const response = await fetch(
              `/api/prisma/bookShelf/check-registration-status?isbns=${isbns.join(',')}&userId=${firebaseAuth.uid}`
          );
          const { registeredBooks } = await response.json();

          const updatedBooks = books.map(book => ({
            ...book,
            registrationStatus: registeredBooks.find(
                (rb: RegisteredBookStatus) => rb.isbn === book.volumeInfo.industryIdentifiers
                    ?.find(id => id.type === "ISBN_13")
                    ?.identifier
            )?.status || 'UNREGISTERED'
        }));

          setBooksWithStatus(updatedBooks);
      };

      fetchRegistrationStatus();
  }, [books]);
  
  return (
      <div className="container mx-auto p-4">
        <form 
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          {/* 検索ボックスのラッパー */}
          <div className="
            relative
            bg-[#272727]
            rounded-xl
            shadow-[6px_6px_12px_0px_#1f1f1f,_-6px_-6px_12px_0px_#303030]
            overflow-hidden
          ">
  
            {/* 入力フィールド */}
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="本のタイトル、著者名で検索"
              className="
                w-full
                py-3
                px-12
                bg-transparent
                text-white
                placeholder-gray-500
                outline-none
                border-none
              "
            />
  
            {/* 検索ボタン */}
            <button
              type="submit"
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                px-4
                py-1.5
                rounded-lg
                bg-[#272727]
                text-gray-300
                transition-all
                shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
                hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
                active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
                active:translate-y-0.5
              "
            >
              検索
            </button>
          </div>
  
          {/* 検索オプション */}
          <div className="mt-4 flex gap-4 justify-center text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              タイトルで検索
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="form-checkbox" />
              著者名で検索
            </label>
          </div>
        </form>
  
        {/* 検索結果表示 */}
        <div className="mt-8">
          {
            booksWithStatus.map((bookWithStatus) => (
                <BookCard 
                    key={bookWithStatus.id} 
                    bookWithStatus={bookWithStatus}
                />
            ))
          }
        </div>
      </div>
    )

}

