module.exports = function(client) {
    /**
     * Command: !voteforshawn
     * @event chat
     * @params {string} channel
     * @params {object} user
     * @params {string} message
     */
    client.addListener('chat', function (channel, user, message) {
        if (message.indexOf('!voteforshawn') === 0 || message.indexOf('!voteforthomas') === 0) {
            client.say(channel, 'Vote for shawn.');
        }
    });
};
