const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const alliances = "https://en106.grepolis.com/data/alliances.txt";
const town = "https://en106.grepolis.com/data/towns.txt";
const players = "https://en106.grepolis.com/data/players.txt";
const fs = require("fs");



function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

snekfetch.get(alliances).then(r => { let allianceData = csvToArray(r.text);
snekfetch.get(town).then(r => { let townData = csvToArray(r.text);
snekfetch.get(players).then(r => { let playerData = csvToArray(r.text);


module.exports.run = async(bot, message, args) => {
  var fileContents = fs.readFileSync('cmds/oceanCoords.txt');
	var lines = fileContents.toString();
  lines = lines.replace(/[\r]/g, '');
	lines = csvToArray(lines);
  console.log(lines);
  //town[i][3,4] island x , y
  for (var i = 0; i < townData.length; i++) {
    for (var j = 0; j < lines.length; j++) {
      if (townData[i][3] < lines[j][3] && townData[i][3] > lines[j][1] && townData[i][4] < lines[j][4] && townData[i][2] > lines[j][2]) {
          townData[i].push(lines[j][0]);
          break;
      }
  }
  console.log(i);

}

for (var i = 0; i < townData.length; i++) {
  for (var j = 0; j < playerData.length; j++) {
    if (townData[i][1] === playerData[j][0]){
      townData[i].push(playerData[j][2]);
      break;
    }
  }
}

var count = 0;
for (var i = 0; i < townData.length; i++) {
  if (townData[i][8] === "36"){
    count++;
  }
}

console.log(count);

var ocean45 = [];
var ocean55 = [];
var ocean44 = [];
var ocean54 = [];
for (var i = 0; i < townData.length; i++) {
  if (townData[i][7] === "45"){
    ocean45.push(townData[i]);
    continue;
  }
  if (townData[i][7] === "44"){
    ocean44.push(townData[i])
    continue;
  }
  if (townData[i][7] === "54"){
    ocean54.push(townData[i]);
    continue;
  }
  if (townData[i][7] === "55"){
    ocean55.push(townData[i]);
    continue;
  }
  else {
    continue;
  }
}


}

});});});

module.exports.help = {
  name: "Territories"
}
