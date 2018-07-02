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
	let tData = Data.townData;
	townData = tData.townData;
	let pData = Data.playerData;
	playerData = pData.playerData;
	let aData = Data.allianceData;
	allianceData = aData.allianceData;

  var test =  message.content;
  function getSecondPart(str) {
  return str.split(' ')[1];
  }
  test = getSecondPart(test);

  test = test.split('[town]')[1];
  test = test.split('[/town]')[0];

  var TownInfo = [];

  for (var i = 0; i < townData.length; i++) {
    if (test === townData[i][0]){
      TownInfo.push(townData[i]);
      break;
    }
  }

  for (var i = 0; i < playerData.length; i++) {
    if (TownInfo[0][1] === playerData[i][0]){
      TownInfo.push(playerData[i]);
      break;
    }
  }


  for (var i = 0; i < allianceData.length; i++) {
    if (TownInfo[1][2] === allianceData[i][0]){
      TownInfo.push(allianceData[i]);
      break;
    }
  }

	if (TownInfo[1] == ''){
		TownInfo[1] = ["Ghost City", "Ghost City"];
	}
	if (TownInfo[2] == null || TownInfo[2] == ''){
		TownInfo[2] = ["No Alliance", "No Alliance"];
	}

  TownInfo[1][1] = TownInfo[1][1].replace(/[+]/g, " ");
  TownInfo[1][1] = TownInfo[1][1].replace(/%27/g, "'");
  TownInfo[2][1] = TownInfo[2][1].replace(/[+]/g, " ");
  TownInfo[2][1] = TownInfo[2][1].replace(/%27/g, "'");
  TownInfo[0][2] = TownInfo[0][2].replace(/[+]/g, " ");
  TownInfo[0][2] = TownInfo[0][2].replace(/%27/g, "'");

	// TownInfo[1][1] == player
	// TownInfo[2][1] == alliance
	if (TownInfo[1][1] === "Ghost City"){
		message.channel.send({embed: {
	      color: 3447003,
	    title: TownInfo[0][2],
	    description: "\n[town]" + TownInfo[0][0] + "[/town]",
	     fields: [{
	       name: "Points", value: "" + TownInfo[0][6]
	     }, {
	         name: "Player", value: "Ghost Town"
	       }, ],
	   } });
	}
	else if (TownInfo[2][1] === "No Alliance"){
		var finalA = Math.floor(Math.random() * (100000 - 1)) + 1;

		message.channel.send({embed: {
	      color: finalA,
	    title: TownInfo[0][2],
	    description: "\n[town]" + TownInfo[0][0] + "[/town]",
	     fields: [{
	       name: "Points", value: "" + TownInfo[0][6]
	     }, {
	         name: "Player", value: "" + TownInfo[1][1]
	       },{
	         name: "BBCode", value: "[player]" + TownInfo[1][1] + "[/player]"
	       },  ],
	   } });
	}
	else{
		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

  message.channel.send({embed: {
      color: finalA,
    title: TownInfo[0][2],
    description: "\n[town]" + TownInfo[0][0] + "[/town]",
     fields: [{
       name: "Points", value: "" + TownInfo[0][6]
     }, {
         name: "Player and Alliance", value: "" + TownInfo[1][1] + " from the alliance " + TownInfo[2][1]
       },{
         name: "BBCodes", value: "[player]" + TownInfo[1][1] + "[/player]  -  [ally]" + TownInfo[2][1] + "[/ally]"
       },  ],
   } });
 }
}



module.exports.help = {
  name: "TownInfo"
}
