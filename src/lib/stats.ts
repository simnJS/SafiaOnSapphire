import { ContextMenuCommandSuccessPayload, ChatInputCommandSuccessPayload, MessageCommandSuccessPayload } from "@sapphire/framework";
import GuildService from "./database/guildService";

export function UpdateCommandCount(payload: ContextMenuCommandSuccessPayload | ChatInputCommandSuccessPayload | MessageCommandSuccessPayload): void {

  if ('interaction' in payload) {
    GuildService.UpdateCommandCount(payload.interaction.guild ! );	
	} else {
    GuildService.UpdateCommandCount(payload.message.guild ! );
	}

}

