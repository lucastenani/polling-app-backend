-- AlterTable
ALTER TABLE "polls" ALTER COLUMN "options" DROP DEFAULT,
ALTER COLUMN "options" SET DATA TYPE TEXT[];