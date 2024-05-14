// database/birthday/BirthdayService.ts

import prisma_instance from "../prisma_instance";

export default class BirthdayService {
  public static async setBirthday(userId: string, date: Date) {
    try {
      await prisma_instance.anniversary.upsert({
        where: {
          userId: userId,
        },
        update: {
          date: date,
        },
        create: {
          userId: userId,
          date: date,
        },
      });
      console.log(`Set birthday for user ID: ${userId} to date: ${date}`);
    } catch (error) {
      console.error(`Failed to set birthday: ${error}`);
    }
  }

  public static async deleteBirthday(userId: string) {
    try {
      await prisma_instance.anniversary.delete({
        where: {
          userId: userId,
        },
      });
      console.log(`Deleted birthday for user ID: ${userId}`);
    } catch (error) {
      console.error(`Failed to delete birthday: ${error}`);
    }
  }

  public static async getBirthday(userId: string) {
    try {
      const birthday = await prisma_instance.anniversary.findUnique({
        where: {
          userId: userId,
        },
      });
      return birthday;
    } catch (error) {
      console.error(`Failed to get birthday for user ID: ${userId}`);
    }
  }
}
