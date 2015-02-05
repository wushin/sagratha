module.exports = function(client) {
    /**
     * Command: !slow [on|off]
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        if (debug) { console.log('Mod: '+user.username+' Slow'); }
        client.db.where('moderators', {channel: channel, name: user.username}).then(function (result) {
            if (debug) { console.log(isNaN(result[0].cid)); }
            if (!(isNaN(result[0].cid))) {
                if (message.indexOf('!slow') === 0) {
                    var params = message.split(' ');
                    switch (params[1]) {
                        case 'on':
                            client.slow(channel);
                            client.say(channel, 'Bullet time enabled.');
                            break;
                        case 'off':
                            client.slowoff(channel);
                            client.say(channel, 'It\'s sunny drive time!');
                            break;
                        default:
                            client.say(channel, 'slow needs to be followed on or off');
                    }
                }
            }
        });
    });
};
