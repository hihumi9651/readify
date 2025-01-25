import type { Book, SearchResponse } from '@/app/_types/books';

export async function searchBooks(query: string): Promise<Book[]> {
  
  if (!query.trim()) return [];

  //const googleBooksApiKey = "AIzaSyD_PYUWXK77a0B-1e-M4TKmcKfLFdQNfwk"
  const googleBooksApiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${googleBooksApiKey}`
  );

  if (!res.ok) {
    throw new Error('検索に失敗しました');
  }

  const data = (await res.json()) as unknown as SearchResponse;
  return data.items || [];
}