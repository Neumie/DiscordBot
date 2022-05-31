const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { discordToken } = require("./../config.json");
const fs = require("node:fs");

module.exports = async (err, folders, client) => {
  if (err) return console.error(err);

  client.interactionsArray = [];
  folders.forEach((folder) => {
    fs.readdirSync(`./src/interactions/${folder}`).forEach((file) => {
      const interaction = require(`./../interactions/${folder}/${file}`);
      client.interactions.set(interaction.data.name, interaction);
      client.interactionsArray.push(interaction.data.toJSON());
    });
  });

  const rest = new REST({ version: "9" }).setToken(discordToken);

  (async () => {
    try {
      const guildIds = await client.guilds.cache.map((guild) => guild.id);
      const clientId = await client.user.id;
      guildIds.forEach(async (guildId) => {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: client.interactionsArray,
        });
      });
    } catch (error) {
      console.error(error);
    }
  })();
};
