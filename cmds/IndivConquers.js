const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const Data = require("./Data.js");



function csvToArray (thisData) {
rows = thisData.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i][1] < a[i+1][1]) {
                var temp = a[i][1];
                a[i][1] = a[i+1][1];
                a[i+1][1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
		return a;
}


module.exports.run = async(bot, message, args) => {

	let pData = Data.playerData;
	playerData = pData.playerData;
	let aData = Data.allianceData;
	allianceData = aData.allianceData;
	let cData = Data.conquestData;
	conquestData = cData.conquestData;

	conquestData = conquestData.reverse();
	test = args;

	DataArray = [];
	if (test.length < 3) {
		message.channel.send("Please input a type {Alliance/Player}, a name, and the amount of conquests you want to show");
	}



	if (test[0] === "Alliance" || test[0] === "alliance") {
		for (var i = 0; i < allianceData.length; i++) {
			if (test[1] === allianceData[i][1]) {
				DataArray.push(allianceData[i]);
				break;
			}
		}
		var i = 0;


		conquestArray = [];

		while (conquestArray.length < parseInt(test[2])) {
			if (conquestData[i][4] === DataArray[0][0] && conquestData[i][5] != DataArray[0][0]){
				conquestArray.push({townId: "[town]" + conquestData[i][0] + "[/town]", take: 1, loss: 0,
				takenBy: getPlayerName(conquestData[i][2]), lostBy: getPlayerName(conquestData[i][3]),
				takenByA: getAllianceName(conquestData[i][4]), lostByA: getAllianceName(conquestData[i][5]),
				points: conquestData[i][6]});
				i++
				continue;
			}
			if (conquestData[i][5] === DataArray[0][0] && conquestData[i][4] != DataArray[0][0]){
				conquestArray.push({townId: "[town]" + conquestData[i][0] + "[/town]", take: 0, loss: 1,
				takenBy: getPlayerName(conquestData[i][2]), lostBy: getPlayerName(conquestData[i][3]),
				takenByA: getAllianceName(conquestData[i][4]), lostByA: getAllianceName(conquestData[i][5]),
				points: conquestData[i][6]});
				i++;
				continue;
			}
			if (i > conquestData.length) {
				break;
			}
			i++
		}


		for (var i = 0; i < parseInt(test[2]); i++) {
			var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

			if (conquestArray[i].lostBy == undefined) {
				conquestArray[i].lostBy = "Ghost";
			}
			conquestArray[i].lostBy = conquestArray[i].lostBy.replace(/[+]/g, " ");
			conquestArray[i].lostBy = conquestArray[i].lostBy.replace(/%27/g, "'");
			if (conquestArray[i].lostByA == undefined) {
				conquestArray[i].lostByA = "No Alliance";
			}
			conquestArray[i].lostByA = conquestArray[i].lostByA.replace(/[+]/g, " ");
			conquestArray[i].lostByA = conquestArray[i].lostByA.replace(/%27/g, "'");
			if (conquestArray[i].takenBy == undefined) {
				conquestArray[i].takenBy = "Ghost";
			}
			conquestArray[i].takenBy = conquestArray[i].takenBy.replace(/([+])/g, " ");
			conquestArray[i].takenBy = conquestArray[i].takenBy.replace(/%27/g, "'");
			if (conquestArray[i].takenByA == undefined) {
				conquestArray[i].takenByA = "No Alliance";
			}
			conquestArray[i].takenByA = conquestArray[i].takenByA.replace(/[+]/g, " ");
			conquestArray[i].takenByA = conquestArray[i].takenByA.replace(/%27/g, "'");

			if (conquestArray[i].loss == 0) {
				message.channel.send({embed: {
						title: "Taken City",
						color: finalA,
					 fields: [{
							 name: "Info",
							 value: "" + conquestArray[i].townId + ", with the points: " + conquestArray[i].points,
						 },{
							 name: "Taken by",
							 value: "" + conquestArray[i].takenBy,
						 },{
							 name: "Lost by",
							 value: "" + conquestArray[i].lostBy + " belonging to the alliance: " + conquestArray[i].lostByA
						 },],
				 } });
			} else{
				message.channel.send({embed: {
						title: "Lost City",
						color: finalA,
					 fields: [{
							 name: "Info",
							 value: "" + conquestArray[i].townId + ", with the points: " + conquestArray[i].points,
						 },{
							 name: "Taken by",
							 value: "" + conquestArray[i].takenBy +  " belonging to the alliance: " + conquestArray.takenByA,
						 },{
							 name: "Lost by",
							 value: "" + conquestArray[i].lostBy,
						 },],
				 } });
			}


		}
	}

	else if (test[0] === "Player" || test[0] === "player") {
		for (var i = 0; i < playerData.length; i++) {
			if (test[1] === playerData[i][1]) {
				DataArray.push(playerData[i]);
				break;
			}
		}
		var i = 0;


		conquestArray = [];

		while (conquestArray.length < parseInt(test[2])) {
			if (conquestData[i][2] === DataArray[0][0] && conquestData[i][5] != DataArray[0][2]){
				conquestArray.push({townId: "[town]" + conquestData[i][0] + "[/town]", take: 1, loss: 0,
				takenBy: getPlayerName(conquestData[i][2]), lostBy: getPlayerName(conquestData[i][3]),
				takenByA: getAllianceName(conquestData[i][4]), lostByA: getAllianceName(conquestData[i][5]),
				points: conquestData[i][6]});
				i++
				continue;
			}
			if (conquestData[i][3] === DataArray[0][0] && conquestData[i][4] != DataArray[0][2]){
				conquestArray.push({townId: "[town]" + conquestData[i][0] + "[/town]", take: 0, loss: 1,
				takenBy: getPlayerName(conquestData[i][2]), lostBy: getPlayerName(conquestData[i][3]),
				takenByA: getAllianceName(conquestData[i][4]), lostByA: getAllianceName(conquestData[i][5]),
				points: conquestData[i][6]});
				i++;
				continue;
			}
			if (i > conquestData.length - 2) {
				break;
			}
			i++
		}


		for (var i = 0; i < parseInt(test[2]); i++) {
			var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

			if (conquestArray[i].lostBy == undefined) {
				conquestArray[i].lostBy = "Ghost";
			}
			conquestArray[i].lostBy = conquestArray[i].lostBy.replace(/[+]/g, " ");
			conquestArray[i].lostBy = conquestArray[i].lostBy.replace(/%27/g, "'");
			if (conquestArray[i].lostByA == undefined) {
				conquestArray[i].lostByA = "No Alliance";
			}
			conquestArray[i].lostByA = conquestArray[i].lostByA.replace(/[+]/g, " ");
			conquestArray[i].lostByA = conquestArray[i].lostByA.replace(/%27/g, "'");
			if (conquestArray[i].takenBy == undefined) {
				conquestArray[i].takenBy = "Ghost";
			}
			conquestArray[i].takenBy = conquestArray[i].takenBy.replace(/([+])/g, " ");
			conquestArray[i].takenBy = conquestArray[i].takenBy.replace(/%27/g, "'");
			if (conquestArray[i].takenByA == undefined) {
				conquestArray[i].takenByA = "No Alliance";
			}
			conquestArray[i].takenByA = conquestArray[i].takenByA.replace(/[+]/g, " ");
			conquestArray[i].takenByA = conquestArray[i].takenByA.replace(/%27/g, "'");

			if (conquestArray[i].loss == 0) {
				// message.channel.send({embed: {
				// 		title: "Taken City",
				// 		color: finalA,
				// 	 fields: [{
				// 			 name: "Info",
				// 			 value: "" + conquestArray[i].townId + ", with the points: " + conquestArray[i].points,
				// 		 },{
				// 			 name: "Lost by",
				// 			 value: "" + conquestArray[i].lostBy + " belonging to the alliance: " + conquestArray[i].lostByA
				// 		 },],
				//  } });
				message.channel.send("***+*** " + conquestArray[i].townId + " with the points: " + conquestArray[i].points + ", lost by: " + conquestArray[i].lostBy + " belonging to the alliance: " + conquestArray[i].lostByA);
			} else{
				// message.channel.send({embed: {
				// 		title: "Lost City",
				// 		color: finalA,
				// 	 fields: [{
				// 			 name: "Info",
				// 			 value: "" + conquestArray[i].townId + ", with the points: " + conquestArray[i].points,
				// 		 },{
				// 			 name: "Taken by",
				// 			 value: "" + conquestArray[i].takenBy +  " belonging to the alliance: " + conquestArray.takenByA,
				// 		 },],
				//  } });
				message.channel.send("***-*** " + conquestArray[i].townId + " with the points: " + conquestArray[i].points + ", taken by: " + conquestArray[i].takenBy + " belonging to the alliance: " + conquestArray[i].takenByA);
			}
		}
	}



}

function getPlayerName(id){
	for (var i = 0; i < playerData.length; i++) {
		if (playerData[i][0] === id) {
			return playerData[i][1];
		}
	}
	return "Ghost";
}
function getAllianceName(id){
	for (var i = 0; i < allianceData.length; i++) {
		if (allianceData[i][0] === id) {
			return allianceData[i][1];
		}
	}
	return "No Alliance";
}


module.exports.help = {
  name: "Conquest"
}
