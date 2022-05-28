const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const { discordToken } = require("./src/config.json");
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
global.player = new Player(client, {
  disableVolume: true,
});

//Creates maps for various uses
client.commands = new Collection();
client.interactions = new Collection();

//Loads the command handler
const commandHandler = require("./src/util/commandHandler");
fs.readdir("./src/commands/", async (err, folders) => {
  await commandHandler(err, folders, client);
});

//Loads the event handler
const eventHandler = require("./src/util/eventHandler");
fs.readdir("./src/events/", (err, files) => {
  eventHandler(err, files, client);
});

//Logs in with discordToken
client.login(discordToken);
