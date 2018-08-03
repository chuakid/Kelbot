var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

const bot = new Discord.Client();


bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user);
});

let list = [
  "!help: Gets this list",
  "!ping: Bot replies Pong!",
  "!d20: Bot rolls a d20 die"
]


bot.on('message', (message) => {
  if (message.content.substring(0, 1) == '!') {
    var args = message.content.substring(1).split(' ');
    var command = args[0];

    switch (command) {
      case 'ping':
        message.channel.send('Pong!');
        break;
      case 'd20':
        let a = Math.floor(Math.random() * 19 + 1)
        message.channel.send("You rolled a " + a);
        break;
      case 'help':
        message.channel.send(list.join("\n"));
        break;
      case 'bot':
        if (args[1] == "shut" && args[2] == "down") {
          message.channel.send("no", {
            file: "./images/Detroit-Become-Human-Twitch.jpg"
          })
        }
        break;
    }
  }
});

bot.login(auth.token);