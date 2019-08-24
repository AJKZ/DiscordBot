module.exports = {
    name: 'post',
    description: 'Post a lobby notice.',
    execute(message, args) {
        message.channel.send('Test post.')
    },
};