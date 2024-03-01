-- CreateEnum
CREATE TYPE "CHOICE_DAY_WEEK" AS ENUM ('SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'FRIDAY');

-- CreateEnum
CREATE TYPE "CHOICES_MATTERS" AS ENUM ('ART', 'BIOLOGY', 'SCIENCE', 'PHYSICAL_EDUCATION', 'PHYSICAL', 'GEOGRAPHY', 'HISTORY', 'MATHEMATICS', 'PORTUGUESE', 'CHEMICAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "bio" VARCHAR(300),
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "valueByhours" DECIMAL(65,30),
    "matter" "CHOICES_MATTERS",
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayWeek" (
    "id" TEXT NOT NULL,
    "dayWeek" "CHOICE_DAY_WEEK" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DayWeek_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DayWeek" ADD CONSTRAINT "DayWeek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
