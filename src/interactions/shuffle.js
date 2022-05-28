const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the queue"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.reply("No music is currently playing!");

    await queue.shuffle();

    interaction.reply("The queue has been shuffled!");
  },
};
