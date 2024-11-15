-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('want_to_read', 'STACKED', 'READING', 'FINISHED');

-- CreateTable
CREATE TABLE "users" (
    "firebase_uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_at" TIMESTAMP(3),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("firebase_uid")
);

-- CreateTable
CREATE TABLE "bookshelves" (
    "id" SERIAL NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "status" "BookStatus" NOT NULL,
    "read_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "bookshelves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "bookshelves_firebase_uid_isbn_key" ON "bookshelves"("firebase_uid", "isbn");

-- AddForeignKey
ALTER TABLE "bookshelves" ADD CONSTRAINT "bookshelves_firebase_uid_fkey" FOREIGN KEY ("firebase_uid") REFERENCES "users"("firebase_uid") ON DELETE RESTRICT ON UPDATE CASCADE;
