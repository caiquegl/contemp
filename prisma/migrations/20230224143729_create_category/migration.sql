-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "description_seo" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "key_word_seo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firebase_id" TEXT,
    "sub_category_id" INTEGER,
    "order" INTEGER NOT NULL,
    "url" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_order_key" ON "categories"("order");

-- AddForeignKey
ALTER TABLE "home" ADD CONSTRAINT "home_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
