-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "filter" JSONB NOT NULL DEFAULT '[]';
