// app/(unAuth)/page.tsx
"use client"

import { User } from "firebase/auth";
import { redirect } from "next/navigation";
import React, { useEffect } from 'react';
import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { SignInButton } from "@/app/_components/unAuth/SignInButton";

export default function Home() {
  const { auth, isInitialized } = useFirebase();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [auth]);

  if (!isInitialized || loading) {
    return <div>Loading...</div>
  }

  if (user) {
    redirect("/bookshelf");
  }

  return (
    <main className="h-screen w-screen relative bg-black text-white overflow-hidden">
      {/* メインコンテンツ */}
      <div className="relative h-full w-full flex flex-col">
        {/* ヘッダー部分 */}
        <header className="w-full p-6 flex justify-end">
          <SignInButton />
        </header>

        {/* メインビジュアル */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Readify
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              あなたの読書体験を、もっと自由に
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"/>
                シンプル
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-purple-500"/>
                楽しい
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-pink-500"/>
                つながる
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <footer className="w-full p-6 text-center text-gray-600 text-sm">
          <p>© 2024 Readify - すべての読書家へ</p>
        </footer>
      </div>
    </main>
  );
}