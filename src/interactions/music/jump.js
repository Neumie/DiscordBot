const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Skips tracks")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("How many songs to skip")
        .setRequired(true)
    ),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing)
      return interaction.reply(`No music is currently playing`);

    const numberToSkip = interaction.options.get("input").value;
    const trackIndex = numberToSkip - 1;
    queue.jump(trackIndex);

    interaction.reply(`Skipped ${numberToSkip} songs`);
  },
};
