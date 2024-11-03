// app/(auth)/layout.tsx
'use client'

import { User } from "firebase/auth";
import { useFirebase } from '@/app/_components/providers/firebase-provider'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { auth, isInitialized } = useFirebase()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
        setUser(user);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [auth]);

  // ローディング中の表示
  if (!isInitialized || loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"/>
      </div>
    );
  }

  // 未認証ユーザーはトップページへリダイレクト
  if (!user) {
    redirect('/');
  }

  // 認証済みユーザーに対してコンテンツを表示
  return <>{children}</>;
}