-- CreateTable
CREATE TABLE "CreditBuilderLoan" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditBuilderLoan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditBuilderLoan" ADD CONSTRAINT "CreditBuilderLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
