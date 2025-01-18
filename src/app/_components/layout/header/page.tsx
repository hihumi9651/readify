"use client"

import { useFirebase } from '@/app/_components/providers/firebase-provider';
import { useEffect, useState } from "react";
import Link from "next/link";
import { SignOutButton } from "@/app/_components/ui/SignOutButton/page";
import { User } from 'firebase/auth';
import Image from 'next/image';

export function Header() {

    const { auth } = useFirebase();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        if (!auth) return;

        //現在のユーザー状態を取得
        setUser(auth.currentUser);

        //ユーザー状態の変更を監視
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("Auth state changed:", user?.email);
            setUser(user);
        });

        //クリーンアップ関数
        return () => unsubscribe();

    },[auth])

    return (
        <header className="w-full p-6 flex justify-end">
            <div className="flex gap-4 items-center">
                <Link href="/bookshelf" className="btn-primary">本棚</Link>
                <Link href="/search" className="btn-primary">書籍検索</Link>
                <p className="btn-primary">タイムライン（coming soon）</p>
                <p className="btn-primary">マイページ（coming soon）</p>
                <SignOutButton />
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
            </div>
        </header>
    )
}