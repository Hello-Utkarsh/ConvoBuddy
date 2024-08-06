/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userid");

-- CreateTable
CREATE TABLE "Prefrence" (
    "userid" TEXT NOT NULL,
    "name" TEXT,
    "age" INTEGER,
    "interests" TEXT[],
    "languages" TEXT[],

    CONSTRAINT "Prefrence_pkey" PRIMARY KEY ("userid")
);
