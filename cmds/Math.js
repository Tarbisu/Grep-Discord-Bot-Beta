const Discord = require("discord.js");

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

function subtract(a, b){
  a = parseInt(a);
  b = parseInt(b);
  return a - b;
}

function multiply(a, b){
  a = parseInt(a);
  b = parseInt(b);
  return a * b;
}

function divide(a, b){
  a = parseInt(a);
  b = parseInt(b);
  return a / b;
}

function power(a, b){
  a = parseInt(a);
  b = parseInt(b);
  return Math.pow(a, b);
}

function modulas(a, b){
  a = parseInt(a);
  b = parseInt(b);
  return a % b;
}


module.exports.run = async(bot, message, args) => {
test = message.content;
test = test.split(" ");
console.log(test);
for (var i = 0; i < test.length; i++) {

  if (test[i] === "+") {
    message.channel.send(add(test[i-1], test[i+1]));
    break;
  }
  else if (test[i] === "/"){
    message.channel.send(divide(test[i-1], test[i+1]));
    break;
  }
  else if (test[i] === "*"){
    message.channel.send(multiply(test[i-1], test[i+1]));
    break;
  }
  else if (test[i] === "-"){
    message.channel.send(subtract(test[i-1], test[i+1]));
    break;
  }
  else if (test[i] === "^"){
   message.channel.send(power(test[i-1], test[i+1]));
   break;
  }
  else if (test[i] === "=?"){
    message.channel.send(difference(test[i-1], test[i+1]));
    break;
  }
  else if (test[i] === "%"){
    message.channel.send(modulas(test[i-1], test[i+1]));
    break;
  }
}


}

module.exports.help = {
  name: "Math"
}
