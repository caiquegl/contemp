-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "before" JSONB,
    "after" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
