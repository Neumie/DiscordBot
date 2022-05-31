const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the music and deletes the queue"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply(`No music is currently playing`);

    queue.destroy();

    interaction.reply(`Music has been stopped`);
  },
};
