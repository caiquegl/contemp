/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "products_order_key" ON "products"("order");
