const fs = require('fs');
const Discord = require('discord.js');

// environment variables
require('dotenv').config();
const PREFIX = process.env.PREFIX;

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

['command'].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// for(const file of commandFiles) {
//     const cmd = require(`./commands/${file}`);
//     // set a new item in the Collection
// 	// with the key as the command name and the value as the exported module
//     bot.commands.set(cmd.name, cmd);
// }

bot.once('ready', () => {
    console.log(bot.user.username + ' is online. \n');
});

bot.on('message', async (message) => {
    if(message.author.bot ||
        !message.content.startsWith(PREFIX) ||
        !message.guild) { return; }
    
    if(!message.member) {
        message.member = await message.guild.fetchMember(message);
    }

    // get the commands and arguments after prefix
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmdName = args.shift().toLocaleLowerCase();

    if(cmdName.length === 0) { return; }

    // find command
    let cmd = bot.commands.get(cmdName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    if(!cmd) { return; }
    
    // check for DM command
    if(cmd.guildOnly && message.channel.type !== 'text') {
        return message.reply(`Command can't be executed in DM.`);
    }

    // if a command that requires arguments was used
    // without arguments provided 
    if(cmd.args && !args.length) {
        let reply = `No arguments provided.`;

        if(cmd.usage) {
            reply += `\nUsage: \`${PREFIX}${cmd.name} ${cmd.usage}\``;
        }

        return message.channel.send(reply);
    }

    // execute command
    try {
        cmd.run(bot, message, args);
    }
    catch (error) {
        console.log(error);
        message.reply('Error trying to execute that command.');
    }
});

bot.login(process.env.TOKEN);
