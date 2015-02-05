module.exports = function(client) {
    /**
     * Command: !help
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        if (message.indexOf('!help') === 0) {
            var params = message.split(' ');
            switch (params[1]) {
                case 'ping':
                    client.ping();
                    client.addListener('pong', function (latency) {
                        client.say(channel, 'Client & Server latency: '+latency+'ms');
                    });
                    break;
                case 'source':
                    client.say(channel, 'Sources: https://github.com/wushin/sagratha, https://github.com/Schmoopiie/twitch-irc.');
                    break;
                case 'help':
                    client.say(channel, 'We need an Adult!');
                    break;
                default:
                    client.say(channel, 'commands are prefixed with ! commands available ban, unban, op, slow, spam, broadcast, help');
            }
        }
    });
};
