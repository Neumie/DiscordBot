const fs = require("fs");

module.exports = {
  event: "ready",
  once: true,
  execute(client) {
    console.log(`${client.user.tag} is online!`);
    client.user.setActivity(`Material Girl`, { type: "PLAYING" });

    //Loads interactions
    const interactionsHandler = require("../util/interactionHandler");
    fs.readdir("./src/interactions", (err, files) => {
      interactionsHandler(err, files, client);
    });
  },
};
