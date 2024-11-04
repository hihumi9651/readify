import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export function Header() {
    return (
        <header className="w-full p-6 flex justify-end">
            <div className="flex gap-4 items-center">
                <Link href="/bookshelf" className="btn-primary">本棚</Link>
                <Link href="/search" className="btn-primary">書籍検索</Link>
                <p className="btn-primary">タイムライン（coming soon）</p>
                <p className="btn-primary">マイページ（coming soon）</p>
                <SignOutButton />
            </div>
        </header>
    )
}