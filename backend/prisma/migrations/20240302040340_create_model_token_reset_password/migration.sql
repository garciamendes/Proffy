-- CreateTable
CREATE TABLE "tokenForgotPassword" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokenForgotPassword_pkey" PRIMARY KEY ("id")
);
