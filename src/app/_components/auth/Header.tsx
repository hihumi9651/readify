"use client"

import { useFirebase } from '@/app/_components/providers/firebase-provider';
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import { User } from 'firebase/auth';
import Image from 'next/image';
import { PrismaClient } from "@prisma/client";

export function Header() {

    const { auth } = useFirebase();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("authの状態:", auth);
    
        if (!auth) return;
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false);
        });

        console.log("ログイン時のみ実行されるはず。。。")

        const prisma = new PrismaClient;

        const registUser = async () => {
            console.log("DBにユーザー時情報を登録します。")
            const users = prisma.user.create({
            data: {
              id: user?.uid!, //            String    @id @map("firebase_uid") // PKとしてのFirebase ID
              email: user?.email!, 
              username: user?.displayName!, 
              lastLoginAt: Date(), //DateTime? @map("last_login_at")
            }
          });
        }

        //registUser();


        return () => unsubscribe();
    
    }, [auth]);

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