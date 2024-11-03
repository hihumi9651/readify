// app/_components/auth/SignInButton.tsx
'use client'

import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className = '' }: SignInButtonProps) {
  const { auth } = useFirebase();
  
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

  const baseClasses = `
    relative
    px-8 py-3 
    rounded-xl
    bg-[#272727]
    text-gray-300
    transition-all duration-300
    shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
    hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
    active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
    active:translate-y-0.5
  `;

  return (
    <button 
      className={`
        ${baseClasses}
        ${!auth ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={signInWithGoogle}
      disabled={!auth}
    >
      {!auth ? 'Loading...' : 'Sign in with Google'}
    </button>
  );
}