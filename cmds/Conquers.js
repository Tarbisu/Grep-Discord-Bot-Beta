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


	var test1 = conquestData.reverse();

	var thisData = [];
	for (var i = 0; i < 6; i++) {
		thisData.push(test1[i]);
	}

	for (var i = 0; i < thisData.length; i++) {
		for (var j = 0; j < playerData.length; j++) {

			if(thisData[i][2] === playerData[j][0]){
				thisData[i][2] = playerData[j][1];
				continue;
			}
			else if(thisData[i][3] === playerData[j][0]){
				thisData[i][3] = playerData[j][1];
				continue;
			}
		}
	}

	for (var i = 0; i < thisData.length; i++) {
		for (var j = 0; j < allianceData.length; j++) {

			if(thisData[i][4] === allianceData[j][0]){
				thisData[i][4] = allianceData[j][1];
				continue;
			}
			else if(thisData[i][5] === allianceData[j][0]){
				thisData[i][5] = allianceData[j][1];
				continue;
			}
		}
	}

	for (var i = 1; i < thisData.length; i++) {
		if (thisData[i][3] ===undefined){
			thisData[i][3] = "Ghost";
		}
		if (thisData[i][5] ===undefined){
			thisData[i][5] = "None";
		}
		if (thisData[i][4] ===undefined){
			thisData[i][4] = "None";
		}
		thisData[i][3] = thisData[i][3].replace(/[+]/g, " ");
		thisData[i][3] = thisData[i][3].replace(/%27/g, "'");
		thisData[i][4] = thisData[i][4].replace(/[+]/g, " ");
		thisData[i][4] = thisData[i][4].replace(/%27/g, "'");
		thisData[i][5] = thisData[i][5].replace(/([+])/g, " ");
		thisData[i][5] = thisData[i][5].replace(/%27/g, "'");
		thisData[i][2] = thisData[i][2].replace(/[+]/g, " ");
		thisData[i][2] = thisData[i][2].replace(/%27/g, "'");

		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

	message.channel.send({embed: {
			color: finalA,
		 fields: [{
				 name: "Info", value: "[town]" + thisData[i][0] + "[/town], owned by " + thisData[i][3] + " of alliance " + thisData[i][5] + "\nWas taken by " + thisData[i][2] + " of alliance " + thisData[i][4]
			 },{
				 name: "Points", value: "" + thisData[i][6]
			 },],
	 } });
}

}


module.exports.help = {
  name: "Conquests"
}
