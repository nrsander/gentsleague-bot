//============//
// STARTUP:   //
//============//

console.log('||  <---------------------  Booting ...');

const express = require("express");
const server = express();
const PORT = process.env.PORT;
console.log(PORT);
console.log('Server about to start listening ...');
server.listen(PORT);


// (If running locally:)
// cd Desktop/CRYPTO\ LYFE/Checkup/GLBot

const Discord = require('discord.js'); // Require the discord.js module
const client = new Discord.Client(); // Create a new Discord client
console.log('Discord client started successfully');
const config = require("./config.json");
const token = process.env.GL_DISCORD_TOKEN;
console.log('Hid the Russian bot token in a secret place');

console.log('Firing up RoboCommish  ...');

client.on('ready', function() {
    console.log('RoboCommish successfully deployed.')//;
});
// ^ This event runs each time GLBot ...
//     - Finishes logging in
//     - Reconnects after disconnecting


//============//
// COMMANDS:  //
//============//

client.on("message", (message) => {

  // (integrity checks)
  if (message.author.bot) {
    return;
  }
  if (message.content.startsWith(config.prefix)) {
    return;
  }

  msgCntnt = message.content.toString().toLowerCase();

  // Collusion-detector
  if (msgCntnt.includes("collusion") || msgCntnt.includes("collude") || msgCntnt.includes("colluding")  || msgCntnt.includes("colluder")) {
    console.log('[-----COLLUSION DETECTED-----]');
    message.channel.send("WARNING: The Gentleman's League Bureau of Investigations is now monitoring the active conversation. Anything you say can and will be used against you in the Objections channel. Please carry on ...");
  }
});


//============//
// INIT BOT:  //
//============//

// login to Discord with your app's token
client.login(token);
