"use client"

import { useState } from "react"
import React from "react";
import Result from "@/app/_components/search/search-result";

export default function () {
    return (
        <>
            <div>
                検索ページ
            </div>

            //検索ボックス・検索ボタン
            <SearchButton />

            //検索結果
            <Result />
        </>
    )
}

function SearchButton() {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // 検索処理の実装　https://www.googleapis.com/books/v1/volumes?q=検索語句
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
        console.log({searchQuery})
        const data = await res.json()
        console.log(data)
      }

    return (
        <div className="container mx-auto p-4">
          <form 
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto"
          >
            {/* 検索ボックスのラッパー */}
            <div className="
              relative
              bg-[#272727]
              rounded-xl
              shadow-[6px_6px_12px_0px_#1f1f1f,_-6px_-6px_12px_0px_#303030]
              overflow-hidden
            ">
    
              {/* 入力フィールド */}
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="本のタイトル、著者名で検索"
                className="
                  w-full
                  py-3
                  px-12
                  bg-transparent
                  text-white
                  placeholder-gray-500
                  outline-none
                  border-none
                "
              />
    
              {/* 検索ボタン */}
              <button
                type="submit"
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  px-4
                  py-1.5
                  rounded-lg
                  bg-[#272727]
                  text-gray-300
                  transition-all
                  shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
                  hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
                  active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
                  active:translate-y-0.5
                "
              >
                検索
              </button>
            </div>
    
            {/* 検索オプション（必要に応じて） */}
            <div className="mt-4 flex gap-4 justify-center text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                タイトルで検索
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox" />
                著者名で検索
              </label>
            </div>
          </form>
    
          {/* 検索結果表示エリア */}
          <div className="mt-8">
            {/* 検索結果コンポーネントをここに配置 */}
          </div>
        </div>
      )
}