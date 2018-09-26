const Discord = require('discord.js');
const botbrain = require('./botbrain.js')

const client = new Discord.Client();

const prefix = '!'

client.on('error', error => { console.log(error) })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('message', msg => {

  // Ignore bots
  if (msg.author.bot) return

  if (msg.content.toLowerCase().includes("maga")) {
    msg.react("🇺🇸")
  }
  
  if (msg.content.toLowerCase().includes("conde")) {
    msg.react("conde")
  }

  if (msg.content.indexOf(prefix) !== 0) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  console.log("executing command: " + command + JSON.stringify(args))

  if (command === 'fg') {
    msg.reply('http://money.cnn.com/.element/img/5.0/data/feargreed/1.png')
  }

  if (command === 'exthrs') {
    botbrain.exthrs(args[0]).then(function(response) {
      msg.reply(response)
    })
  }

  if (command === 'cd') {
    msg.reply("", {
      file: botbrain.cd(args[0]) + ".png"
    })
  }

  if (command === 'cw') {
    msg.reply("", {
      file: botbrain.cw(args[0]) + ".png"
    })
  }

  if (command === 'es') {
    msg.reply("", {
      file: botbrain.es() + ".png"
    })
  }

});

client.login(process.env.AUTH_TOKEN);
