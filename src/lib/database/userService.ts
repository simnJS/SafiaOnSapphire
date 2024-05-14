// database/user/UserService.ts

import { Guild, GuildMember } from "discord.js";
import prisma_instance from "../prisma_instance";

export default class UserService {
  public static async createUser(user : GuildMember, guild: Guild) {
    try {
      await prisma_instance.user.create({
        data: {
          id: user.id,
          guildId: guild.id,
          username: user.user.username,
        },
      });
      console.log(`Created user with ID: ${user.id} in guild: ${guild.name}`);
    } catch (error) {
      console.error(`Failed to create user: ${error}`);
    }
  }

  public static async deleteUser(userId: string) {
    try {
      await prisma_instance.user.delete({
        where: {
          id: userId,
        },
      });
      console.log(`Deleted user with ID: ${userId}`);
    } catch (error) {
      console.error(`Failed to delete user: ${error}`);
    }
  }
}
