"use client"

import { redirect } from 'next/navigation'
import { useAuthRedirect } from "../_hooks/useLoginEffect";

// app/(unAuth)/layout.tsx
export default function UnAuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const {user} = useAuthRedirect();

    if(user) {
      console.log("ログイン後ページにリダイレクトします。")
      redirect('/bookshelf');
    }

    return children;
  }