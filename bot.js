var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});


bot.on('ready', function (evt) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

let list = [
  "!help: Gets this list",
  "!ping: Bot replies Pong!",
  "!d20: Bot rolls a d20 die"
]


bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var command = args[0];

    args = args.splice(1);
    switch (command) {
      case 'ping':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        });
        break;
      case 'd20':
        let a = Math.floor(Math.random() * 19 + 1)
        bot.sendMessage({
          to: channelID,
          message: a
        })
        break;
      case 'help':
        bot.sendMessage({
          to:channelID,
          message: list.join("\n")
        })        
        break;
    }
  }
});
