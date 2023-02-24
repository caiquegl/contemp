/*
  Warnings:

  - You are about to drop the column `sub_category` on the `categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "sub_category";

-- CreateTable
CREATE TABLE "categories1" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "description_seo" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "key_word_seo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "sub_category_id" INTEGER NOT NULL,
    "url" TEXT,

    CONSTRAINT "categories1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories2" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "description_seo" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "key_word_seo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "sub_category_id" INTEGER NOT NULL,
    "url" TEXT,
    "categories_id" INTEGER,

    CONSTRAINT "categories2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "description_seo" TEXT NOT NULL,
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "hasVariation" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "key_word_seo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "listVariation" JSONB,
    "tab" JSONB,
    "urls" JSONB,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories1_order_key" ON "categories1"("order");

-- CreateIndex
CREATE UNIQUE INDEX "categories2_order_key" ON "categories2"("order");

-- AddForeignKey
ALTER TABLE "categories1" ADD CONSTRAINT "categories1_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories2" ADD CONSTRAINT "categories2_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "categories1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories2" ADD CONSTRAINT "categories2_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
