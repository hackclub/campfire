/*
  Warnings:

  - A unique constraint covering the columns `[recordId]` on the table `Satellite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recordId` to the `Satellite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Satellite" ADD COLUMN     "recordId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Satellite_recordId_key" ON "Satellite"("recordId");
