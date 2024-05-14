-- CreateTable
CREATE TABLE `Guild` (
    `id` VARCHAR(191) NOT NULL,
    `discordId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `memberCount` INTEGER NOT NULL,

    UNIQUE INDEX `Guild_discordId_key`(`discordId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketSystem` (
    `id` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `channel` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `defaultMessage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TicketSystem_guildId_key`(`guildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketSystem` ADD CONSTRAINT `TicketSystem_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `Guild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
