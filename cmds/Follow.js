const Discord = require("discord.js");
const snekfetch = require("snekfetch");


var followedAlliances = [];
var followedPlayers = [];

module.exports.run = async(bot, message, args) => {


  var followACount = 0 + followedAlliances.length;
  var followPCount = 0 + followedPlayers.length;

  var test = message.content;
  test = test.split(' ');

	if (test.length < 3) {
		message.channel.send("Specify the type {Alliance / Player}, and the name of the type chosen!");
	}

	if (test[1] == "Alliance" || test[1] == "alliance") {
    followACount++;
    var following = false;
    for (var i = 0; i < followACount; i++) {
      if (followedAlliances[i] == test[2]){
        message.channel.send('Already Following ' + test[2]);
        following = true;
      }
    }
        if (following == false) {
      followedAlliances.push(test[2]);
      message.channel.send('Now following the alliance: ' + test[2] + "!");
    }
	}
    if (test[1] == "Player" || test[1] == "player") {
    followPCount++;
    following = false;
    for (var i = 0; i < followPCount; i++) {
      if (followedPlayers[i] === test[2]) {
        message.channel.send('Already Following' + test[2]);
        following = true;
      }
    }
    if (following == false) {
      followedPlayers.push(test[2]);
      message.channel.send('Now following the player: ' + test[2] + "!");
    }
	}


	module.exports.followedAlliances = {followedAlliances}
	module.exports.followedPlayers = {followedPlayers}

}

module.exports.help = {
  name: "Follow"
}
