const fs = require("fs");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity(`Material Girl`, { type: "PLAYING" });

    //handle all interactions after the bot is online so you have access to guild id's
    fs.readdir("./interactions/", (err, files) => {
      const interactionsHandler = require("./../util/interactionHandler");
      interactionsHandler(err, files, client);
    });
  },
};
