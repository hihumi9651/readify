'use client'

import { useFirebase } from '@/app/_components/providers/firebase-provider';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function BookshelfPage() {

  const { auth } = useFirebase();
  const [user] = useAuthState(auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">本棚</h1>
      {/* ここに本棚の内容を実装 */}
      本棚画面（メイン画面）

      {user?.photoURL && (
        <div>
          <img src={user.photoURL} alt=""/>
          <p>{auth.currentUser?.displayName}</p>
        </div>
      )}
      <SignOutButton /><br />
      <Link href="/search">検索画面へ</Link>
    </div>

  );
}

//サインアウトボタン
function SignOutButton() {
  const { auth } = useFirebase();
  return (
    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}