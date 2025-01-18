'use client'

import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from 'react';  // loading状態の管理を追加

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className = '' }: SignInButtonProps) {
  const { auth } = useFirebase();
  const [loading, setLoading] = useState(false);  // ローディング状態追加
  const route = useRouter()

  const signInWithGoogle = async () => {

    if (!auth || loading) return;  // loading中の再実行を防止

    try {
      setLoading(true);  // ボタンを無効化

      //Google認証ポップアップ
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      //トークン生成
      const idToken = await userCredential.user.getIdToken();

      if (!idToken) {
        throw new Error('IDトークンの取得に失敗しました')
      }

      //セッションを作成するAPIを呼び出し
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      //ログインセッションが作成されていることを確認する
      if (!response.ok) {
        throw new Error('sessionの作成に失敗しました')
      }

      //ユーザー情報をDBに登録（更新）する
      const response_prisma = await fetch('/api/prisma/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebase_uid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.displayName,
          displayName: userCredential.user.displayName,
        })
      })

      //"/bookshelf"に遷移する
      route.push("/bookshelf")
      
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);  // 処理完了後に再度有効化
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