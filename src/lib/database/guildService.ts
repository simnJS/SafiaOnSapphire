import { Guild } from "discord.js";
import prisma_instance from "../prisma_instance";
import UserService from "./userService";

export default class GuildService {

  public static async updateOrCreateGuild(guild: Guild) {
    try {
      await prisma_instance.guild.upsert({
        where: {
          id: guild.id,
        },
        update: {
          name: guild.name,
        },
        create: {
          id: guild.id,
          name: guild.name,
        },
      });
      console.log(`Updated or created a guild in the database: ${guild.name}`);
    } catch (error) {
      console.error(`Failed to update or create a guild in the database: ${error}`);
    }
  }

  public static async UpdateOrCreateGuildWithAllUsers(guild: Guild) {

    await this.updateOrCreateGuild(guild).then(async () => {
      await guild.members.fetch().then(async (members) => {
        members.forEach(async (member) => {
          await UserService.createUser(member, guild);
        });
      });
    }
    );

  }

  public static async deleteGuild(guildId: string) {
    try {
      await prisma_instance.guild.delete({
        where: {
          id: guildId,
        },
      });
      console.log(`Deleted guild with ID: ${guildId}`);
    } catch (error) {
      console.error(`Failed to delete guild: ${error}`);
    }
  }

  public static async UpdateCommandCount(guild: Guild) {
    try {
      await prisma_instance.guild.update({
        where: {
          id: guild.id,
        },
        data: {
          commandsExecutedCount: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error(`Failed to update command count: ${error}`);
    }
  }
}
