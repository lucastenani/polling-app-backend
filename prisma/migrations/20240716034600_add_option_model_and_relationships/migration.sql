/*
  Warnings:

  - You are about to drop the column `options` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `vote_option1` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `vote_option2` on the `polls` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "polls" DROP COLUMN "options",
DROP COLUMN "vote_option1",
DROP COLUMN "vote_option2";

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
