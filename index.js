//============//
// STARTUP:   //
//============//

console.log('||  <---------------------  Test Boot ...');

const express = require("express");
console.log('Express loaded');
const server = express();
console.log('Express server started successfully');
const PORT = process.env.PORT;
console.log(PORT);
console.log('Server about to start listening ...');
server.listen(PORT);


// (If running locally:)
// cd Desktop/CRYPTO\ LYFE/Checkup/GLBot

const Discord = require('discord.js'); // Require the discord.js module
console.log('Discord.js loaded');
const client = new Discord.Client(); // Create a new Discord client
console.log('Discord client started successfully');
const config = require("./config.json");
const token = process.env.GL_DISCORD_TOKEN;
console.log('Hid the Russian bot token in a secret place');

console.log('Firing up GLBot  ...');

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
  console.log('debug 0');

  // (integrity checks)
  if (message.author.bot) {
    console.log('Bad Author Error (Bot)');
    return;
  }
  if (message.content.startsWith(config.prefix)) {
    console.log('Bad Prefix Error (Command)');
    return;
  }

  // (msg->lowercase)
  msgCntnt = map(str.lower, message.content);
  console.log('debug 1');

  // Collusion-detector
  if (msgCntnt.includes("collusion")) {
    console.log('debug 2');
    message.channel.send("COLLUSION!!!??????");
  }
});


//============//
// INIT BOT:  //
//============//

// login to Discord with your app's token
client.login(token);
