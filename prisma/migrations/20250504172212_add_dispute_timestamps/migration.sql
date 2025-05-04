-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastDisputeSentAt" TIMESTAMP(3),
ADD COLUMN     "nextDisputeAt" TIMESTAMP(3);
