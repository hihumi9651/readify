import React from 'react';
import { SignInButton } from "@/app/_components/ui/SignInButton/page";
import { Footer } from './_components/layout/footer/page';


export default function Home() {

  return (
    <main className="h-screen w-screen relative bg-black text-white overflow-hidden">
      {/* メインコンテンツ */}
      <div className="relative h-full w-full flex flex-col">
        {/* ヘッダー部分 */}
        <header className="w-full p-6 flex justify-end">
          <SignInButton />
        </header>

        {/* メインビジュアル */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Readify
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              あなたの読書体験を、もっと自由に
            </p>
            <div className="flex justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"/>
                シンプル
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-purple-500"/>
                楽しい
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-2 h-2 rounded-full bg-pink-500"/>
                つながる
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <Footer />
      </div>
    </main>
  );
}