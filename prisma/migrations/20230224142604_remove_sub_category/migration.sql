/*
  Warnings:

  - You are about to drop the `categories1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories1" DROP CONSTRAINT "categories1_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categories2" DROP CONSTRAINT "categories2_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "categories2" DROP CONSTRAINT "categories2_sub_category_id_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "firebase_id" TEXT,
ADD COLUMN     "sub_category_id" INTEGER;

-- DropTable
DROP TABLE "categories1";

-- DropTable
DROP TABLE "categories2";
