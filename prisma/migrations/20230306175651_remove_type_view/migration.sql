/*
  Warnings:

  - You are about to drop the column `type_view` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `value_max` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `value_min` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "type_view",
DROP COLUMN "value_max",
DROP COLUMN "value_min";
