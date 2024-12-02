/*
  Warnings:

  - You are about to drop the column `userId` on the `issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- DropIndex
DROP INDEX `Issue_assignedToUserId_fkey` ON `issue`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
