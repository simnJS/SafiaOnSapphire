import { Events, Listener } from "@sapphire/framework";
import { Guild } from "discord.js";
import GuildService from "../../lib/database/guildService";

export class GuildCreate extends Listener<typeof Events.GuildCreate> {
    public override async run(guild: Guild) {
      GuildService.UpdateOrCreateGuildWithAllUsers(guild);

    }
}