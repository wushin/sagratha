#Sagratha

##Dependacies
* nodejs (nodejs-legacy for debian)

##How-to

* Create Bot Account on twitch
* Get Api Key from Twitch [here]((http://twitchapps.com/tmi/)
* cp ./config.js.example ./config.js
* Edit config.js for username, key and channels to join
** Channels names are the same as twitch except lowercase and prefixed with a #
** Channel Some_Thing becomes #some_thing
* nodejs app.js to run
