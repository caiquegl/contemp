-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "filter" SET DEFAULT '[]';

-- CreateTable
CREATE TABLE "files" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);
