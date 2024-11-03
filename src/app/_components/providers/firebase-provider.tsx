'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA1IdNc39nkzNsL1ZZ806z9UWYZ3hZtd6k",
    authDomain: "readify-7716f.firebaseapp.com",
    projectId: "readify-7716f",
    storageBucket: "readify-7716f.appspot.com",
    messagingSenderId: "399496922866",
    appId: "1:399496922866:web:506d34b8833cb9a1efb26b",
    measurementId: "G-44500BLM45"
};

const FirebaseContext = createContext<any>(null)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<any>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    setAuth(getAuth(app))
    setIsInitialized(true)
  }, [])

  return (
    <FirebaseContext.Provider value={{ auth, isInitialized }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => useContext(FirebaseContext);