import { Subcommand } from '@sapphire/plugin-subcommands';

export class TicketCommand extends Subcommand  {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'ticket',
      description: 'Ticket commands',
      subcommands : [
        { name: 'create', chatInputRun: 'chatImputCreate' },
        { name: 'delete', chatInputRun: 'chatImputDelete'},
      ]
    });
  }

  public override registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand(
      (builder) =>
        builder
          .setName(this.name)
          .setDescription(this.description)
          .addSubcommand((subcommand) =>
            subcommand
              .setName('create')
              .setDescription('Create a ticket')
          )
          .addSubcommand((subcommand) =>
            subcommand
              .setName('delete')
              .setDescription('Delete a ticket')
          ),
    );
  }

  public async chatImputCreate(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.reply('Ticket created');
    // We will question the moderator about : Embed title, description, color, modal category, etc.

    
  }

  public async chatImputDelete(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.reply('Ticket deleted');
  }
}

