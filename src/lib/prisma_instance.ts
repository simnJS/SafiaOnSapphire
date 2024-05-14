import {PrismaClient} from "@prisma/client";
import { container } from "@sapphire/framework";
declare global {
  var global_prisma_instance: PrismaClient;
}

let prisma_instance: PrismaClient;

if (!global.global_prisma_instance) {
  container.logger.info("Creating a new Prisma instance");
  global.global_prisma_instance = new PrismaClient();
}

prisma_instance = global.global_prisma_instance;

export default prisma_instance;