const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();

bot.on('ready', function (evt) {
  console.log('Connected');
  console.log('Logged in as: ');
  console.log(bot.user.username);
});

let list = [
  "!help: Gets this list",
  "!ping: Bot replies Pong!",
  "!d20: Bot rolls a d20 die",
  "!d6: Bot rolls a d6 die",
  "!hi: Bot says hi",
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
        var a = Math.floor(Math.random() * 20) + 1;
        message.channel.send("You rolled a " + a);
        break;
      case 'd6':
        var a = Math.floor(Math.random() * 6) + 1;
        message.channel.send("You rolled a " + a);
        break;
      case 'hi':
        message.channel.send("Hi");
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