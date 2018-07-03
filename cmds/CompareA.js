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

		firstallianceDetails = [];
		firstalliancePoints = [];
		firstallianceFight = [];
		firstallianceDef = [];
		firstallianceAtt = [];
		firstallianceID = [];
		firstallianceCities = [];
		firstallianceNames = [];
    firstPlayersList = [];
		takenCities = [];
		lostCities = [];

		console.log(first[0][1]);
	for (var i = 1; i < (first[0][1] + 1); i++) {
    test[i] = test[i].replace("?", "%3F");

		for (var j = 0; j < allianceData.length; j++) {
			if(test[i] === allianceData[j][1]){
				firstallianceDetails.push(allianceData[j]);
				firstallianceID.push(allianceData[j][0]);
				firstalliancePoints.push(allianceData[j][2]);
				firstallianceCities.push(allianceData[j][3]);
				firstallianceNames.push(allianceData[j][1]);
        firstPlayersList.push(allianceData[j][4]);
				break;
			}
			continue;
		}

			for (var j = 0; j < allianceDefData.length; j++) {
				if(firstallianceID[i-1] === allianceDefData[j][1]){
					firstallianceDef.push(allianceDefData[j][2]);
					break;
				}
				continue;
			}
			for (var j = 0; j < allianceAttData.length; j++) {
				if(firstallianceID[i-1] === allianceAttData[j][1]){
					firstallianceAtt.push(allianceAttData[j][2]);
					break;
				}
				continue;
			}

			for (var j = 0; j < allianceFightData.length; j++) {
				if(firstallianceID[i-1] === allianceFightData[j][1]){
					firstallianceFight.push(allianceFightData[j][2]);
					break;
				}
				continue;
			}
			 for (var j = 0; j < conquestData.length; j++) {
			 	if (firstallianceID[i-1] === conquestData[j][4] && firstallianceDetails[i-1][2] != conquestData[j][5]) {
			 		takenCities.push("[town]" + conquestData[j][0] + "[/town]");
			 	}
				if (firstallianceID[i-1] === conquestData[j][5] && firstallianceDetails[i-1][2] != conquestData[j][4]){
					lostCities.push("[town]" + conquestData[j][0] + "[/town]");
				}
			 }
		}



		secondallianceDetails = [];
		secondalliancePoints = [];
		secondallianceFight = [];
		secondallianceDef = [];
		secondallianceAtt = [];
		secondallianceID = [];
		secondallianceCities = [];
		secondallianceNames = [];
		secondtakenCities = [];
		secondlostCities = [];
    secondPlayersList = [];



var counter = parseInt(second[0][0]);

	for (var i = counter; i < counter + (second[0][1] - counter); i++) {
    test[i] = test[i].replace("?", "%3F");
		for (var j = 0; j < allianceData.length; j++) {
			if(test[i] === allianceData[j][1]){
				secondallianceDetails.push(allianceData[j]);
				secondallianceID.push(allianceData[j][0]);
				secondalliancePoints.push(allianceData[j][2]);
				secondallianceCities.push(allianceData[j][3]);
				secondallianceNames.push(allianceData[j][1]);
        secondPlayersList.push(allianceData[j][4]);
			}
			continue;
		}

			for (var j = 0; j < allianceDefData.length; j++) {
				if(secondallianceID[i-counter] === allianceDefData[j][1]){
					secondallianceDef.push(allianceDefData[j][2]);
					break;
				}
				continue;
			}
			for (var j = 0; j < allianceAttData.length; j++) {
				if(secondallianceID[i-counter] === allianceAttData[j][1]){
					secondallianceAtt.push(allianceAttData[j][2]);
					break;
				}
				continue;
			}

			for (var j = 0; j < allianceFightData.length; j++) {
				if(secondallianceID[i-counter] === allianceFightData[j][1]){
					secondallianceFight.push(allianceFightData[j][2]);
					break;
				}
				continue;
			}

			 for (var j = 0; j < conquestData.length; j++) {
			 	if (secondallianceID[i-counter] === conquestData[j][4] && secondallianceDetails[i-counter][2] != conquestData[j][5]) {
			 		secondtakenCities.push("[town]" + conquestData[j][0] + "[/town]");
			 	}
				if (secondallianceID[i-counter] === conquestData[j][5] && secondallianceDetails[i-counter][2] != conquestData[j][4]){
					secondlostCities.push("[town]" + conquestData[j][0] + "[/town]");
				}
			 }
		}

		var firstPoints = firstalliancePoints.reduce(add, 0);
		var firstAtt = firstallianceAtt.reduce(add, 0);
		var firstDef = firstallianceDef.reduce(add, 0);
		var firstFight = firstallianceFight.reduce(add, 0);
		var firstCities = firstallianceCities.reduce(add, 0);
    var firstPlayers;

      for (var i = 0; i < firstPlayersList.length; i++) {
        firstPlayers += firstPlayersList[i];
      }
      firstPlayers = firstPlayers/firstPlayersList.length;
      firstPlayers *= 10;
      firstPlayers = Math.round(firstPlayers);
      firstPlayers = firstPlayers/10;

        var secondPlayers;
        for (var i = 0; i < secondPlayersList.length; i++) {
          secondPlayers += secondPlayersList[i];
        }
        secondPlayers = secondPlayers/secondPlayersList.length;
        secondPlayers *= 10;
        secondPlayers = Math.round(secondPlayers);
        secondPlayers = secondPlayers/10;

		var secondPoints = secondalliancePoints.reduce(add, 0);
		var secondAtt = secondallianceAtt.reduce(add, 0);
		var secondDef = secondallianceDef.reduce(add, 0);
		var secondFight = secondallianceFight.reduce(add, 0);
		var secondCities = secondallianceCities.reduce(add, 0);

		var firstTakenCities = takenCities.length;
		var firstLostCities = lostCities.length;
		var secondTakenCities = secondtakenCities.length;
		var secondLostCities = secondlostCities.length;


		var finalA = Math.floor(Math.random() * (100000 - 1)) + 1;


		message.channel.send({embed: {
	 			color: finalA,
			title: "Comparison between",
			description: firstallianceNames + " vs " + secondallianceNames,
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
                              			 },{
                                      name: "Ratios",
                                      value: "Points to BP: " + (Math.round((firstPoints / firstFight) * 10)/10)
                                      + "\nTaken to Lost Cities: " + (Math.round((firstTakenCities/firstLostCities)*10)/10)
                                      + "\nPoints per City: " + (Math.round((firstPoints/firstCities)*10)/10),
                                      "inline": true
                                         },{
                                          name: "Ratios",
                                          value: "Points to BP: " + (Math.round((secondPoints / secondFight) * 10)/10)
                                          + "\nTaken to Lost Cities: " + (Math.round((secondTakenCities/secondLostCities)*10)/10)
                                          + "\nPoints per City: " + (Math.round((secondPoints/secondCities)*10)/10),
                                          "inline": true
                                          },{
                                              name: "Difference",
                                              value: "" + (difference( ((Math.round((firstPoints / firstFight) * 10)/10)*10) ,((Math.round((secondPoints / secondFight) * 10)/10)*10))/10)
                                              + "\n" + (difference( ((Math.round((firstTakenCities / firstLostCities) * 10)/10)*10) ,((Math.round((secondTakenCities / secondLostCities) * 10)/10)*10))/10)
                                              + "\n" + (difference( ((Math.round((firstPoints / firstCities) * 10)/10)*10) ,((Math.round((secondPoints / secondCities) * 10)/10)*10))/10),
                                              "inline": true
                                               }
  						],
	   } });


}


module.exports.help = {
  name: "CompareA"
}
