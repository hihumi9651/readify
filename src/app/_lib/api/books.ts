import type { Book, SearchResponse } from '@/app/_types/book';

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  );

  if (!res.ok) {
    throw new Error('検索に失敗しました');
  }

  const data = (await res.json()) as unknown as SearchResponse;
  return data.items || [];
}