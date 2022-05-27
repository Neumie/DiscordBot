module.exports = {
  event: "trackStart",
  music: true,
  execute(queue, track) {
    queue.metadata.send(`🎶 Started playing: **${track.title}**!`);
  },
};
