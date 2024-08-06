-- CreateTable
CREATE TABLE "pitch" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "registered" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "pitch_pkey" PRIMARY KEY ("id")
);
