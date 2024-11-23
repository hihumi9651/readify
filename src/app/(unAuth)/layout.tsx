//import { PrismaClient } from "@prisma/client";
import createAuth from "../actions/auth";

export default function UnAuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    interface User_db {
      id:String
      email:String
      username:String
      //displayName:String | null
      //createdAt:Date
      lastLoginAt:Date | null
      //isDeleted:Boolean
      //deletedAt:Date
    }

    return children;
  }