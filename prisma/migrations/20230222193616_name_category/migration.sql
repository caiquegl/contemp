/*
  Warnings:

  - You are about to drop the column `sub_category_id` on the `categories1` table. All the data in the column will be lost.
  - You are about to drop the column `categories_id` on the `categories2` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `categories1` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories1" DROP CONSTRAINT "categories1_sub_category_id_fkey";

-- DropForeignKey
ALTER TABLE "categories2" DROP CONSTRAINT "categories2_categories_id_fkey";

-- AlterTable
ALTER TABLE "categories1" DROP COLUMN "sub_category_id",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "categories2" DROP COLUMN "categories_id",
ADD COLUMN     "categoriesId" INTEGER;

-- AddForeignKey
ALTER TABLE "categories1" ADD CONSTRAINT "categories1_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories2" ADD CONSTRAINT "categories2_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
