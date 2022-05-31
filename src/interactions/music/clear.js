const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears the queue"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue) return void interaction.reply("No music in the queue!");

    queue.clear();

    interaction.reply("Queue cleared!");
  },
};
