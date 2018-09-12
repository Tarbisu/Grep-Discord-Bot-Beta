const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const players = "https://en106.grepolis.com/data/players.txt";
const alliances = "https://en106.grepolis.com/data/alliances.txt";
const Data = require("./Data.js");


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};


function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

module.exports.run = async(bot, message, args) => {
	let pData = Data.playerData;
	playerData = pData.playerData;
	let aData = Data.allianceData;
	allianceData = aData.allianceData;

	var alliance = [];
  var test =  message.content;
  test = test.split(' ');
  if(test.length < 3){
    message.channel.send("Please Give a Player and an Alliance!");
  }
  else {
		for (var i = 0; i < allianceData.length; i++) {
			if(test[1] === allianceData[i][1]){
				alliance.push(allianceData[i]);
			}
		}
		var players = [];

		for (var i = 0; i < playerData.length; i++) {
			if (playerData[i][2] === alliance[0][0]){
				players.push(playerData[i]);
			}
		}

	var target = [];
    for (var j = 0; j < playerData.length; j++) {
      if (test[2] === playerData[j][1])
      {
        target.push(playerData[j]);
      }
      else {
        continue;
      }
    }



  var minMorale;
  var maxMorale = 100;
    function calculateMorale(attacker,defender) {
      switch (defender[5]) {
        case 0:
        return null;
          break;
          case "1":
          minMorale = 30;
            break;
            case "2":
            minMorale = 45;
              break;
              case "3":
              minMorale = 40;
                break;
                case "4":
                minMorale = 45;
                  break;
                  case "5":
                  minMorale = 50;
                    break;
                    case "6":
                    minMorale = 55;
                      break;
                      case "7":
                      minMorale = 60;
                        break;
                        case "8":
                        minMorale = 65;
                          break;
                          case "9":
                          minMorale = 70;
                            break;
                            case "10":
                            minMorale = 75;
                              break;

        default:
        minMorale = 80;
        break;
      }
      var morale = defender[3]/attacker[3];
      morale = (morale*3+0.3) * 100;
			// [(Points Defender/Points Attacker)*3+0.3]*100
      if (morale > 100){
        morale = 100;
      }
      if (morale < minMorale){
        morale = minMorale;
      }
      return morale;
  }
	var Morales = [];
	for (var i = 0; i < players.length; i++) {
		Morales.push(Math.round(calculateMorale(players[i], target[0])));
	}
	var moralePlayers = [];
	for (var i = 0; i < Morales.length; i++) {
		moralePlayers.push([Morales[i], players[i][1]]);
	}

	moralePlayers.sort(sortFunction);


	for (var i = 0; i < moralePlayers.length; i++) {
		message.channel.send(moralePlayers[i][1] + "  -  " + moralePlayers[i][0] + "%");
	}

}}


module.exports.help = {
  name: "MoraleCalcA"
}
