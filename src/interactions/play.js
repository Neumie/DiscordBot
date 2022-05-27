const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Let's you play a song")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("What to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const res = await player.search(interaction.options.get("input").value, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length)
      return interaction.editReply(`No results found!`);

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.deleteQueue(interaction.guild.id);
      return interaction.editReply(`I can't join the voice channel!`);
    }
    await interaction.editReply(
      `Added ${
        res.playlist ? `${res.playlist.title}` : `${res.tracks[0].title}`
      } to the queue!`
    );
    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
    if (!queue.playing) await queue.play();
  },
};
