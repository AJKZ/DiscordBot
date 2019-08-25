const Discord = require('discord.js');

module.exports = {
    name: 'post',
    description: 'Post an embedded game lobby.',
    args: true,

    execute(bot, message, args) {
        let time = new Date();
        time.setHours(time.getHours() + 1);

        // Create Embed template
        let post = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`, ``)
            .setColor(0xFFFFFF)
            .setTimestamp(time)
            .setFooter(`${message.author.tag} | Post expires in 1 hour`)
            // Second argument - Server/Join code/etc
            .addField(`Server`, `${args[1]}`, true)
            // Third argument - Game mode
            .addField(`Game mode`, `${args[2]}`.toLocaleUpperCase(), true);
        
        // First argument - Title/Game
        if(args[0].includes('pubg')) {
            const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/pubg-thumbnail.png', 'pubg-thumbnail.png');
            
            post.attachFile(thumbnail)
                .setThumbnail('attachment://pubg-thumbnail.png')
                .setTitle(`PUBG game lobby`)
        }
        if(args[0].includes('lol') || args[0].includes('league')) {
            const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/league-of-legends-thumbnail.png', 'lol-thumbnail.png');
            
            post.attachFile(thumbnail)
                .setThumbnail('attachment://lol-thumbnail.png')
                .setTitle(`League of Legends game lobby`)
        }
        else {
            post.setTitle(`${args[0]}`.toUpperCase() + ` game lobby`)
        }

        bot.channels.get('614805626828226560').send(post);
    },
};
