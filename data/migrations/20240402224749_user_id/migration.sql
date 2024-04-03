/*
  Warnings:

  - You are about to drop the column `userId` on the `notes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_userId_fkey";

-- DropIndex
DROP INDEX "notes_userId_key";

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
