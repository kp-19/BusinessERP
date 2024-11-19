/*
  Warnings:

  - The primary key for the `ExpenseSummary` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ExpenseSummaryId` on the `ExpenseSummary` table. All the data in the column will be lost.
  - You are about to drop the `ExpensesByCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expenseSummaryId` to the `ExpenseSummary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpensesByCategory" DROP CONSTRAINT "ExpensesByCategory_expenseSummaryId_fkey";

-- AlterTable
ALTER TABLE "ExpenseSummary" DROP CONSTRAINT "ExpenseSummary_pkey",
DROP COLUMN "ExpenseSummaryId",
ADD COLUMN     "expenseSummaryId" TEXT NOT NULL,
ADD CONSTRAINT "ExpenseSummary_pkey" PRIMARY KEY ("expenseSummaryId");

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "rating" DROP NOT NULL;

-- DropTable
DROP TABLE "ExpensesByCategory";

-- CreateTable
CREATE TABLE "ExpenseByCategory" (
    "expenseByCategoryId" TEXT NOT NULL,
    "expenseSummaryId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseByCategory_pkey" PRIMARY KEY ("expenseByCategoryId")
);

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
