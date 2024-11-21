-- AlterTable
ALTER TABLE "subHub" ADD COLUMN     "countryId" INTEGER,
ADD COLUMN     "principalContent" JSONB,
ADD COLUMN     "rightContend" JSONB;

-- AddForeignKey
ALTER TABLE "subHub" ADD CONSTRAINT "subHub_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
