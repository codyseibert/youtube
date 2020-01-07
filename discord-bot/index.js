const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`I am ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.includes('party time')) {
    msg.reply('☜(⌒▽⌒)☞');
  }
});

client.login(process.env.TOKEN);
