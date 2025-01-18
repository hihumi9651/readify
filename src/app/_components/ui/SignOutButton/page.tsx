import { redirect, useRouter } from "next/navigation";
import { useFirebase } from "@/app/_components/providers/firebase-provider";


export function SignOutButton() {
    const { auth } = useFirebase();
    const router = useRouter();
  
    const handleSignOut = async () => {
      if (!auth) {
        console.error('Auth is not initialized');
        return;
      }
  
      try {
        await auth.signOut();
        await fetch("/api/auth/logout",{
          method: "POST"
      })
      } catch (error) {
        console.error('Sign out error:', error);
      } finally {
        redirect("/")
      }
    };
  
    return (
      <button 
        onClick={handleSignOut}
        className="
          px-4 py-2 
          rounded-lg
          bg-[#272727]
          text-gray-300
          transition-all
          shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
          hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
          active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        disabled={!auth}
      >
        {!auth ? 'Loading...' : 'Sign out'}
      </button>
    );
  }