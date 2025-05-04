-- CreateTable
CREATE TABLE "Dispute" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bureau" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "letterBody" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Dispute_userId_idx" ON "Dispute"("userId");

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
