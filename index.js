// (If running locally:)
// cd Desktop/CRYPTO\ LYFE/Checkup/GLBot


//============//
// SETUP:     //
//============//

const Discord = require('discord.js'); // Require the discord.js module
const client = new Discord.Client(); // Create a new Discord client
const config = require("./config.json");

console.log('Firing up GLBot ...')

client.on('ready', function() {
    console.log('GLBot deployed.')//;
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
  msgCntnt = map(str.lower, message.content)

  // Collusion-detector
  if (msgCntnt.includes("collusion")) {
    message.channel.send("COLLUSION!!!??????");
  } else
​  // Power-rankings mention detector
  //if (msgCntnt.includes("power rankings")) {
  //  message.channel.send("Did somebody say Power Rankings??");
  //}
});

//client.on("message", message => {
//  if (message.author.bot) return;
//  if (message.content.indexOf(config.prefix) !== 0) return;
​//
//  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//  const command = args.shift().toLowerCase();
​//
//  if(command === 'collusion') {
//    message.channel.send('COLLUSION!!!!???????!?!');
//  } else
//  if (command === '9') {
//    message.channel.send('Meh.');
//  }
//});




//============//
// BOT LOGIN: //
//============//

// login to Discord with your app's token
client.login(config.token);
