module.exports = {
  event: "interactionCreate",
  execute: async (interaction, client) => {
    if (!interaction.isCommand()) return;

    const command = client.interactions.get(interaction.commandName);

    if (!command) return;

    //Try to execute the command
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
