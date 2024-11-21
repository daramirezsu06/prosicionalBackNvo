/*
  Warnings:

  - The primary key for the `taskCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "taskCategory" DROP CONSTRAINT "taskCategory_taskId_fkey";

-- AlterTable
ALTER TABLE "taskCategory" DROP CONSTRAINT "taskCategory_pkey",
ADD COLUMN     "recommendedTaskId" INTEGER,
ALTER COLUMN "taskId" DROP NOT NULL,
ADD CONSTRAINT "taskCategory_pkey" PRIMARY KEY ("categoryId");

-- CreateTable
CREATE TABLE "recommendedTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskTypeId" INTEGER NOT NULL,
    "taskStatusId" INTEGER NOT NULL,
    "priorityId" INTEGER NOT NULL,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "recommendedTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recommendedTask" ADD CONSTRAINT "recommendedTask_taskStatusId_fkey" FOREIGN KEY ("taskStatusId") REFERENCES "taskStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendedTask" ADD CONSTRAINT "recommendedTask_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "taskType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendedTask" ADD CONSTRAINT "recommendedTask_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskCategory" ADD CONSTRAINT "taskCategory_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taskCategory" ADD CONSTRAINT "taskCategory_recommendedTaskId_fkey" FOREIGN KEY ("recommendedTaskId") REFERENCES "recommendedTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
