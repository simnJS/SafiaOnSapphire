import { RegisterBehavior } from "@sapphire/framework";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { colors } from "../lib/colors";




export class BotCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'bot',
      description: 'Get information about the bot',
      requiredClientPermissions: ['SendMessages'],
    });
  }


  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      }
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.reply({
      content: `Loading...`,
      fetchReply: true,
    });

    // Get automatically the discord.js version
    const discordVersion = require('discord.js').version;
    const sapphireVersion = require('@sapphire/framework').version;

    const allUsers = interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    // convert the uptime to a human readable format without pretty-ms package only using the built-in Date object
    const uptime = interaction.client.uptime;
    const days = Math.floor(uptime / 86400000);
    const hours = Math.floor(uptime / 3600000) % 24;
    const minutes = Math.floor(uptime / 60000) % 60;
    const readableUptime = `${days}d ${hours}h ${minutes}m`;

  
    const embed = new EmbedBuilder()
      .setTitle('» Safia')
      .setDescription('Advanced __multipurpose__ bot with __moderation__ and __fun__ commands made by __**simnJS**__. \n\n**[Invite Safia](https://discord.com/oauth2/authorize?client_id=898267894383321354&permissions=8&scope=bot%20applications.commands)**')
      .addFields(
        {
          name: 'Stats', value: `
      > **Guilds** » \`${interaction.client.guilds.cache.size}\` 
      > **Users** » \`${allUsers}\` 
      > **Uptime** » \`${readableUptime}\` `, inline: true
        },

        {
          name: 'Bot', value: `
      > **Discord.js** » \`${discordVersion}\` 
      > **Sapphire** » \`${sapphireVersion}\` 
      > **Ping** » \`${interaction.client.ws.ping}ms\` `, inline: true
        },
        {
          name: 'Developer', value: `
      > **Name** » \`simnJS\` 
      > **Discord** » \`simnjs_\` 
      > **GitHub** » [simnJS](https://github.com/simnJS) `, inline: true
        }
      )
      .setColor(colors.Primary)
      .setTimestamp()
      .setFooter({ text: 'Made with ❤️ by simnJS' });

    await interaction.editReply({
      content: `Here is some information about me!`,
      embeds: [embed],
    });


  }
}
