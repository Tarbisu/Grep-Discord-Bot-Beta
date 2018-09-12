const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const alliance = "https://en106.grepolis.com/data/alliances.txt";
const town = "https://en106.grepolis.com/data/towns.txt";
const island = "https://en106.grepolis.com/data/islands.txt";


function csvToArray (data) {
rows = data.split("\n");
return rows.map(function (row) {
return row.split(",");
	});
};

snekfetch.get(alliance).then(r => { let allianceData = csvToArray(r.text);
snekfetch.get(town).then(r => { let townData = csvToArray(r.text);
snekfetch.get(island).then(r => {let islandData = csvToArray(r.text);



function CalcDom(cities, totalCities){
  return (cities / totalCities) * 100;
}

module.exports.run = async(bot, message, args) => {


 								allianceData.sort(function(a,b) {
 									return a[0]-b[0]
 							});
 							allianceData.sort(function(a,b) {
 								return a[5]-b[5]
 						});

            var T12 = [];

            for (var l = 1; l < 13; l ++){
               T12.push(allianceData[l]);
            }
            for (var i = 0; i < townData.length; i++) {
              if (townData[i][1] == ""){
                townData.splice(i--,1);

              }
            }
            var domValues = [];

            for (var i = 0; i < T12.length; i++) {
              domValues.push(CalcDom(T12[i][3], townData.length));
            }
            console.log(domValues);
		// allianceData[k][1] = allianceData[k][1].replace(/[+]/g, " ");
		// allianceData[k][1] = allianceData[k][1].replace(/%27/g, "'");
    //
    // message.channel.send({embed: {
  	//     color: 3447003,
  	//   title: "Island Details",
  	// 	description: "Ocean: " + islandInfo[1],
  	// 	} });
    //



 }
});
});
});


module.exports.help = {
  name: "DomCalc"
}
