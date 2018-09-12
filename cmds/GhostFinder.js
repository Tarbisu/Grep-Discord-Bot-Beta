const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");
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

function calcHypotenuse(a, b) {
  return(Math.sqrt((a * a) + (b * b)));
}


module.exports.run = async(bot, message, args) => {
  let tData = Data.townData;
  townData = tData.townData;
  let iData = Data.islandData;
  islandData = iData.islandData;


  var test =  message.content;
  function getSecondPart(str) {
  str = str.split(' ')[1];
  return str.split('[town]').pop().split('[/town]').shift();
  }

  var fileContents = fs.readFileSync('cmds/islandData.txt');
  var lines = fileContents.toString();

  csvIslandD = csvToArray(lines);
  test = getSecondPart(test);

// FINDING TARGET CITY AND THE ISLAND THAT IS ON
// CONVERT THIS DATA INTO ACCURATE X & Y COORDS FOR THE ISLAND AND TOWN ON THE ISLAND

// FIND ALL GHOST CITIES IN THE WORLD - FIND X & Y COORDS FOR THE ISLAND + TOWN
// TRIANGULATE AND FIND THE DISTANCE (IN PIXELS) BETWEEN THE TARGET AND THE GHOST.
// SORT GHOST CITIES IN ORDER OF PROXIMITY
// PRESENT THE TOP X

var targetTownData = [];

for (var i = 0; i < townData.length; i++) {
  if (test === townData[i][0]){
    targetTownData.push(townData[i]);
    break;
  }
}
var targetIslandData = [];

for (var i = 0; i < islandData.length; i++) {
  if (targetTownData[0][3] === islandData[i][1] && targetTownData[0][4] === islandData[i][2]) {
    targetIslandData.push(islandData[i]);
    break;
  }
}

var targetIslandDetails = [];

for (var i = 0; i < csvIslandD.length; i++) {
  if (targetIslandData[0][3] === csvIslandD[i][0]) {
    if (targetTownData[0][5] === csvIslandD[i][3]){
      targetIslandDetails.push(csvIslandD[i]);
    }
  }
}

  var targetPixelX = targetTownData[0][3] * 128;
  var targetPixelY;
  if (targetTownData[0][3] % 2 == 0){
    targetPixelY = targetTownData[0][4] * 128;
  }
  else {
    targetPixelY = 64 + targetTownData[0][4] * 128;
  }

  targetPixelX += parseInt(targetIslandDetails[0][1]);
  targetPixelY += parseInt(targetIslandDetails[0][2]);
// FOUND THE TARGET PIXELS

var ghostCities = [];
for (var i = 0; i < townData.length; i++) {
  if (townData[i][1] === ""){
    ghostCities.push(townData[i]);
  }
}

var ghostIslandData = [];
var ghostIslandDetails = [];
var ghostPixelX = [];
var ghostPixelY = [];
var dist = [];
var id = [];
var a = -1;
var points = [];

for (var i = 0; i < ghostCities.length; i++) {
  var same = false;
  for (var j = 0; j < islandData.length; j++) {
    if (ghostCities[i][3] === islandData[j][1] && ghostCities[i][4] === islandData[j][2]) {
      if (islandData[j][0] === targetIslandData[0][0]){
        same = true;
        break;
      }
      ghostIslandData.push(islandData[j]);
      a++;
      break;
    }

  }
  if (same) {
    continue;
  }

  for (var j = 0; j < csvIslandD.length; j++) {
    if (ghostIslandData[a][3] === csvIslandD[j][0]) {
      if (ghostCities[i][5] === csvIslandD[j][3]){
        ghostIslandDetails.push(csvIslandD[j]);
        break;
      }
    }
  }

  ghostPixelX.push(ghostCities[i][3] * 128);
  if (ghostCities[i][3] % 2 == 0){
    ghostPixelY.push(ghostCities[i][4] * 128);
  }
  else {
    ghostPixelY.push(64 + ghostCities[i][4] * 128);
  }
  ghostPixelX[i] += parseInt(ghostIslandDetails[a][1]);
  ghostPixelY[i] += parseInt(ghostIslandDetails[a][2]);

  var x = targetPixelX - ghostPixelX[i];
  var y = targetPixelY - ghostPixelY[i];

  dist.push(calcHypotenuse(x,y));
  id.push(ghostCities[a][0]);
  points.push(ghostCities[a][6])
}

var travelTime = [];
for (var j = 0; j < dist.length; j++) {
  dist[j] = Math.round(dist[j]);
  var travelTimeN = 900 + dist[j] * 50/3;
  travelTimeN = travelTimeN/3600;
  travelTimeN = Math.round(travelTimeN * 100) / 100;
  var integerPart = parseInt(travelTimeN);
  var decimalPart = travelTimeN - integerPart;
  decimalPart *= 2/3;
  decimalPart = Math.round(decimalPart * 10) / 10;
  travelTime.push(parseInt(integerPart) + decimalPart);
}

var nameDist = [];
for (var i = 0; i < travelTime.length; i++) {
  if (travelTime[i] === 'NaN'){
    continue;
  }
  nameDist.push([travelTime[i],"[town]",id[i],"[/town]  -  Points: ",points[i]]);
}

nameDist.sort(sortFunction);

for (var i = 0; i < 5; i++) {
  message.channel.send(nameDist[i][1] + nameDist[i][2] + nameDist[i][3] + nameDist[i][4]);
}


}


module.exports.help = {
  name: "GhostFinder"
}
