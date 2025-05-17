/*
  Warnings:

  - A unique constraint covering the columns `[arrayUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "arrayUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_arrayUserId_key" ON "User"("arrayUserId");
