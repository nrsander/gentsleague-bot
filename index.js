// cd Desktop/CRYPTO\ LYFE/Checkup/GLBot


// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', function() {
    console.log('Firing up GLBot ...')//;
});

client.on("message", (message) => {
  if (message.content.includes("collusion")) {
    message.channel.send("COLLUSION!!!!????????");
  }
});

// login to Discord with your app's token
client.login('NDc3NjIxNzQ2MDMyNDQzMzk0.Dk-z7g.tR8sVcWW2qgKTIKP4s_DoLK1J5s');
