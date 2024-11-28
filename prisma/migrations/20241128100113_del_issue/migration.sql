/*
  Warnings:

  - You are about to drop the `issue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- DropTable
DROP TABLE `issue`;
