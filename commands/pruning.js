const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Przełącz czyszczenie wiadomości od botów",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Wystąpił błąd podczas zapisywania do pliku.").catch(console.error);
      }

      return message.channel
        .send(`Message pruning is ${config.PRUNING ? "**enabled**" : "**disabled**"}`)
        .catch(console.error);
    });
  }
};
