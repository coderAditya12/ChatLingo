/*
  Warnings:

  - You are about to drop the column `onBoarded` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "onBoarded",
DROP COLUMN "profilePhoto";

-- CreateTable
CREATE TABLE "onboarding" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "bio" TEXT DEFAULT '',
    "nativeLanguage" TEXT DEFAULT '',
    "laerningLanguage" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "profilePhoto" TEXT DEFAULT 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "onboarding_userId_key" ON "onboarding"("userId");

-- AddForeignKey
ALTER TABLE "onboarding" ADD CONSTRAINT "onboarding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
