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
		let aData = Data.allianceData;
		allianceData = aData.allianceData;
		let afData = Data.allianceFightData;
		allianceFightData = afData.allianceFightData;
		let aaData = Data.allianceAttData;
		allianceAttData = aaData.allianceAttData;
		let adData = Data.allianceDefData;
		allianceDefData = adData.allianceDefData;


	 								allianceData.sort(function(a,b) {
	 									return a[0]-b[0]
	 							});
	 							allianceData.sort(function(a,b) {
	 								return a[5]-b[5]
	 						});

	            T12ID = [];
							T12AllyID = [];
	            T12FightRank = [];
	            T12Fight = [];
	            T12DefRank = [];
	            T12Def = [];
	            T12AttRank = [];
	            T12Att = [];
							T12PlayerCount = [];


	            for (var l = 1; l < 13; l ++){
	               T12ID.push(allianceData[l][0]);
								 T12AllyID.push(allianceData[l][2]);
								 T12PlayerCount.push(allianceData[l][4])
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceFightData.length; j++) {
	                if(T12ID[i] === allianceFightData[j][1]){
	                  T12FightRank.push(allianceFightData[j][0]);
	                  T12Fight.push(allianceFightData[j][2]);
										break;
	                }
	                continue;
	              }

	            }
	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceDefData.length; j++) {
	                if(T12ID[i] === allianceDefData[j][1]){
	                  T12DefRank.push(allianceDefData[j][0]);
	                  T12Def.push(allianceDefData[j][2]);
										break;
	                }
	                continue;
	              }
	            }

	            for (var i = 0; i < 12; i++) {
	              for (var j = 0; j < allianceAttData.length; j++) {
	                if(T12ID[i] === allianceAttData[j][1]){
	                  T12AttRank.push(allianceAttData[j][0]);
	                  T12Att.push(allianceAttData[j][2]);
										break;
	                }

	                continue;
	              }
	            }

	 	for (var k = 1; k < 13; k++) {
			allianceData[k][1] = allianceData[k][1].replace(/[+]/g, " ");
			allianceData[k][1] = allianceData[k][1].replace(/%27/g, "'");

			var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;


	 	message.channel.send({embed: {
	 			color: finalA,
			title: "Top Twelve Alliances!",
	     description: "\nNm: " + k + "\n" + allianceData[k][1],
	     fields: [{
	         name: "Points",
					 value: "Rank: " + allianceData[k][5] + "\nPoints: " + numberNotate(allianceData[k][2])
	       },
						{
	  					name: "Battle Points",
							value: "Fighting: " + T12FightRank[k - 1] + "  -  " + numberNotate(T12Fight[k - 1]) + "bp\n" + "Attacking: " + T12AttRank[k - 1] + "  -  " + numberNotate(T12Att[k - 1]) + "bp\n"  +   "Defending: " + T12DefRank[k - 1] + "  -  " + numberNotate(T12Def[k - 1]) + "bp"

	  				}, {
	 			        name: "Cities",
								value: allianceData[k][3],
								"inline": true
	 			    },{
							name: "Members",
							value: T12PlayerCount[k-1],
							"inline": true
						},],
	   } });

	 }
	}

module.exports.help = {
  name: "T12AllianceData"
}
