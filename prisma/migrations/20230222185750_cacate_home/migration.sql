-- DropForeignKey
ALTER TABLE "home" DROP CONSTRAINT "home_category_id_fkey";

-- AddForeignKey
ALTER TABLE "home" ADD CONSTRAINT "home_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
