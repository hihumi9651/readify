// _hooks/useBookSearch.ts
import { useState } from "react";
import { searchBooks } from "@/app/_lib/api/books";
import type { Book } from "@/app/_types/books";

export function useBookSearch() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError("検索中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, search };
}