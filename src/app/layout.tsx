import { FirebaseProvider } from '@/app/_components/providers/firebase-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './_styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Readify',
  description: 'シンプルな読書管理アプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-[#272727] text-white`}>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  )
}