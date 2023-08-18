-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "categories_order_seq";

-- AlterTable
ALTER TABLE "categories1" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "categories1_order_seq";

-- AlterTable
ALTER TABLE "categories2" ALTER COLUMN "order" DROP DEFAULT;
DROP SEQUENCE "categories2_order_seq";
