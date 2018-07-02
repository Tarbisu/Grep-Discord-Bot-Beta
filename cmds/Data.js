const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const followData = require("./Follow.js");

function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function difference(a,b ){
	a = parseInt(a);
	b = parseInt(b);
	var c = a - b;
	if (c < 0){
		return c;
	}
	if (c > 0){
		return "+" + c;
	}
	if (c === 0){
		return "Equivalent: " + b;
	}
}

			var counter = 0;
	module.exports.run = async(bot, message, args) => {
		counter++;
		let test = message.content.split(" ");

		if (test.length < 2){
			console.log(test.length);
			message.channel.send("Please Submit a World ID, keep in mind, you have to wait 7 days after a server opens for the Data to be fully loaded! \n(E.i. en107)!");
		}
		else{
				if (!message.guild.channels.exists("name", "bot-updates")) {
						makeChannel(message);
					}

					const worldID = test[1];

				const alliance = `https://${worldID}.grepolis.com/data/alliances.txt`;
				const allianceFight = `https://${worldID}.grepolis.com/data/alliance_kills_all.txt`;
				const allianceDef = `https://${worldID}.grepolis.com/data/alliance_kills_def.txt`;
				const allianceAtt = `https://${worldID}.grepolis.com/data/alliance_kills_att.txt`;
				const players = `https://${worldID}.grepolis.com/data/players.txt`;
				const playersFight = `https://${worldID}.grepolis.com/data/player_kills_all.txt`;
				const playersDef = `https://${worldID}.grepolis.com/data/player_kills_def.txt`;
				const playersAtt = `https://${worldID}.grepolis.com/data/player_kills_att.txt`;
				const conquest = `https://${worldID}.grepolis.com/data/conquers.txt`;
				const island = `https://${worldID}.grepolis.com/data/islands.txt`;
				const town = `https://${worldID}.grepolis.com/data/towns.txt`;

	let msg = await message.guild.channels.find("name", "bot-updates").send("Loading...");
	let playerFightData = csvToArray((await snekfetch.get(playersFight)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 1/11");
	let playerDefData = csvToArray((await snekfetch.get(playersDef)).text)
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 2/11");
	let playerAttData = csvToArray((await snekfetch.get(playersAtt)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 3/11");
	let conquestData = csvToArray((await snekfetch.get(conquest)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 4/11");
	let islandData = csvToArray((await snekfetch.get(island)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 5/11");
	let playerData = csvToArray((await snekfetch.get(players)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 6/11");
	let allianceAttData = csvToArray((await snekfetch.get(allianceAtt)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 7/11");
	let allianceDefData = csvToArray((await snekfetch.get(allianceDef)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 8/11");
	let allianceFightData = csvToArray((await snekfetch.get(allianceFight)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 9/11");
	let townData = csvToArray((await snekfetch.get(town)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 10/11");
	let allianceData = csvToArray((await snekfetch.get(alliance)).text);
	msg.delete();
	 msg = await message.guild.channels.find("name", "bot-updates").send("Loading... 11/11");

	module.exports.townData = {townData}
	module.exports.islandData = {islandData}
	module.exports.conquestData = {conquestData}
	module.exports.playerData = {playerData}
	module.exports.playerFightData = {playerFightData}
	module.exports.playerAttData = {playerAttData}
	module.exports.playerDefData = {playerDefData}
	module.exports.allianceData = {allianceData}
	module.exports.allianceFightData = {allianceFightData}
	module.exports.allianceDefData = {allianceDefData}
	module.exports.allianceAttData = {allianceAttData}

	// pData();
	// gData(townData, islandData, conquestData, playerData, playerFightData, playerDefData, playerAttData, allianceData, allianceDefData, allianceAttData);

	msg.delete();
	message.guild.channels.find("name", "bot-updates").send("Re-Loaded Data!");
	}
}

module.exports.help = {
  name: "Reload"
}
