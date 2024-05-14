/*
  Warnings:

  - You are about to drop the column `createdAt` on the `guild` table. All the data in the column will be lost.
  - You are about to drop the column `discordId` on the `guild` table. All the data in the column will be lost.
  - You are about to drop the column `memberCount` on the `guild` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `guild` table. All the data in the column will be lost.
  - You are about to drop the `ticketsystem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Guild_discordId_key` ON `guild`;

-- AlterTable
ALTER TABLE `guild` DROP COLUMN `createdAt`,
    DROP COLUMN `discordId`,
    DROP COLUMN `memberCount`,
    DROP COLUMN `updatedAt`;

-- DropTable
DROP TABLE `ticketsystem`;

-- CreateTable
CREATE TABLE `Bot` (
    `id` VARCHAR(191) NOT NULL,
    `commandExecutedCount` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_id_guildId_key`(`id`, `guildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Anniversary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Anniversary_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Anniversary` ADD CONSTRAINT `Anniversary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
