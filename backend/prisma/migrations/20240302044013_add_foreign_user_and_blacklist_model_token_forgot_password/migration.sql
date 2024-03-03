/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `tokenForgotPassword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `tokenForgotPassword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tokenForgotPassword" ADD COLUMN     "blacklist" TEXT[],
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tokenForgotPassword_userId_key" ON "tokenForgotPassword"("userId");

-- AddForeignKey
ALTER TABLE "tokenForgotPassword" ADD CONSTRAINT "tokenForgotPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
