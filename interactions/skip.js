const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply(`No music is currently playing`);

    const success = queue.skip();

    return interaction.reply(
      success ? `Skipped the current song` : `Something went wrong`
    );
  },
};
