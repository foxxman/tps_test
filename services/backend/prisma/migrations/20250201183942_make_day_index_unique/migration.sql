/*
  Warnings:

  - A unique constraint covering the columns `[dayIndex]` on the table `Period` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Period_dayIndex_key" ON "Period"("dayIndex");
