'use client'

import { useFirebase } from "@/app/_components/providers/firebase-provider";
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className = '' }: SignInButtonProps) {
  const { auth, currentUser } = useFirebase();
  const [loading, setLoading] = useState(false);  // ローディング状態追加
  const route = useRouter()

  const signInWithGoogle = async () => {

    if (!auth || loading) return;  // loading中の再実行を防止

    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const au = await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    const checkSignInWithGoogle = async () => {

      console.log("check呼び出し")
      //if (!auth || loading) return;  // loading中の再実行を防止
      if (!auth) return;  // loading中の再実行を防止
      console.log("trystart")

      try {

        setLoading(true);  // ボタンを無効化
        console.log("ボタン無効化")

        // const userCredential = await getRedirectResult(auth)
        // console.log(userCredential)
        
        const userCredential = await getRedirectResult(auth);
        console.log("クリデンシャルゲット")
        console.log(currentUser)
        if (!userCredential) return;
        console.log("userCredential atta")

        

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          throw new Error('IDトークンの取得に失敗しました')
        }

        console.log("セッション登録開始")　
  
        //セッションを作成するAPIを呼び出し
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idToken }),
        })
  
        // //ログインセッションが作成されていることを確認する
        if (!response.ok) {
          throw new Error('sessionの作成に失敗しました')
        }
  
        console.log("ユーザ情報登録開始")
  
        //ユーザー情報をDBに登録（更新）する
        // const response_prisma = await fetch('/api/prisma/user', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     firebase_uid: auth.currentUser.uid,
        //     email: auth.currentUser.email,
        //     username: auth.currentUser.displayName,
        //     displayName: auth.currentUser.displayName,
        //   })
        // })
  
        console.log("本棚へ移動します。")
  
        
        //"/bookshelf"に遷移する
        route.push("/bookshelf")

      } catch (error) {
        console.error("Error during sign-in:", error);
      } finally {
        setLoading(false);
      }
    }

    console.log("start")
    checkSignInWithGoogle();
    console.log("end")
    
  },[auth]);

  // const signInWithGoogle2 = async () => {

  //   if (!auth || loading) return;  // loading中の再実行を防止

  //   try {
  //     setLoading(true);  // ボタンを無効化

  //     const userCredential = await getRedirectResult(auth);

  //     //トークン生成
  //     const idToken = await userCredential!.user.getIdToken();

  //     if (!idToken) {
  //       throw new Error('IDトークンの取得に失敗しました')
  //     }

  //     console.log("セッション登録開始")　

  //     //セッションを作成するAPIを呼び出し
  //     const response = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ idToken }),
  //     })

  //     // //ログインセッションが作成されていることを確認する
  //     if (!response.ok) {
  //       throw new Error('sessionの作成に失敗しました')
  //     }

  //     console.log("ユーザ情報登録開始")

  //     //ユーザー情報をDBに登録（更新）する
  //     const response_prisma = await fetch('/api/prisma/user', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         firebase_uid: userCredential!.user.uid,
  //         email: userCredential!.user.email,
  //         username: userCredential!.user.displayName,
  //         displayName: userCredential!.user.displayName,
  //       })
  //     })

  //     console.log("本棚へ移動します。")

  //     //"/bookshelf"に遷移する
  //     route.push("/bookshelf")
      
  //   } catch (error) {
  //     console.error("Error during sign-in:", error);
  //   } finally {
  //     setLoading(false);  // 処理完了後に再度有効化
  //   }
  // }

  return (
    <button 
      className={`btn-primary ${className}`}  // 渡されたclassNameを適用
      onClick={signInWithGoogle}
      disabled={!auth || loading}  // loading中も無効化
    >
      {loading ? 'Signing in...' : 
       !auth ? 'Loading...' : 
       'Sign in with Google'}
    </button>
  );
}