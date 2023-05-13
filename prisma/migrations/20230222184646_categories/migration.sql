-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "description_seo" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "key_word_seo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "sub_categorie" TEXT,
    "url" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_order_key" ON "Categories"("order");
