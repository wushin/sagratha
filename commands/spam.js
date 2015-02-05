module.exports = function(client) {
    /**
     * Command: !spam [on|off]
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        if (debug) { console.log('Mod: '+user.username+' Spam'); }
        client.db.where('moderators', {channel: channel, name: user.username}).then(function (result) {
            if (debug) { console.log(isNaN(result[0].cid)); }
            if (!(isNaN(result[0].cid))) {
                if (message.indexOf('!spam') === 0) {
                    var params = message.split(' ');
                    switch (params[1]) {
                        case 'on':
                            client.r9kbetaoff(channel);
                            client.say(channel, 'Spam! Spam! Spam!');
                            break;
                        case 'off':
                            client.r9kbeta(channel);
                            client.say(channel, 'Cheeseburger, cheeseburger, cheeseburger.');
                            break;
                        default:
                            client.say(channel, 'spam needs to be followed on or off');
                    }
                }
            }
        });
    });
};
