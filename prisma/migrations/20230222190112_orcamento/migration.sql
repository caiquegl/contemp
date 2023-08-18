-- CreateTable
CREATE TABLE "orcamentos" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAprove" BOOLEAN NOT NULL,
    "lastName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "orcamentos_pkey" PRIMARY KEY ("id")
);
