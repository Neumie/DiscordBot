module.exports = {
  event: "error",
  music: true,
  execute(queue, error) {
    console.error(
      `[${queue.guild.name}] Error emitted from the queue: ${error.message}`
    );
  },
};
