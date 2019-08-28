const fs = require('fs');
const ascii = require('ascii-table');

const cmdList = new ascii().setHeading('Command', 'Load Status');

module.exports = (bot) => {
    fs.readdirSync('./commands/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

        for(let file of commands) {
            let pulledCommands = require(`../commands/${dir}/${file}`);
            
            if(pulledCommands.name) {
                bot.commands.set(pulledCommands.name, pulledCommands);
                cmdList.addRow(file, 'Success');
            } else {
                cmdList.addRow(file, 'Failed');
                continue;
            }

            if(pulledCommands.aliases && Array.isArray(pulledCommands)) {
                pulledCommands.aliases.forEach(alias => bot.aliases.set(alias, pulledCommands.name));
            }
        }
    });

    console.log(cmdList.toString());
}
