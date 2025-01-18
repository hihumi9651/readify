import { getAuth } from "firebase/auth"

export function useFirebaseAuth() {

    const auth = getAuth()
    const user = auth.currentUser

    return {
        user,
        isAuthenticated: !!user,
        uid: user?.uid || null,
        email: user?.email || null,
        displayName: user?.displayName || null,
      };

}