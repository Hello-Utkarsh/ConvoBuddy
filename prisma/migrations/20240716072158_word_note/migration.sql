-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "createdBy" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "partofspeech" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
