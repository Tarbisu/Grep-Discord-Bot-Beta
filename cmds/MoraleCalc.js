const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const players = "https://en106.grepolis.com/data/players.txt";
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

  var test =  message.content;
  test = test.split(' ');
  if(test.length < 3){
    message.channel.send("Please Give Two Players");
  }
  else {


  var players = [];


  for (var i = 1; i < 3; i++) {
    for (var j = 0; j < playerData.length; j++) {
      if (test[i] === playerData[j][1])
      {
        players.push(playerData[j]);
      }
      else {
        continue;
      }
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
    var returned = calculateMorale(players[0], players[1]);
    returned = Math.round(returned);
		var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;

    message.channel.send({embed: {
	 			color: finalA,
	     fields: [{
	         name: "Morale", value: "" + returned + "%"
	       },],
	   } });
  }
}





module.exports.help = {
  name: "MoraleCalc"
}
