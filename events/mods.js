module.exports = function(client) {
    /**
     * Someone has get mods of the channel.
     *
     * @event subscription
     * @params {string} channel
     * @params {string} username
     */
    client.addListener('join', function (channel, username) {
        if (debug) { console.log('Trigger: Join Fired: Mods'); }
        client.mods(channel);
    });
    client.addListener('mods', function (channel, mods) {
        mods.some(function (mod) {
            // Add mods to db
            client.db.where('moderators', {channel: channel, name: mod}).then(function (result) {
                if (result === null || result < 1) {
                    if (debug) { console.log('Result: Add '+mod); };
                    client.db.insert('moderators', {channel: channel, name: mod});
                } else {
                    if (debug) { console.log('Result: exists '+mod); };
                }
            }, function (err) {
                console.log('error: '+err);
            });
        });
    });
};
