// app/(unAuth)/page.tsx
"use client"

import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { redirect } from "next/navigation";
import React, { useEffect } from 'react';
import { useFirebase } from "@/app/_components/providers/firebase-provider";

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

function SignInButton() {
  const { auth } = useFirebase();
  
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <button 
      className="
      relative
      px-8 py-3 
      rounded-xl
      bg-[#272727]
      text-gray-300
      transition-all duration-300
      shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
      hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
      active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
      active:translate-y-0.5
    "
      onClick={signInWithGoogle}>
        Sign in with Google
    </button>
  );
}