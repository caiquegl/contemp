-- AlterTable
CREATE SEQUENCE categories_order_seq;
ALTER TABLE "categories" ALTER COLUMN "order" SET DEFAULT nextval('categories_order_seq');
ALTER SEQUENCE categories_order_seq OWNED BY "categories"."order";

-- AlterTable
CREATE SEQUENCE categories1_order_seq;
ALTER TABLE "categories1" ALTER COLUMN "order" SET DEFAULT nextval('categories1_order_seq');
ALTER SEQUENCE categories1_order_seq OWNED BY "categories1"."order";

-- AlterTable
CREATE SEQUENCE categories2_order_seq;
ALTER TABLE "categories2" ALTER COLUMN "order" SET DEFAULT nextval('categories2_order_seq');
ALTER SEQUENCE categories2_order_seq OWNED BY "categories2"."order";
