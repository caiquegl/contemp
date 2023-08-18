/*
  Warnings:

  - Added the required column `call_product` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "call_product" TEXT NOT NULL;
