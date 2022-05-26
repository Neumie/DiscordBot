const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes music"),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue) return interaction.reply(`No music in the queue`);

    const success = queue.setPaused(false);

    return interaction.reply(
      success ? `Resumed ${queue.current.title}` : `Something went wrong`
    );
  },
};
