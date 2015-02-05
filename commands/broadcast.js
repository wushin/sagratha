module.exports = function(client) {
    /**
     * Command: !broadcast [on|off]
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    var cronJob = client.utils.cronjobs('*/1 * * * *', function() {
        client.db.list('broadcasts').then(function (result) {
            result.forEach(function (brmsg) {
                if (debug) { console.log(brmsg); }
                client.say(brmsg.channel, brmsg.msg);
            });
        });
    });
    client.addListener('chat', function (channel, user, message) {
        if (debug) { console.log('Mod: '+user.username+' broadcast'); }
        client.db.where('moderators', {channel: channel, name: user.username}).then(function (result) {
            if (debug) { console.log(isNaN(result[0].cid)); }
            if (!(isNaN(result[0].cid))) {
                if (message.indexOf('!broadcast') === 0) {
                    var params = message.split(' ');
                    switch (params[1]) {
                        case 'on':
                            cronJob.start();
                            client.say(channel, 'Broadcast on.');
                            break;
                        case 'off':
                            cronJob.stop();
                            client.say(channel, 'Silent mode.');
                            break;
                        case 'set':
                            var msg = "";
                            var msg_time = params[2];
                            if (isNaN(msg_time)) { 
                                client.say(channel, 'broadcast time needs to be numeric.');
                                break;
                            }
                            var word_array = params.slice(3);
                            if (word_array.length === 0) {
                                client.say(channel, 'broadcast msg needs to words.');
                                break;
                            }
                            word_array.some(function (word) {
                                msg += word+" ";
                            });
                            client.db.insert('broadcasts', {channel: channel, msg: msg});
                            client.say(channel, msg);
                            break;
                        case 'list':
                            client.db.list('broadcasts', {channel: channel}).then(function (result) {
                                result.forEach(function (brmsg) {
                                    if (debug) { console.log(brmsg); }
                                    client.say(channel, '[' +brmsg.cid+']'+' channel:'+brmsg.channel+' msg:'+brmsg.msg);
                                });
                            });
                            break;
                        case 'del':
                            client.db.remove('broadcasts', parseInt(params[2])).then(function (result) {
                                client.say(channel, 'deleting msg '+params[2]);
                            });
                            break;
                        default:
                            client.say(channel, 'broadcast needs to be followed on, off, set <timeInMinutes> <Msg>');
                    }
                }
            }
        });
    });
};
