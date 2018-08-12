//============//
// STARTUP:   //
//============//

var port = process.env.PORT || 8000;
server.listen(port, function() {
    console.log("GLApp is running on port " + port);
});


// (If running locally:)
// cd Desktop/CRYPTO\ LYFE/Checkup/GLBot

const Discord = require('discord.js'); // Require the discord.js module
const client = new Discord.Client(); // Create a new Discord client
const config = require("./config.json");
const token = process.env.GL_DISCORD_TOKEN;

console.log('Firing up GLBot ...');

client.on('ready', function() {
    console.log('GLBot successfully deployed.')//;
});
// ^ This event runs each time GLBot ...
//     - Finishes logging in
//     - Reconnects after disconnecting


//============//
// COMMANDS:  //
//============//

client.on("message", (message) => {

  // (integrity checks)
  if(message.author.bot) return;
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // (msg->lowercase)
  msgCntnt = map(str.lower, message.content);

  // Collusion-detector
  if (msgCntnt.includes("collusion")) {
    message.channel.send("COLLUSION!!!??????");
  }
});


//============//
// INIT BOT:  //
//============//

// login to Discord with your app's token
client.login(token);
