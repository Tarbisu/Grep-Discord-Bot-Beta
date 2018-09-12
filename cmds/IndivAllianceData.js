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

function add(a, b) {
	a = parseInt(a);
	b = parseInt(b);
	return a + b;
}

function returnUnique(array){
	var tempArray = {};
	for (var i = 0; i < array.length; i++) {
		var x = array[i];
		tempArray[x] = (x in tempArray) ? tempArray[x] + 1 : 1;
	}
	var i = 0;
	var rArray = [];
	for (x in tempArray){
		rArray[i++] = [x, tempArray[x] ];
	}
	rArray.sort();
	return rArray;
}

	module.exports.run = async(bot, message, args) => {
		let pData = Data.playerData;
		playerData = pData.playerData;
		let aData = Data.allianceData;
		allianceData = aData.allianceData;
		let afData = Data.allianceFightData;
		allianceFightData = afData.allianceFightData;
		let aaData = Data.allianceAttData;
		allianceAttData = aaData.allianceAttData;
		let adData = Data.allianceDefData;
		allianceDefData = adData.allianceDefData;
		let cData = Data.conquestData;
		conquestData = cData.conquestData;
		let tData = Data.townData;
		townData = tData.townData;
		let iData = Data.islandData;
		islandData = iData.islandData;


		var test =  message.content;
		function getSecondPart(str) {
    return str.split(' ')[1];
	}
		test = getSecondPart(test);
		// defining arrays used for sifting through data

		allianceDetails = [];
		allianceFight = [];
		allianceFightRank = [];
		allianceDef = [];
		allianceDefRank = [];
		allianceAtt = [];
		allianceAttRank = [];
		//code for testing whether the message correlates with a alliances name in the server (needs to be hard-coded as of now)

		for (var j = 0; j < allianceData.length; j++) {
			if(test === allianceData[j][1]){
				allianceDetails = allianceData[j];
				var allianceID = allianceData[j][0];
				break;
			}
			continue;
		}

		for (var j = 0; j < allianceDefData.length; j++) {
			if(allianceDetails[0] === allianceDefData[j][1]){
				allianceDef.push(allianceDefData[j][2]);
				allianceDefRank.push(allianceDefData[j][0]);
				break;
			}
			continue;
		}
		for (var j = 0; j < allianceFightData.length; j++) {
			if(allianceDetails[0] === allianceFightData[j][1]){
				allianceFight.push(allianceFightData[j][2]);
				allianceFightRank.push(allianceFightData[j][0]);
				break;
			}
			continue;
		}
		for (var j = 0; j < allianceAttData.length; j++) {
			if(allianceDetails[0] === allianceAttData[j][1]){
				allianceAtt.push(allianceAttData[j][2]);
				allianceAttRank.push(allianceAttData[j][0]);
				break;
			}
			continue;
		}

		allyTakes=[];
		allyInternals=[];
		allyLosses=[];
		allyHandovers=[];

		for (var j = 0; j < conquestData.length; j++) {
			if(allianceDetails[0] === conquestData[j][4] && allianceDetails[0] != conquestData[j][5]){
				allyTakes.push(conquestData[j]);
			}
			if (allianceDetails[0] === conquestData[j][4] && allianceDetails[0] === conquestData[j][5]){
				allyInternals.push(conquestData[j]);
			}
			if(allianceDetails[0] === conquestData[j][5] && allianceDetails[0] != conquestData[j][4]){
				allyLosses.push(conquestData[j]);
			}
			if (allianceDetails[0] === conquestData[j][5] && allianceDetails[0] === conquestData[j][4]){
				allyHandovers.push(conquestData[j]);
			}

			continue;
		}

		allyNameT=[];
		allyNameL=[];

		for (var j = 0; j < allyTakes.length; j++) {
			allyNameT.push(allyTakes[j][5]);
		}
		for (var j = 0; j < allyLosses.length; j++) {
			allyNameL.push(allyLosses[j][4]);
		}

		var Takes = returnUnique(allyNameT);
		var Losses = returnUnique(allyNameL);

		for (var i = 0; i < Takes.length; i++) {
			for (var j = 0; j < allianceData.length; j++) {
				if (Takes[i][0] === allianceData[j][0]) {
					Takes[i][0] = allianceData[j][1];
					break;
				}
			}
		}
		for (var i = 0; i < Losses.length; i++) {
			for (var j = 0; j < allianceData.length; j++) {
				if (Losses[i][0] === allianceData[j][0]) {
					Losses[i][0] = allianceData[j][1];
					break;
				}
			}
		}
		Takes.sort(function(a,b) {
			return a[1]-b[1]
	});
		Losses.sort(function(a,b) {
		return a[1]-b[1]
	});

for (var i = 0; i < Takes.length; i++) {
	if (Takes[i][0] === undefined || Takes[i][0] === null || Takes[i][0] === "undefined"){
		Takes.splice(i,1);
		continue;
	}
	else{
	Takes[i][0] = Takes[i][0].replace(/[+]/g, " ");
	Takes[i][0] = Takes[i][0].replace(/%27/g, "'");
	}
}


for (var i = 0; i < Losses.length; i++) {
	if (Losses[i][0] === undefined || Losses[i][0] === null || Losses[i][0] === "undefined" ){
		Losses.splice(i,1);
		continue;
	}
	else{
	Losses[i][0] = Losses[i][0].replace(/[+]/g, " ");
	Losses[i][0] = Losses[i][0].replace(/%27/g, "'");
	}
}

var conqs = [];

var TakeLength = Takes.length;
var LossLength = Losses.length;
var lossIds = [];

for (var i = 0; i < TakeLength; i++) {
		for (var j = 0; j < LossLength; j++) {
				if (Takes[i][0] === Losses[j][0]){
					conqs.push({total: add(Takes[i][1], Losses[j][1]), name: Takes[i][0], takes: Takes[i][1], losses: Losses[j][1]});
					lossIds.push({takes: i, losses: j});
					break;
				}

			}

	}
for (var i = 0; i < lossIds.length; i++) {
	Takes.splice(lossIds[i].takes, 1);
	Losses.splice(lossIds[i].losses, 1);
}
var repeated;
for (var i = 0; i < Takes.length; i++) {
	repeated = false;
	for (var j = 0; j < conqs.length; j++) {
		if (Takes[i][0] === conqs[j].name) {
			repeated = true;
		}
	}
	if (repeated == false) {
		conqs.push({total: add(Takes[i][1], 0), name: Takes[i][0], takes: Takes[i][1], losses: 0});
	}
}

for (var i = 0; i < Losses.length; i++) {
	repeated = false;
	for (var j = 0; j < conqs.length; j++) {
		if (Losses[i][0] === conqs[j].name) {
			repeated = true;
		}
	}
	if (repeated == false) {
		conqs.push({total: add(Losses[i][1], 0), name: Losses[i][0], takes: 0, losses: Losses[i][1]});
	}
}

for (var i = 0; i < conqs.length; i++) {
	if (conqs[i].total === NaN || conqs[i].name === undefined){
		conqs.splice(i, 1);
	}
}

conqs.sort(function (a, b) {
  return a.total - b.total;
});


		if(allianceDetails[1] == null){
			message.channel.send("Invalid alliance Name (Remember this search is; Case Sensitive, Spaces must be replaced with '+', and ' must be replaced with a %27)");
		}

		var allianceName;
		allianceName = allianceDetails[1].replace(/[+]/g, " ");
 		allianceName = allianceName.replace(/%27/g, "'");

		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

		message.channel.send({embed: {
	 			color: finalA,
			title: allianceName,
	     description: "Details about " + allianceName,
	     fields: [{
	         name: "Ranks",
					 value: "Points: " + allianceDetails[5] + "\nFighter: " + allianceFightRank + "\nAttacker: " + allianceAttRank + "\nDefender: " + allianceDefRank,
					 "inline": true
	       },	{
						name: "Points",
						value: "Points: " + numberNotate(allianceDetails[2]) + "\nBattle Points: " + numberNotate(allianceFight) + " bp\nAttacker Points: " + numberNotate(allianceAtt) + " bp\nDefender Points: " + numberNotate(allianceDef) + " bp",
						"inline": true
					},{
						name: "Stats per Player",
						value: "Points: " + numberNotate(Math.round(allianceDetails[2]/allianceDetails[4])) + "\nBattle Points: " + numberNotate(Math.round(allianceFight/allianceDetails[4])) + "bp\nAttacker Points: " + numberNotate(Math.round(allianceAtt/allianceDetails[4])) + "bp\nDefender Points: " + numberNotate(Math.round(allianceDef/allianceDetails[4])) + "bp",
						"inline": true
					},{
									name: "Conquests",
									value: "Taken Cities: " + allyTakes.length + "\nLost Cities: " + allyLosses.length,
								},{
									name: "Ratios",
									value: "Points to BP: " + numberNotate((Math.round(allianceDetails[2]/allianceFight*10))/10) + "\nTaken Cities per Lost City: " + Math.round(allyTakes.length / allyLosses.length) + "\nAverage Points per City: " + numberNotate(Math.round(allianceDetails[2] / allianceDetails[3])),
								},
								{
		 								name: "Handovers",
										value: "Internals: " + allyInternals.length,
										"inline": true
		 							},{
					 			        name: "Cities",
												value: allianceDetails[3],
												"inline": true

					 			    },{
											name: "Players",
											value: allianceDetails[4],
											"inline": true
												},
												{
											name: "War Against: " + conqs[conqs.length-1].name,
											value: "Taken Cities: " + conqs[conqs.length-1].takes + "  -  Lost Cities: " + conqs[conqs.length-1].losses,
											"inline": true
										},{
											name: "War Against: " + conqs[conqs.length-2].name,
											value: "Taken Cities: " + conqs[conqs.length-2].takes + "  -  Lost Cities: " + conqs[conqs.length-2].losses,
											"inline": true
										},{
											name: "War Against: " + conqs[conqs.length-3].name,
											value: "Taken Cities: " + conqs[conqs.length-3].takes + "  -  Lost Cities: " + conqs[conqs.length-3].losses,
											"inline": true
										},

						],
	   } });




}



module.exports.help = {
  name: "AllianceData"
}
