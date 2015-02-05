module.exports = function(client) {
    /**
     * Command: !op
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        var params = message.split(' ');
        if (debug) { console.log('Mod: '+user.username+' OPs'); }
        client.db.where('moderators', {channel: channel, name: user.username}).then(function (result) {
            if (debug) { console.log(isNaN(result[0].cid)); }
            if (!(isNaN(result[0].cid))) {
                if (message.indexOf('!op') === 0) {
                    if(!(params[1] === undefined) && user.username != params[1]) {
                        //client.mod(channel, params[1]);
                        if (debug) { console.log('Mod: '+user.username+' Modded: '+ params[1]); }
                        client.say(channel, user.username+', granted ops to '+ params[1]);
                    }
                } else if (message.indexOf('!deop') === 0) {
                    if(!(params[1] === undefined) && user.username != params[1]) {
                        //client.unmod(channel, params[1]);
                        if (debug) { console.log('Mod: '+user.username+' Unmod: '+ params[1]); }
                        client.say(channel, user.username+', removed ops from '+ params[1]);
                    }
                }
            }
        });
    });
};
