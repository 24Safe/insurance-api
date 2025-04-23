-- AlterTable
ALTER TABLE "prices" ADD COLUMN     "coverageId" INTEGER,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "subCoverageId" INTEGER;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_coverageId_fkey" FOREIGN KEY ("coverageId") REFERENCES "coverageTemplates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_subCoverageId_fkey" FOREIGN KEY ("subCoverageId") REFERENCES "coverageTemplates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
