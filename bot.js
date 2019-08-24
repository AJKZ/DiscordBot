const { Client } = require('discord.js');
const { config } = require('dotenv');

const bot = new Client();

config({
    path: __dirname + '/.env'
});

const PREFIX = `process.env.PREFIX`;

bot.on('ready', () => {
    console.log(bot.user.username + ' is online. \n');
});

bot.login(process.env.TOKEN);
