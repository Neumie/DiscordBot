const fs = require("node:fs");
module.exports = async (err, folders, client) => {
  if (err) return console.error(err);

  folders.forEach((folder) => {
    fs.readdir(`./commands/${folder}`, async (err, files) => {
      files.forEach((file, index) => {
        const command = require(`./../commands/${folder}/${file}`);
        client.commands.set(command.name, command);

        if (command.aliases && Array.isArray(command))
          command.aliases.foreach((alias) =>
            client.aliases.set(alias, command.name)
          );
      });
    });
  });
};
