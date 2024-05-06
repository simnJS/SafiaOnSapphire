import { Command, RegisterBehavior } from '@sapphire/framework';
import { ApplicationCommandType, Guild, GuildMember, Snowflake, User } from 'discord.js';

export class BanCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ban',
      aliases: ['b'],
      description: 'Ban a user from the server',
      requiredClientPermissions: ['BanMembers', 'SendMessages'],
      requiredUserPermissions: ['BanMembers'],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addUserOption((option) => option.setName('user').setDescription('The user to ban').setRequired(true))
          .addStringOption((option) => option.setName('reason').setDescription('The reason for banning the user')),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
      }
    );
    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.User
    });
    registry.registerContextMenuCommand({
      name: this.name,
      type: ApplicationCommandType.Message
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const mod = interaction.user;
    const { guild } = interaction;

    // Checks if all variables are of the right type
    if (!guild || !user) {
      await interaction.reply({
        content: 'Error fetching guild!',
        ephemeral: true,
        fetchReply: true,
      });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const ban = await this.ban(user.id, mod.id, reason, guild);

    await interaction.editReply({
      content: ban.message,
    });
  }

  public override async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
    if (interaction.isUserContextMenuCommand() && interaction.targetMember instanceof GuildMember) {
      const user = interaction.targetMember.user;
      const reason = 'No reason provided';
      const mod = interaction.user;
      const { guild } = interaction;

      // Checks if all variables are of the right type
      if (!guild || !user) {
        await interaction.reply({
          content: 'Error fetching guild!',
          ephemeral: true,
          fetchReply: true,
        });
        return;
      }

      await interaction.deferReply({ ephemeral: true });

      const ban = await this.ban(user.id, mod.id, reason, guild);

      await interaction.editReply({
        content: ban.message,
      });
    } else if (interaction.isMessageContextMenuCommand() && interaction.targetMessage.author) {
      const user = interaction.targetMessage.author;
      const reason = 'No reason provided';
      const mod = interaction.user;
      const { guild } = interaction;

      // Checks if all variables are of the right type
      if (!guild || !user) {
        await interaction.reply({
          content: 'Error fetching guild!',
          ephemeral: true,
          fetchReply: true,
        });
        return;
      }

      await interaction.deferReply({ ephemeral: true });

      const ban = await this.ban(user.id, mod.id, reason, guild);

      await interaction.editReply({
        content: ban.message,
      });
    }
  }

  private async ban(userId: Snowflake, modId: Snowflake, reason: string, guild: Guild) {

    const info = {
      message: '',
      success: false,
    };

    let user = guild.client.users.cache.get(userId);

    if (user === undefined) {
      user = (await guild.client.users.fetch(userId)) as User;
    }

    // Gets mod's GuildMember
    const mod = guild.members.cache.get(modId);

    // Checks if guildMember is null
    if (mod === undefined) {
      info.message = 'Error fetching mod!';
      return info;
    }

    const member = guild.members.cache.get(user.id);

    // Checks if member is null
    if (member === undefined) {
      info.message = 'User not found!';
      return info;
    }

    if (member === mod) {
      info.message = 'You cannot ban yourself!';
      return info;
    }

    await member.send(`You have been banned from ${guild.name} for ${reason} by ${mod.user.tag}`).catch(() => { });

    // await member.ban({ reason: reason });

    info.success = true;
    info.message = `Successfully banned ${user.tag} from the server!`;

    return info;




  }

}