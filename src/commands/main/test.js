module.exports = {
  name: "test",
  description: "A test command",
  aliases: ["?"],
  usage: "<command>",
  guildOnly: false,
  args: false,
  permissions: {
    bot: [],
    user: [],
  },
  execute: (message, args, client) => {
    message.reply("TEST");
  },
};
