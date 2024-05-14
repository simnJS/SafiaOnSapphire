import './lib/setup';
import '@sapphire/plugin-logger/register';

import { ApplicationCommandRegistries, LogLevel, RegisterBehavior, SapphireClient } from '@sapphire/framework';
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
import { GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();


const client = new SapphireClient({
  
	defaultPrefix: '!',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Debug
	},
	intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
	loadMessageCommandListeners: true
});

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login(process.env.DISCORD_TOKEN);
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		await client.destroy();
		process.exit(1);
	}
};

void main();
