/*
  Warnings:

  - The primary key for the `taskCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "taskCategory" DROP CONSTRAINT "taskCategory_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "taskCategory_pkey" PRIMARY KEY ("id");
