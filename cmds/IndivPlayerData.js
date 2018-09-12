const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Data = require("./Data.js");



function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function numberNotate(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

	module.exports.run = async(bot, message, args) => {
		let pData = Data.playerData;
		playerData = pData.playerData;
		let aData = Data.allianceData;
		allianceData = aData.allianceData;
		let pfData = Data.playerFightData;
		playerFightData = pfData.playerFightData;
		let paData = Data.playerAttData;
		playerAttData = paData.playerAttData;
		let pdData = Data.playerDefData;
		playerDefData = pdData.playerDefData;
		let cData = Data.conquestData;
		conquestData = cData.conquestData;

		var test;
		test =  message.content;
		function getSecondPart(str) {
    return str.split(' ')[1];
	}
		test = getSecondPart(test);
		test = test.replace("?", "%3F");

		// defining arrays used for sifting through data

		playerDetails = [];
		playerFight = [];
		playerFightRank = [];
		playerDef = [];
		playerDefRank = [];
		playerAtt = [];
		playerAttRank = [];
		playerAlly = [];
		var playerID = 0;
		//code for testing whether the message correlates with a players name in the server (needs to be hard-coded as of now)

		for (var j = 0; j < playerData.length; j++) {
			if(test === playerData[j][1]){
				playerDetails = playerData[j];
				playerID = playerData[j][0];
			}
			continue;
		}
		// for getting the players def stats, overall, rank

			for (var j = 0; j < playerDefData.length; j++) {
				if(playerID === playerDefData[j][1]){
					playerDef.push(playerDefData[j][2]);
					playerDefRank.push(playerDefData[j][0]);
					break;
				}
				continue;
			}

			// for getting the players att stats, overall, rank

			for (var j = 0; j < playerAttData.length; j++) {
				if(playerID === playerAttData[j][1]){
					playerAtt.push(playerAttData[j][2]);
					playerAttRank.push(playerAttData[j][0]);
					break;
				}
				continue;
			}

			// getting the players 'fighting' stats - overall bp + overall bp rank

			for (var j = 0; j < playerFightData.length; j++) {
				if(playerID === playerFightData[j][1]){
					playerFight.push(playerFightData[j][2]);
					playerFightRank.push(playerFightData[j][0]);
					break;
				}
				continue;
			}

			// Finding alliance name from player details

			 for (var j = 0; j < allianceData.length; j++) {
				 if(playerDetails[2] === allianceData[j][0]){
					 playerAlly.push(allianceData[j][1]);
					 break;
				 }
				 continue;
			 }
			 // getting and testing conquest data for indiv players
			 freeCities = [];
			 takenCities = [];
			 lostCities = [];
			 handedCities = [];

			 for (var i = 0; i < conquestData.length; i++) {
			 	if (playerID === conquestData[i][2] && playerDetails[2] != conquestData[i][5]) {
			 		takenCities.push("[town]" + conquestData[i][0] + "[/town]" );
			 	}
				if (playerID === conquestData[i][2] && playerDetails[2] === conquestData[i][5]) {
					freeCities.push("[town]" + conquestData[i][0] + "[/town]")
				}
				if (playerID === conquestData[i][3] && playerDetails[2] != conquestData[i][4]){
					lostCities.push("[town]" + conquestData[i][0] + "[/town]");
				}
				if (playerID === conquestData[i][3] && playerDetails[2] === conquestData[i][4]){
					handedCities.push("[town]" + conquestData[i][0] + "[/town]")
				}
			 }

			 var colonisations = playerDetails[5] - takenCities.length - freeCities.length + handedCities.length - 1 + lostCities.length;



		if(playerDetails[1] == null){
			message.channel.send("Invalid Player Name (Remember this search is; Case Sensitive, Spaces must be replaced with '+', and ' must be replaced with a %27)");
		}

		if (playerAlly[0] === undefined){
			playerAlly[0] = "No Alliance";
		}

		var playerAlliance;
		var playerName;

		playerAlliance = playerAlly[0].replace(/[+]/g, " ");
  	playerAlliance = playerAlliance.replace(/%27/g, "'");
		playerName = playerDetails[1].replace(/[+]/g, " ");
		playerName = playerName.replace(/%27/g, "'");

		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

		message.channel.send({embed: {
	 			color: finalA,
			title: playerName + " from " +  playerAlliance,
	     fields: [{
	         name: "Points",
					 value: "Rank: " + playerDetails[4] + "  -  Points: " + numberNotate(playerDetails[3])
	       },	{
	 					name: "Battle Points",
						value: "Total BP Rank: " + playerFightRank + "  -  Points: " + numberNotate(playerFight) + "bp\nABP Rank: " + playerAttRank + "  -  Points: " + numberNotate(playerAtt) + "bp\nDBP Rank: " + playerDefRank + "  -  Points: " + numberNotate(playerDef) + "bp",
	  			 	}, {
	 			        name: "Cities",
								value: playerDetails[5],
								"inline": true
	 			    },{
		 			        name: "Colonisations",
									value: colonisations,

		 			    },{
							name: "Conquests",
							value: "Taken Cities: " + takenCities.length + "\n" + takenCities[takenCities.length-1] + "\n" + "Lost Cities: " + lostCities.length + "\n" + lostCities[lostCities.length-1],
								"inline": true

							},{
	 								name: "Handovers",
									value: "Internals: " + freeCities.length + "\n" + freeCities[freeCities.length-1] + "\n" + "Cities handed over: " + handedCities.length + "\n" + handedCities[handedCities.length-1],
									"inline": true
	 							},
						],
	   } });

}

module.exports.help = {
  name: "PlayerData"
}
