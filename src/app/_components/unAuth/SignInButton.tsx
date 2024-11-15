// app/_components/unAuth/sign-in-button.tsx
'use client'

import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { PrismaClient } from "@prisma/client";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className = '' }: SignInButtonProps) {
  const { auth } = useFirebase();
  const prisma = new PrismaClient;

  const registUser = async () => {
    const user = prisma.user.create({
      data: {
        id: "firebase_uid", //            String    @id @map("firebase_uid") // PKとしてのFirebase ID
        email: "email", 
        username: "yu-zamei", 
        lastLoginAt: "", //DateTime? @map("last_login_at")
      }
    });
  }
  
  const signInWithGoogle = async () => {
    if (!auth) {
      console.error('Firebase auth not initialized');
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <button 
      className="btn-primary"
      onClick={signInWithGoogle}
      disabled={!auth}
    >
      {!auth ? 'Loading...' : 'Sign in with Google'}
    </button>
  );
}