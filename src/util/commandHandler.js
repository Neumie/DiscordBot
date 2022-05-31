const fs = require("node:fs");

module.exports = async (err, folders, client) => {
  if (err) return console.error(err);

  folders.forEach((folder) => {
    fs.readdirSync(`./src/commands/${folder}`).forEach((file) => {
      const command = require(`../commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    });
  });
};
