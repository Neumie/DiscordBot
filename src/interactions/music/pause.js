const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses current queue"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue) return interaction.reply(`No music is currently playing`);

    const success = queue.setPaused(true);

    return interaction.reply(
      success ? `Paused this shit ajajajaa` : `Something went wrong`
    );
  },
};
