/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CreditBuilderLoan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CreditBuilderLoan" ADD COLUMN     "lastOpenedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT DEFAULT 'opened_widget';

-- CreateIndex
CREATE UNIQUE INDEX "CreditBuilderLoan_userId_key" ON "CreditBuilderLoan"("userId");
