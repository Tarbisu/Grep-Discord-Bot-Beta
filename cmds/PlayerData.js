const Discord = require("discord.js");
const snekfetch = require("snekfetch");
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
		let pfData = Data.playerFightData;
		playerFightData = pfData.playerFightData;
		let paData = Data.playerAttData;
		playerAttData = paData.playerAttData;
		let pdData = Data.playerDefData;
		playerDefData = pdData.playerDefData;


	 								playerData.sort(function(a,b) {
	 									return a[0]-b[0]
	 							});
	 							playerData.sort(function(a,b) {
	 								return a[4]-b[4]
	 						});

	            T12ID = [];
							T12AllyID = [];
	            T12FightRank = [];
	            T12Fight = [];
	            T12DefRank = [];
	            T12Def = [];
	            T12AttRank = [];
	            T12Att = [];
							T12Ally = [];


	            for (var l = 1; l < 13; l ++){
	               T12ID.push(playerData[l][0]);
								 T12AllyID.push(playerData[l][2]);
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < playerFightData.length; j++) {
	                if(T12ID[i] === playerFightData[j][1]){
	                  T12FightRank.push(playerFightData[j][0]);
	                  T12Fight.push(playerFightData[j][2]);
										break;
	                }
	                continue;
	              }

	            }
	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < playerDefData.length; j++) {
	                if(T12ID[i] === playerDefData[j][1]){
	                  T12DefRank.push(playerDefData[j][0]);
	                  T12Def.push(playerDefData[j][2]);
										break;
	                }
	                continue;
	              }
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < playerAttData.length; j++) {
	                if(T12ID[i] === playerAttData[j][1]){
	                  T12AttRank.push(playerAttData[j][0]);
	                  T12Att.push(playerAttData[j][2]);
										break;
	                }

	                continue;
	              }
	            }

							for (var i = 0; i < 13; i++) {
							 for (var j = 0; j < allianceData.length; j++) {
								 if(T12AllyID[i] === allianceData[j][0]){
									 T12Ally.push(allianceData[j][1]);
								 }
								 continue;
							 }

						 }


	 	for (var k = 1; k < 13; k++) {
			playerData[k][1] = playerData[k][1].replace(/[+]/g, " ");
			playerData[k][1] = playerData[k][1].replace(/%27/g, "'");
			T12Ally[k-1] = T12Ally[k-1].replace(/[+]/g, " ");
			T12Ally[k-1] = T12Ally[k-1].replace(/%27/g, "'");

			var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;


	 	message.channel.send({embed: {
	 			color: finalA,
			title: "Top Twelve Players!",
	     description: "Nm: " + k + "\n" + playerData[k][1],
	     fields: [{
	         name: "Points", value: "Rank: " + playerData[k][5] + "\nPoints: " + playerData[k][3]
	       },
						{
	  					name: "Battle Points", value: "Fighting: " + T12FightRank[k - 1] + "  -  " + T12Fight[k - 1] + "bp\n" + "Attacking: " + T12AttRank[k - 1] + "  -  " + T12Att[k - 1] + "bp\n"  +   "Defending: " + T12DefRank[k - 1] + "  -  " + T12Def[k - 1] + "bp"

	  				}, {
	 			        name: "Cities", value: playerData[k][5]
	 			    },
						{
							 name: "Alliance", value: T12Ally[k-1]
					 },],
	   } });

	 }
	}

module.exports.help = {
  name: "T12PlayerData"
}
