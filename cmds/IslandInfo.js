const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");
const Data = require("./Data.js");


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

module.exports.run = async(bot, message, args) => {
	let pData = Data.playerData;
	playerData = pData.playerData;
	let aData = Data.allianceData;
	allianceData = aData.allianceData;
	let tData = Data.townData;
	townData = tData.townData;
	let iData = Data.islandData;
	islandData = iData.islandData;

	var fileContents = fs.readFileSync('cmds/oceanCoords.txt');
	var lines = fileContents.toString();
	lines = csvToArray(lines);

  var test =  message.content;
  function getSecondPart(str) {
  return str.split(' ')[1];
  }

  test = getSecondPart(test);

  test = test.split('[island]')[1];
  test = test.split('[/island]')[0];

	var islandInfo = [];

	for (var i = 0; i < islandData.length; i++) {
		if(test === islandData[i][0]){
			islandInfo.push(islandData[i]);
			break;
		}
	}

	// islandInfo[1] <-- X COORD, islandInfo[2] <-- Y COORD
	islandInfo[0][1] = parseInt(islandInfo[0][1]);
	islandInfo[0][2] = parseInt(islandInfo[0][2]);

	for (var i = 0; i < lines.length; i++) {
		if (islandInfo[0][1] < lines[i][3] && islandInfo[0][1] > lines[i][1]) {
			if (islandInfo[0][2] < lines[i][4] && islandInfo[0][2] > lines[i][2]) {
				islandInfo.push(lines[i][0]);
				break;
			}
		}
	}

	var islandCities = [];
	for (var i = 0; i < townData.length; i++) {
		if (islandInfo[0][1] == townData[i][3] && islandInfo[0][2] == townData[i][4]) {
			islandCities.push(townData[i]);
		}
		if (islandInfo[0][1] === ""){
			islandCities.push(["No ID", "No Player", "Null", ])
		}
	}

	var islandPlayers = [];
	for (var j = 0; j < islandCities.length; j++) {
		for (var i = 0; i < playerData.length; i++) {
			if(islandCities[j][1] == playerData[i][0]){
				islandPlayers.push(playerData[i]);
				break;
			}
			if (islandCities[j][1] === "No Player"){
				islandPlayers.push(["No ID", "No Player", "Null"]);
				break;
			}
			if (islandCities[j][1] == '' || islandCities[j][1] == null){
				islandPlayers.push(["No ID", "No Player", "Null"])
				break;
			}

		}
	}

	var islandAlliances = [];
	for (var i = 0; i < islandPlayers.length; i++) {
		for (var j = 0; j <= allianceData.length; j++) {
			if (islandPlayers[i][2] === "" || islandPlayers[i][2] === "Null"){
				islandAlliances.push(["No Alliance", "No Alliance"]);
				break;
			}

			if (islandPlayers[i][2] == allianceData[j][0] ){
				islandAlliances.push(allianceData[j]);
				break;
			}
		}
	}


	// islandAlliances = multiDimensionalUnique(islandAlliances);
	var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

	message.channel.send({embed: {
	    color: finalA,
	  title: "Island Details",
		description: "Ocean: " + islandInfo[1],
		} });

	for (var i = 0; i < islandCities.length; i++) {

		islandPlayers[i][1] = islandPlayers[i][1].replace(/[+]/g, " ");
		islandPlayers[i][1] = islandPlayers[i][1].replace(/%27/g, "'");
		islandAlliances[i][1] = islandAlliances[i][1].replace(/[+]/g, " ");
		islandAlliances[i][1] = islandAlliances[i][1].replace(/%27/g, "'");

		if (islandPlayers[i][1] === "No Player"){
			message.channel.send("[town]" + islandCities[i][0] + "[/town]  " + islandCities[i][6] + " points  -  Ghost Town");
			continue;
		}

		message.channel.send("[town]" + islandCities[i][0] + "[/town]  " + islandCities[i][6] + " points  -  [player]" + islandPlayers[i][1] + "[/player]  -  [ally]" + islandAlliances[i][1] + "[/ally]");
	}
	// IslandInfo
	// islandCities
	// islandPlayers
	// islandAlliances




 }


module.exports.help = {
  name: "IslandInfo"
}
