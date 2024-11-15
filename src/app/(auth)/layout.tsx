'use client'

import { User } from "firebase/auth";
import { useFirebase } from '@/app/_components/providers/firebase-provider'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Footer } from "@/app/_components/auth/Footer";
import { Header } from "@/app/_components/auth/Header";
//import { useLoginEffect } from "../_hooks/useLoginEffect";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
//  const { auth, isInitialized } = useFirebase();
//  const [user, setUser] = useState<User | null>(null);
//  const [loading, setLoading] = useState(true);

//  useEffect(() => {
//    if (!auth) return;

//    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
//      setUser(user);
//      setLoading(false);
//   });

//    return () => unsubscribe();
//  }, [auth]);

//  if (!isInitialized || loading) {
//    return <div>Loading...</div>
//  }

//  if (!user) {
//    redirect('/');
//  }

  //const {user} = useLoginEffect();

  //if (!user) {
  //  redirect('/');
  //}

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}