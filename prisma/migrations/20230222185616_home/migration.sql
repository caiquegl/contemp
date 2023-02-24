/*
  Warnings:

  - You are about to drop the column `sub_categorie` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "sub_categorie",
ADD COLUMN     "sub_category" TEXT;

-- CreateTable
CREATE TABLE "home" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "icon" TEXT,
    "link_name" TEXT,
    "name" TEXT NOT NULL,
    "indexProduct" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "urls" JSONB NOT NULL,

    CONSTRAINT "home_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "home" ADD CONSTRAINT "home_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
