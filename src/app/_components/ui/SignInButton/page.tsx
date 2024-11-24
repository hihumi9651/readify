'use client'

import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation";
import { useState } from 'react';  // loading状態の管理を追加

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className = '' }: SignInButtonProps) {
  const { auth } = useFirebase();
  const [loading, setLoading] = useState(false);  // ローディング状態追加

  const signInWithGoogle = async () => {
    if (!auth || loading) return;  // loading中の再実行を防止

    try {
      setLoading(true);  // ボタンを無効化
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);  // 処理完了後に再度有効化
      redirect("/bookshelf")
    }
  }

  return (
    <button 
      className={`btn-primary ${className}`}  // 渡されたclassNameを適用
      onClick={signInWithGoogle}
      disabled={!auth || loading}  // loading中も無効化
    >
      {loading ? 'Signing in...' : 
       !auth ? 'Loading...' : 
       'Sign in with Google'}
    </button>
  );
}