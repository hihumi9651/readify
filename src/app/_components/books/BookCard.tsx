// components/books/BookCard.tsx
import { Book } from "@/app/_types/books";

interface BookCardProps {
    book: Book;
  }
  
  export function BookCard({ book }: BookCardProps) {
    return (
      <div 
        className="
          bg-[#272727] 
          rounded-xl 
          overflow-hidden
          shadow-[6px_6px_12px_0px_#1f1f1f,_-6px_-6px_12px_0px_#303030]
          hover:shadow-[8px_8px_16px_0px_#1f1f1f,_-8px_-8px_16px_0px_#303030]
          transition-shadow
          duration-300
        "
      >
        <div className="flex p-4 gap-4">
          {/* 本のサムネイル */}
          <div className="w-24 h-32 flex-shrink-0 bg-[#2a2a2a] rounded-lg shadow-inner overflow-hidden">
            {book.volumeInfo.imageLinks ? (
              <img 
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
  
          {/* 本の情報 */}
          <div className="flex-1">
            <h3 className="font-medium text-white mb-2">
              {book.volumeInfo.title}
            </h3>
            
            {book.volumeInfo.authors && (
              <p className="text-sm text-gray-400 mb-1">
                著者: {book.volumeInfo.authors.join(', ')}
              </p>
            )}
            
            {book.volumeInfo.publishDate && (
              <p className="text-sm text-gray-400 mb-1">
                出版: {new Date(book.volumeInfo.publishDate).toLocaleDateString('ja-JP')}
              </p>
            )}
  
            {book.volumeInfo.description && (
              <p className="text-sm text-gray-400 line-clamp-2">
                {book.volumeInfo.description}
              </p>
            )}
          </div>
        </div>
  
        {/* アクション部分 */}
        <div className="px-4 py-3 border-t border-[#303030] flex justify-end">
          <button
            className="
              px-4 
              py-2 
              rounded-lg
              bg-[#272727]
              text-gray-300
              text-sm
              shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
              hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
              active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
              transition-all
              duration-300
            "
          >
            詳細を見る
          </button>
          <button
            className="
              px-4 
              py-2 
              rounded-lg
              bg-[#272727]
              text-gray-300
              text-sm
              shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
              hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
              active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
              transition-all
              duration-300
            "
          >
            本棚に追加する（Comming Soon）
          </button>
        </div>
      </div>
    );
  }