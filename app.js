var irc = require('twitch-irc');
var fs = require('fs');
var config = require('./config')
GLOBAL.debug = config.debug;

if (debug > 1) { console.log(config); }

var client = new irc.client({
    options: {
        debug: debug,
        debugIgnore: ['ping', 'chat', 'action'],
        logging: true,
        tc: 3
    },
    connection: {
        retries: config.retries,
        reconnect: config.reconnect,
        preferredServer: config.preferredServer,
        preferredPort: config.preferredPort,
        serverType: config.serverType,
    },
    identity: {
        username: config.username,
        password: config.password
    },
    channels: config.channels
});

client.connect();

// Add owner to mod db
if (debug) { console.log('Bot Owner: '+config.owner); }
config.channels.some(function(channel) {
    client.db.where('moderators', {channel: channel, name: config.owner}).then(function (result) {
        if (result === null || result < 1) {
            if (debug) { console.log('Result: Add '+config.owner); };
            client.db.insert('moderators', {channel: channel, name: config.owner});
        } else {
            if (debug) { console.log('Result: exists '+config.owner); };
        }
    }, function (err) {
        console.log('error: '+err);
    });
});

/**
 * Auto-load commands and events.
 */
if (fs.existsSync('./commands')) {
    fs.readdirSync('./commands/').forEach(function (file) {
        if (!(/(^|.\/)\.+[^\/\.]/g).test(file)) {
            require('./commands/' + file)(client);
        }
    });
}
if (fs.existsSync('./events')) {
    fs.readdirSync('./events/').forEach(function(file) {
        if (!(/(^|.\/)\.+[^\/\.]/g).test(file)) {
            require('./events/' + file)(client);
        }
    });
}

