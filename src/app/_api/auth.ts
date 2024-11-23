import { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const adminAuth = getAuth();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1]; // トークンをヘッダから取得
    if (!idToken) {
      return res.status(400).json({ error: 'No token provided' });
    }

    // トークンを検証
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    res.status(200).json({ decodedToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify token' });
  }
}
