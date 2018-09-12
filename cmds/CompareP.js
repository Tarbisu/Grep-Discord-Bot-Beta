const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Data = require("./Data.js");


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function add(a, b) {
	a = parseInt(a);
	b = parseInt(b);
	return a + b;
}

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
		return "Equivalent";
	}

}

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
		let aData = Data.playerData;
		allianceData = aData.playerData;
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
		test = test.split(" ");

		var first = [];
		var second = [];

		for (var i = 0; i < test.length; i++) {
			if (test[i] === "vs"){
				first.push([1, i - 1]);
				second.push([i + 1, test.length]);
				break;
			}
		}
		// defining arrays used for sifting through data

		firstplayerDetails = [];
		firstplayerPoints = [];
		firstplayerFight = [];
		firstplayerDef = [];
		firstplayerAtt = [];
		firstplayerID = [];
		firstplayerCities = [];
		firstplayerNames = [];
		takenCities = [];
		lostCities = [];

		console.log(first[0][1]);
	for (var i = 1; i < (first[0][1] + 1); i++) {
		test[i] = test[i].replace("?", "%3F");

		for (var j = 0; j < playerData.length; j++) {
			if(test[i] === playerData[j][1]){
				firstplayerDetails.push(playerData[j]);
				firstplayerID.push(playerData[j][0]);
				firstplayerPoints.push(playerData[j][3]);
				firstplayerCities.push(playerData[j][5]);
				firstplayerNames.push(playerData[j][1]);
				break;
			}
			continue;
		}

			for (var j = 0; j < playerDefData.length; j++) {
				if(firstplayerID[i-1] === playerDefData[j][1]){
					firstplayerDef.push(playerDefData[j][2]);
					break;
				}
				continue;
			}
			for (var j = 0; j < playerAttData.length; j++) {
				if(firstplayerID[i-1] === playerAttData[j][1]){
					firstplayerAtt.push(playerAttData[j][2]);
					break;
				}
				continue;
			}

			for (var j = 0; j < playerFightData.length; j++) {
				if(firstplayerID[i-1] === playerFightData[j][1]){
					firstplayerFight.push(playerFightData[j][2]);
					break;
				}
				continue;
			}
			 for (var j = 0; j < conquestData.length; j++) {
			 	if (firstplayerID[i-1] === conquestData[j][2] && firstplayerDetails[i-1][2] != conquestData[j][5]) {
			 		takenCities.push("[town]" + conquestData[j][0] + "[/town]");
			 	}
				if (firstplayerID[i-1] === conquestData[j][3] && firstplayerDetails[i-1][2] != conquestData[j][4]){
					lostCities.push("[town]" + conquestData[j][0] + "[/town]");
				}
			 }
		}



		secondplayerDetails = [];
		secondplayerPoints = [];
		secondplayerFight = [];
		secondplayerDef = [];
		secondplayerAtt = [];
		secondplayerID = [];
		secondplayerCities = [];
		secondplayerNames = [];
		secondtakenCities = [];
		secondlostCities = [];


var counter = parseInt(second[0][0]);

	for (var i = counter; i < counter + (second[0][1] - counter); i++) {
		test[i] = test[i].replace("?", "%3F");
		for (var j = 0; j < playerData.length; j++) {
			if(test[i] === playerData[j][1]){
				secondplayerDetails.push(playerData[j]);
				secondplayerID.push(playerData[j][0]);
				secondplayerPoints.push(playerData[j][3]);
				secondplayerCities.push(playerData[j][5]);
				secondplayerNames.push(playerData[j][1]);
			}
			continue;
		}

			for (var j = 0; j < playerDefData.length; j++) {
				if(secondplayerID[i-counter] === playerDefData[j][1]){
					secondplayerDef.push(playerDefData[j][2]);
					break;
				}
				continue;
			}
			for (var j = 0; j < playerAttData.length; j++) {
				if(secondplayerID[i-counter] === playerAttData[j][1]){
					secondplayerAtt.push(playerAttData[j][2]);
					break;
				}
				continue;
			}

			for (var j = 0; j < playerFightData.length; j++) {
				if(secondplayerID[i-counter] === playerFightData[j][1]){
					secondplayerFight.push(playerFightData[j][2]);
					break;
				}
				continue;
			}

			 for (var j = 0; j < conquestData.length; j++) {
			 	if (secondplayerID[i-counter] === conquestData[j][2] && secondplayerDetails[i-counter][2] != conquestData[j][5]) {
			 		secondtakenCities.push("[town]" + conquestData[j][0] + "[/town]");
			 	}
				if (secondplayerID[i-counter] === conquestData[j][3] && secondplayerDetails[i-counter][2] != conquestData[j][4]){
					secondlostCities.push("[town]" + conquestData[j][0] + "[/town]");
				}
			 }
		}

		var firstPoints = firstplayerPoints.reduce(add, 0);
		var firstAtt = firstplayerAtt.reduce(add, 0);
		var firstDef = firstplayerDef.reduce(add, 0);
		var firstFight = firstplayerFight.reduce(add, 0);
		var firstCities = firstplayerCities.reduce(add, 0);
		var secondPoints = secondplayerPoints.reduce(add, 0);
		var secondAtt = secondplayerAtt.reduce(add, 0);
		var secondDef = secondplayerDef.reduce(add, 0);
		var secondFight = secondplayerFight.reduce(add, 0);
		var secondCities = secondplayerCities.reduce(add, 0);

		var firstTakenCities = takenCities.length;
		var firstLostCities = lostCities.length;
		var secondTakenCities = secondtakenCities.length;
		var secondLostCities = secondlostCities.length;


		var finalA = Math.floor(Math.random() * (100000 - 1)) + 1;


		message.channel.send({embed: {
	 			color: finalA,
			title: "Comparison between",
			description: firstplayerNames + " vs " + secondplayerNames,
	     fields: [{
				 name: "Points",
				 value: numberNotate(firstPoints),
				 "inline": true
			 },{
				 name: "Points",
				 value: numberNotate(secondPoints),
				 "inline": true
			 },{
				 name: "Difference",
				 value: numberNotate(difference(firstPoints, secondPoints)),
				 "inline": true
			 },{
				 name: "Fighting Points",
				 value: "Fighting: " + numberNotate(firstFight) + "bp\nAttacking: " + numberNotate(firstAtt) + "bp\nDefending: " + numberNotate(firstDef) + "bp",
				 "inline": true
			 },{
				 name: "Fighting Points",
				 value: "Fighting: " + numberNotate(secondFight) + "bp\nAttacking: " + numberNotate(secondAtt) + "bp\nDefending: " + numberNotate(secondDef) + "bp",
				 "inline": true
			 },{
				 name: "Difference",
				 value: numberNotate(difference(firstFight, secondFight)) + "bp\n" + numberNotate(difference(firstAtt, secondAtt)) + "bp\n" + numberNotate(difference(firstDef, secondDef)) + "bp",
				 "inline": true
			 },{
				 name: "Cities",
				 value: numberNotate(firstCities),
				 "inline": true
			 },{
				 name: "Cities",
				 value: numberNotate(secondCities),
				 "inline": true
			 },{
				 name: "Difference",
				 value: difference(firstCities,secondCities),
				 "inline": true
			 },{
				 name: "Conquests",
				 value: "Taken Cities: " + firstTakenCities + "\nLost Cities: " + firstLostCities,
				 "inline": true
			 },{
				 name: "Conquests",
				 value: "Taken Cities: " + secondTakenCities + "\nLost Cities: " + secondLostCities,
				 "inline": true
			 },{
				 name: "Difference",
				 value: difference(firstTakenCities,secondTakenCities) + "\n" + difference(firstLostCities, secondLostCities),
				 "inline": true
			 }
						],
	   } });


}


module.exports.help = {
  name: "CompareP"
}
