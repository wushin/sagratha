module.exports = function(client) {
    /**
     * Someone has subscribed to a channel.
     *
     * @event subscription
     * @params {string} channel
     * @params {string} username
     */
    client.addListener('subscription', function (channel, username) {
        if (debug) { console.log('Suscription: '+username); }
        client.say(channel, 'Lets get some hype for '+username);
    });
};
