const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Changes loop mode")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Toggle mode")
        .setRequired(true)
        .addChoices(
          { name: "off", value: "OFF" },
          { name: "track", value: "TRACK" },
          { name: "queue", value: "QueueRepeatMode.QUEUE" },
          { name: "autoplay", value: "QueueRepeatMode.AUTOPLAY" }
        )
    ),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.reply({
        content: "No music is being played!",
      });
    const loopMode = interaction.options.get("mode").value;
    console.log(Number(loopMode));
    const success = queue.setRepeatMode(Number(loopMode));
    const mode =
      loopMode === "TRACK" ? "🔂" : loopMode === "QUEUE" ? "🔁" : "▶";
    return void interaction.sendFollowUp({
      content: success
        ? `${mode} | Updated loop mode!`
        : "❌ | Could not update loop mode!",
    });
  },
};
