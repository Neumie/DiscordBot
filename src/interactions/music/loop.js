const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Changes loop mode")
    .addNumberOption((option) =>
      option
        .setName("mode")
        .setDescription("Toggle mode")
        .setRequired(true)
        .addChoices(
          { name: "off", value: QueueRepeatMode.OFF },
          { name: "track", value: QueueRepeatMode.TRACK },
          { name: "queue", value: QueueRepeatMode.QUEUE },
          { name: "autoplay", value: QueueRepeatMode.AUTOPLAY }
        )
    ),
  async execute(interaction) {
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.reply({
        content: "No music is being played!",
      });
    const loopMode = interaction.options.get("mode").value;
    const success = queue.setRepeatMode(Number(loopMode));
    const mode =
      loopMode === "TRACK"
        ? "track"
        : loopMode === "QUEUE"
        ? "queue"
        : "autoplay";
    return void interaction.reply({
      content: success
        ? `${mode} Updated loop mode!`
        : "Could not update loop mode!",
    });
  },
};
