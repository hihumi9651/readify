/**
 * @module firebase-admin SDK
 * サーバーサイドでのFirebase認証機能を提供するモジュール
 */

import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

/**
 * Firebase Adminの設定オブジェクト
 * 
 * @throws {Error} 環境変数が設定されていない場合にエラーが発生します
 */
const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

/**
 * Firebase Adminのインスタンス
 * 
 * @remarks
 * シングルトンパターンを使用して、複数回の初期化を防止します
 * 
 * @throws {Error} 初期化に失敗した場合にエラーが発生します
 */

// すでに初期化されているかチェック
const apps = getApps()
console.log('既存のアプリ数:', apps.length)

const firebaseAdmin = getApps().length === 0 
  ? initializeApp({credential: cert(serviceAccount)}) 
  : getApps()[0]

/**
 * Firebase Auth Adminのインスタンス
 */
export const auth = getAuth(firebaseAdmin)

/**
 * セッションCookieを検証する関数
 * 
 * @param sessionCookie - 検証対象のセッションCookie
 * @returns デコードされたユーザー情報
 * @throws {FirebaseAuthError} 無効なセッションCookieの場合
 * 
 */
export async function verifySession(sessionCookie: string) {
  return await auth.verifySessionCookie(sessionCookie, true)
}