const fs = require("node:fs");

module.exports = async (err, folders, client) => {
  if (err) return console.error(err);

  folders.forEach((folder) => {
    fs.readdirSync(`./src/commands/${folder}`, async (files) => {
      files.forEach((file) => {
        const command = require(`./src/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
      });
    });
  });
};
