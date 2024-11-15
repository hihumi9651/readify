import { useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { useFirebase } from '@/app/_components/providers/firebase-provider'; // Firebaseのプロバイダ
import { User } from 'firebase/auth';

export function useAuthRedirect() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { auth, isInitialized } = useFirebase(); // authと初期化状況を取得

  useEffect(() => {

    console.log("ログイン時の処理をします")

    if(!auth){
        console.log("ログインされていません")
        return;
    }

    console.log("ログインされていました")
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
      setLoading(false);

      // ログインしている場合はダッシュボードへリダイレクト
      if (user) {
        redirect('/bookchelf'); // 認証後に遷移したいURL
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user, loading };
}