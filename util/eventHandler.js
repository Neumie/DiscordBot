module.exports = (err, files, client) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const eventFunction = require(`./../events/${file}`);
    if (eventFunction.disabled) return;

    const emitter = eventFunction.music ? player : client;
    const once = eventFunction.once;
    try {
      emitter[once ? "once" : "on"](eventFunction.event, (...args) => {
        eventFunction.execute(...args, client);
      });
    } catch (error) {
      console.error(error.stack);
    }
  });
};
