/*
  Warnings:

  - You are about to drop the column `arrayUserId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_arrayUserId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "arrayUserId";
