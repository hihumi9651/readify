'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, Auth, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA1IdNc39nkzNsL1ZZ806z9UWYZ3hZtd6k",
  authDomain: "readify-7716f.firebaseapp.com",
  projectId: "readify-7716f",
  storageBucket: "readify-7716f.firebasestorage.app",
  messagingSenderId: "399496922866",
  appId: "1:399496922866:web:506d34b8833cb9a1efb26b"
};

// 型定義
interface FirebaseContextType {
  auth: Auth | null;
  isInitialized: boolean;
  currentUser: User | null | undefined;
  signInCheck: boolean;
}

// コンテキストの初期値を設定
const FirebaseContext = createContext<FirebaseContextType>({
  auth: null,
  isInitialized: false,
  currentUser: null,
  signInCheck: false
});

// Custom Hook for Firebase
export function useFirebase() {
  const context = useContext(FirebaseContext);
  
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  
  return context;
}

// Firebase Provider Component
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const [signInCheck, setSignInCheck] = useState(false);

  useEffect(() => {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      const authInstance = getAuth(app);
      setAuth(authInstance);
      authInstance.onAuthStateChanged( (user) => {
        if (user) {
          setCurrentUser(user);
          setSignInCheck(true);
        } else {
          setSignInCheck(true);
        }
      });
    } catch (error) {
      console.error('Firebase initialization error:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, isInitialized, currentUser, signInCheck }}>
      {children}
    </FirebaseContext.Provider>
  );
}