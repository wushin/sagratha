module.exports = function(client) {
    /**
     * Command: !ban [nick] | !unban [nick]
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        var params = message.split(' ');
        if (debug) { console.log('Mod: '+user.username+' Ban'); }
        client.db.where('moderators', {channel: channel, name: user.username}).then(function (result) {
            if (debug) { console.log(isNaN(result[0].cid)); }
            if (!(isNaN(result[0].cid))) {
                if (message.indexOf('!ban') === 0) {
                    if(!(params[1] === undefined) && user.username != params[1]) {
                        //client.ban(channel, params[1]);
                        if (debug) { console.log('Mod: '+user.username+' Ban: '+ params[1]); }
                        client.say(channel, user.username+', has owned '+ params[1]);
                    }
                } else if (message.indexOf('!unban') === 0) {
                    if(!(params[1] === undefined) && user.username != params[1]) {
                        //client.unban(channel, params[1]);
                        if (debug) { console.log('Mod: '+user.username+' Unban: '+ params[1]); }
                        client.say(channel, user.username+', mercy has been granted by '+ params[1]);
                    }
                }
            }
        });
    });
};
