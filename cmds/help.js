const Discord = require("discord.js");
const talkedRecently = new Set();


module.exports.run = async(bot, message, args) => {

  if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
    } else {

      var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;
      message.channel.send({embed: {
          color: finalA,
        title: "Commands",
         fields: [{
           name: "Syntax", value: "Case Sensitive, Spaces must be replaced with '+', and ' must be replaced with a %27" + "\nFor Example, My Name's, turns into My+Name%27s"
         },
         {
             name: "Without Input", value: "!T12PlayerData\n!T12AllianceData\n!Conquests"
           },
           {
               name: "With Input", value: "!PlayerData {name of player}\n!AllianceData {name of alliance} \n!GhostFinder {city ID} \n!MoraleCalc {attackerName} {defenderName}\n!TownInfo {id}\n!MoraleCalcA {attackingAllianceName} {defenderName}\n!IslandInfo {id}\n!CompareA {alliance alliance2 alliance3... etc} vs {alliance alliance2 alliance3...}\n!CompareP {player player2 player3... etc} vs {player player2 player3...}\n!Conquests {Player/Alliance} {Name} {id}"
             },
             {
                 name: "To Be Done", value: "!Follow {alliance/player, name} {name}\n!RemoveFollow {alliance/player} {name}\n!Territories\n!Territory {Ocean}\nAutofilling Inputs"
               },{
                 name: "Utility", value: "!Math, operational signs are, +, -, *, /, %, ^, =?\n!Setup {worldID}"
               }
              ],
       } });
     }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 60000);
    }

module.exports.help = {
  name: "Help"
}
