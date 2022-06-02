const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Deletes X messages")
    .addIntegerOption((option) =>
      option
        .setName("input")
        .setDescription("How many messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.member.user.id !== "284992430313439234") {
      //Permissions for command
      return interaction.reply({
        content: "You don't have permission for this command!",
        ephemeral: true,
      });
    }

    deleteAmount = interaction.options.get("input").value;
    interaction.channel.bulkDelete(deleteAmount + 1, true);

    interaction.reply(`Cleared ${deleteAmount} messages!`);
  },
};
