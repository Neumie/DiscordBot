const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("playnext")
    .setDescription("Puts a song to the front of the queue")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("What to search for")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const searchResult = await player.search(
      interaction.options.get("input").value,
      {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      }
    );

    if (!searchResult || !searchResult.tracks.length)
      return interaction.editReply(`No results found!`);

    const queue = await player.createQueue(interaction.guild, {
      ytdlOptions: {
        filter: "audioonly",
        highWaterMark: 1 << 30,
        dlChunkSize: 0,
      },
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
      `Added **${
        searchResult.playlist
          ? `${searchResult.playlist.title}`
          : `${searchResult.tracks[0].title}`
      }** to the front of the queue!`
    );
    searchResult.playlist
      ? queue.insert(res.tracks)
      : queue.insert(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();
  },
};
