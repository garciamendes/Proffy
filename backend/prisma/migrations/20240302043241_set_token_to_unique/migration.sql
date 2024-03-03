/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `tokenForgotPassword` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tokenForgotPassword_token_key" ON "tokenForgotPassword"("token");
