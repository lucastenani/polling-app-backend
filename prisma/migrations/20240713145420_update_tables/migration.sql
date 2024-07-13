/*
  Warnings:

  - You are about to drop the column `pollId` on the `options` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `polls` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `votes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `votes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,option_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poll_id` to the `options` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `polls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option_id` to the `votes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_pollId_fkey";

-- DropForeignKey
ALTER TABLE "polls" DROP CONSTRAINT "polls_userId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_optionId_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_userId_fkey";

-- DropIndex
DROP INDEX "votes_userId_optionId_key";

-- AlterTable
ALTER TABLE "options" DROP COLUMN "pollId",
ADD COLUMN     "poll_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "polls" DROP COLUMN "isActive",
DROP COLUMN "userId",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "votes" DROP COLUMN "optionId",
DROP COLUMN "userId",
ADD COLUMN     "option_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_option_id_key" ON "votes"("user_id", "option_id");

-- AddForeignKey
ALTER TABLE "polls" ADD CONSTRAINT "polls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
