/*
  Warnings:

  - You are about to drop the column `chronicDiseasesId` on the `diplomat` table. All the data in the column will be lost.
  - You are about to drop the column `insuranceTypeId` on the `diplomat` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleTypeId` on the `diplomat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "diplomat" DROP CONSTRAINT "diplomat_chronicDiseasesId_fkey";

-- DropForeignKey
ALTER TABLE "diplomat" DROP CONSTRAINT "diplomat_insuranceTypeId_fkey";

-- DropForeignKey
ALTER TABLE "diplomat" DROP CONSTRAINT "diplomat_vehicleTypeId_fkey";

-- AlterTable
ALTER TABLE "diplomat" DROP COLUMN "chronicDiseasesId",
DROP COLUMN "insuranceTypeId",
DROP COLUMN "vehicleTypeId",
ADD COLUMN     "chronicDiseases" JSONB,
ADD COLUMN     "insuranceTypes" JSONB,
ADD COLUMN     "pets" JSONB,
ADD COLUMN     "vehicleType" JSONB;
