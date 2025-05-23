-- CreateTable
CREATE TABLE "DisputeRound" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'draft',
    "deliveryMethod" TEXT,
    "trackingNumbers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "estimatedResponseDate" TIMESTAMP(3),

    CONSTRAINT "DisputeRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisputeItem" (
    "id" SERIAL NOT NULL,
    "disputeRoundId" INTEGER NOT NULL,
    "accountId" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "creditorName" TEXT NOT NULL,
    "bureau" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "canDisputeAgain" TIMESTAMP(3),
    "responseReceived" BOOLEAN NOT NULL DEFAULT false,
    "outcome" TEXT,

    CONSTRAINT "DisputeItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DisputeRound_userId_idx" ON "DisputeRound"("userId");

-- CreateIndex
CREATE INDEX "DisputeRound_status_idx" ON "DisputeRound"("status");

-- CreateIndex
CREATE INDEX "DisputeItem_disputeRoundId_idx" ON "DisputeItem"("disputeRoundId");

-- CreateIndex
CREATE INDEX "DisputeItem_accountId_idx" ON "DisputeItem"("accountId");

-- CreateIndex
CREATE INDEX "DisputeItem_canDisputeAgain_idx" ON "DisputeItem"("canDisputeAgain");

-- CreateIndex
CREATE INDEX "DisputeItem_status_idx" ON "DisputeItem"("status");

-- AddForeignKey
ALTER TABLE "DisputeRound" ADD CONSTRAINT "DisputeRound_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisputeItem" ADD CONSTRAINT "DisputeItem_disputeRoundId_fkey" FOREIGN KEY ("disputeRoundId") REFERENCES "DisputeRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
