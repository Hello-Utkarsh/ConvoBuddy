/*
  Warnings:

  - You are about to drop the `pitch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pitch";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "registeredId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pitch" (
    "id" SERIAL NOT NULL,
    "createdId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "registered" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Pitch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_registeredId_fkey" FOREIGN KEY ("registeredId") REFERENCES "Pitch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
