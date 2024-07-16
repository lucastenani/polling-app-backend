/*
  Warnings:

  - You are about to drop the `options` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,poll_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `poll_id` to the `votes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_poll_id_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_option_id_fkey";

-- DropIndex
DROP INDEX "votes_user_id_option_id_key";

-- AlterTable
ALTER TABLE "polls" ADD COLUMN     "options" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "votes" ADD COLUMN     "poll_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "options";

-- CreateIndex
CREATE UNIQUE INDEX "votes_user_id_poll_id_key" ON "votes"("user_id", "poll_id");

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_poll_id_fkey" FOREIGN KEY ("poll_id") REFERENCES "polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
