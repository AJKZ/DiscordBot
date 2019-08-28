const Discord = require('discord.js');

module.exports = {
    name: 'post',
    aliases: ['lobby', 'create', 'host'],
    description: 'Post a game lobby embed.',
    args: true,
    run: async (bot, message, args) => {
        let time = new Date();
        time.setHours(time.getHours() + 1, time.getMinutes() + 30);

        // console.log(args);
        let title = args[0];
        let server = args[1];
        let mode = args[2];

        // Create Embed template
        let post = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL}`, ``)
            .setColor(0xFFFFFF)
            .setTimestamp(time)
            .setFooter(`${message.author.tag} | Expires at`);

        // PUBG
        if(title.includes('pubg')) {
            const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/pubg-thumbnail.png', 'pubg-thumbnail.png')
            
            post.attachFile(thumbnail)
                .setThumbnail('attachment://pubg-thumbnail.png')
                .setTitle(`PUBG lobby`)
                .addField('Server', `${server.toUpperCase()}`, true)
                .addField('Mode', `${mode.toUpperCase()}`, true)
        }

        // League of Legends
        if(title.includes('lol') || title.includes('league')) {
            const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/league-of-legends-thumbnail.png', 'lol-thumbnail.png')
            
            post.attachFile(thumbnail)
                .setThumbnail('attachment://lol-thumbnail.png')
                .setTitle(`League of Legends lobby`)
            // Server
            if(server === 'na') {
                post.addField('Server', `${server.toUpperCase()}`, true)
                    .setURL(`${bot.channels.get('162433380657397761').getURL()}`)
            }
            else if(server === 'euw') {
                post.addField('Server', `${server.toUpperCase()}`, true)
            }
            else {
                post.addField('Server', `n/a`, true)
            }

            // Game mode
            if(mode === 'duo') {
                post.addField('Game mode', mode.toUpperCase(), true)
            }
            else if(mode === 'flex') {
                post.addField('Game mode', mode.toUpperCase(), true)
            }
            else if(mode === 'tft') {
                post.addField('Game mode', mode.toUpperCase(), true)
            }
            else {
                post.addField('Game mode', `n/a`, true)
            }
        }
        
        // Monster Hunter World
        if(title.includes('mhw') || title.includes('monsterhunter')) {
            const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/mhw-thumbnail.png', 'mhw-thumbnail.png')
            
            post.attachFile(thumbnail)
                .setThumbnail('attachment://mhw-thumbnail.png')
                .setTitle(`Monster Hunter World lobby`)
                // ID
                .addField('Join Code', `${server}`, true)
        }

        // Variety
        else {

        }


            // const thumbnail = new Discord.Attachment('../DiscordBot/assets/thumbnails/mhw-thumbnail.png', 'mhw-thumbnail.png')
            
            // post.attachFile(thumbnail)
            //     .setThumbnail('attachment://mhw-thumbnail.png')
            //     .setTitle(`Monster Hunter World lobby`);

        bot.channels.get('614805626828226560').send(post)
        .then((post) => {
            post.react('✅')
            .then(() => post.react('❌'))
            .then(() => post.react('🔁'))
        })
    },
};
