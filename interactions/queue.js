const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { settings } = require("./../util/settings.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Displays the queue"),
  async execute(interaction, client) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue) return interaction.reply(`No music is currently playing!`);

    if (!queue.tracks[0]) return interaction.reply(`No music is in the queue`);

    const embed = new MessageEmbed();

    embed.setColor(settings.embedColor);
    embed.setThumbnail(
      interaction.guild.iconURL({ size: 2048, dynamic: true })
    );
    embed.setAuthor(`Queue - ${interaction.guild.name}}`);

    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title}\nduration: ${
          track.duration
        } (requested by: ${track.requestedBy.username})\n`
    );

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)` : ``;

    embed.setDescription(
      `**0** - ${queue.current.title}\nduration: ${
        queue.current.duration
      } (requested by: ${queue.current.requestedBy.username}) \n\n${tracks
        .slice(0, 5)
        .join("\n")}\n${nextSongs}`
    );

    interaction.reply({ embeds: [embed] });
  },
};
