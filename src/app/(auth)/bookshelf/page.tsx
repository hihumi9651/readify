'use client'

import { useFirebase } from '@/app/_components/providers/firebase-provider';
import Link from 'next/link';
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
      
      {/* ユーザー情報の表示 */}
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

      {/* アクション */}
      <div className="flex gap-4 items-center">
        <SignOutButton />
        <Link 
          href="/search"
          className="text-blue-500 hover:underline"
        >
          検索画面へ
        </Link>
      </div>
    </div>
  );
}

// [修正2] SignOutButtonの修正
function SignOutButton() {
  const { auth } = useFirebase();

  const handleSignOut = async () => {
    if (!auth) {
      console.error('Auth is not initialized');
      return;
    }

    try {
      await auth.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      className="
        px-4 py-2 
        rounded-lg
        bg-[#272727]
        text-gray-300
        transition-all
        shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
        hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
        active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
      disabled={!auth}
    >
      {!auth ? 'Loading...' : 'Sign out'}
    </button>
  );
}