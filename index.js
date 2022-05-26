const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { discordToken } = require("./config.json");
//Music imports
const { Player } = require("discord-player");
//Creates a client with desired intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
//Creates a music player
global.player = new Player(client);
//Creates maps for various uses
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();
//Loads the command handler
fs.readdir("./commands/", async (err, folders) => {
  const commandHandler = require("./util/commandHandler");
  await commandHandler(err, folders, client);
});
//Loads the event handler
fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./util/eventHandler");
  eventHandler(err, files, client);
});

module.exports = {
  client,
};

client.login(discordToken);
