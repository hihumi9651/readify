//import { PrismaClient } from "@prisma/client";

export default function createAuth(){

    //const { auth } = useFirebase();

    console.log("サーバー側")

    interface User_db {
      id:String
      email:String
      username:String
      lastLoginAt:Date | null
    }

    //  const prisma = new PrismaClient;

    //   console.log(auth?.currentUser?.uid)
    //   console.log(auth?.currentUser?.email!)
    //   console.log(auth?.currentUser?.displayName!)
    //   console.log(new Date())

    //   const registUser = async () => {
    //       const user = await prisma.user.create({
    //       data: {
    //         // id: currentUser!.uid,
    //         // email: currentUser?.email!,
    //         // username: currentUser?.displayName!,
    //         // lastLoginAt: new Date(),
    //         // id: "2",
    //         // email: "osanaismi1111@gmail.com",
    //         // username: "aaa",
    //         // lastLoginAt: new Date(),
    //       }
    //     });
    //   }

    //   registUser();
};

