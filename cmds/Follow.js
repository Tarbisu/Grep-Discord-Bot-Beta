const Discord = require("discord.js");
const snekfetch = require("snekfetch");



module.exports.run = async(bot, message, args) => {
  var followedAlliances = [];
  var followedPlayers = [];

  var followACount = 0 + followedAlliances.length;
  var followPCount = 0 + followedPlayers.length;

  var test =  message.content;
  test = test.split(' ');

	if (test.length < 3) {
		message.channel.send("Specify the type {Alliance / Player}, and the name of the type chosen!");
	}

	if (test[1] === "Alliance" || "alliance") {
    followACount++;
    var following = false;
    for (var i = 0; i < followACount.length; i++) {
      if (followedAlliances[i] === test[2]){
        message.channel.send('Already Following ' + test[2]);
        following = true;
      }
    }
        if (following = false) {
      followedAlliances.push(test[2]);
      message.channel.send('Following the alliance: ' + test[2] + "!");
    }
	}


	else if (test[1] === "Player" || "player") {
    followPCount++;
    following = false;
    for (var i = 0; i < followPCount.length; i++) {
      if (followPlayers[i] === test[2]) {
        message.channel.send('Already Following' + test[2]);
        following = true;
      }
    }
    if (following = false) {
      followedPlayers.push(test[2]);
      message.channel.send('Following the player: ' + test[2] + "!");
    }
	}
	else {
		message.channel.send("Please enter a valid type!");
	}

	module.exports.followedAlliances = {followedAlliances}
  console.log(followedAlliances);
	module.exports.followedPlayers = {followedPlayers}
}

module.exports.help = {
  name: "Follow"
}
