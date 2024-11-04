'use client'

import { useFirebase } from '@/app/_components/providers/firebase-provider';
import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import Image from 'next/image';

export default function BookshelfPage() {
  const { auth } = useFirebase();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // [修正1] useAuthStateの代わりにonAuthStateChangedを使用
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"/>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">本棚</h1>
      
      {/* ユーザー情報の表示 
      {user && (
        <div className="flex items-center gap-4 mb-4">
          {user.photoURL && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image 
                src={user.photoURL} 
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          )}
          <p className="text-lg">{user.displayName}</p>
        </div>
      )}
      */}
    </div>
  );
}

