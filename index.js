const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const fs = require("fs");

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err,files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
		console.log("No commands to load");
		return;
	}

	console.log(`Loading ${jsfiles.length} commands`);
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded`);
		bot.commands.set(props.help.name, props);
	});
})

bot.on("ready", async () =>{
	console.log(`${bot.user.username} is online!`);
	console.log(bot.commands)
	bot.user.setActivity("Exotic Chicken Simulator");
} );

bot.on("guildCreate", async guild =>{
	console.log("I have joined: " + guild.name);
	if(!guild.channels.exists("name", "bot-updates")){
	guild.createChannel("bot-updates", "text");
	}
	var finalA = Math.floor(Math.random() * (16777215 - 1)) + 1;
	guild.channels.find("name", "bot-updates").send({embed: {
			color: finalA,
		title: "Bot: " + bot.user.username + " Server: " + guild.name,
		 fields: [{
				 name: "First Usage!",
				 value: "Grepo Bot Here!\nTo first setup a server, use the ***!Setup*** command, syntax is: !Setup {worldID}\nAn example would be !Setup en100\nFurther details on other commands are in the ***!Help*** command\n\nIf issues arise with the bot re-loading data, such as recurring error messages. Kick the bot and use the setup command one time only, it should resolve any and all problems.",
			 },
					],
	 } });

});



bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if (message.content.split(" ")[0] === "!Setup"){
		let prefix = botconfig.prefix;
		let messageArray = message.content.split(" ");
		let command = messageArray[0];
		let args = messageArray.slice(1);
		if(!command.startsWith(prefix)) return;
		let cmd = bot.commands.get("Reload");
		cmd.run(bot,message,args);
		var timer = setInterval (function (){
			let prefix = "!";
			let messageArray = message.content.split(" ");
			let command = messageArray[0];
			let args = messageArray.slice(1);
			if(!command.startsWith(prefix)) return;
			let cmd = bot.commands.get("Reload");
			cmd.run(bot,message,args);
		}, 3600000);
	}

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	if(!command.startsWith(prefix)) return;
	let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd){cmd.run(bot,message,args);}
});



bot.login(process.env.BOT_TOKEN);
