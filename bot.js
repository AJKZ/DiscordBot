const fs = require('fs');
const Discord = require('discord.js');
const { config } = require('dotenv');

// Set environment file
config({path: __dirname + '/.env'});

const bot = new Discord.Client();

// Get commands from directory
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const cmd = require(`./commands/${file}`);

    // set a new item in the Collection
	// with the key as the command name and the value as the exported module
    bot.commands.set(cmd.name, cmd);
}

const PREFIX = process.env.PREFIX;

bot.once('ready', () => {
    console.log(bot.user.username + ' is online. \n');
});

bot.on('message', message => {
    if(message.author.bot || !message.guild || !message.content.startsWith(PREFIX)) {
        return;
    }

    const args = message.content.slice(PREFIX.length).split(/ +/g);
    const cmd = args.shift().toLocaleLowerCase();
});

bot.login(process.env.TOKEN);
