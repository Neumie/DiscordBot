module.exports = {
  event: "connectionError",
  music: true,
  execute(queue, error) {
    console.error(
      `[${queue.guild.name}] Error emitted from the connection: ${error.message}`
    );
  },
};
