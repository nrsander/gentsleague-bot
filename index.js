//============//
// STARTUP:   //
//============//

// (config)
const config = require("./config.json");

// (env vars)
const token = process.env.GL_DISCORD_TOKEN;
console.log('Hid the Russian bot token in a secret place.');

// (set GL indices)
const GL_ID = {
  1  : 'JP',
  2  : 'Nick',
  3  : 'Chris',
  4  : 'Brendan',
  6  : 'Joey',
  7  : 'Trevor',
  8  : 'Zak',
  9  : 'Lorenz',
  10 : 'Paul',
  11 : 'Kade',
  12 : 'Vinnie',
  13 : 'Jason'
};


// ---------------------------------


// Set up HTTP server
console.log('||  <---------------------  Booting GL Bot ...');
const express = require("express");
const server = express();
const PORT = process.env.PORT;
console.log('Server about to start listening on port ' + PORT + ' ...');
server.listen(PORT);
console.log('Listening.');

// ESPN Fantasy connection
const espnFF = require('espn-ff-api');
const cookies = {
  espnS2 : 'AECEQQFfq9v%2FKF46rl7BoFgHimTDQb5YtXB1lwH6kDf7cRKjMsTUunVQaZTZjsCs7SOLB5L1Y2b7mMDPH7Hgblhb7KUB2assXYlXNRKnwU3DzeN7KRF8zw8EFYX3FFhAmyp4N%2Fl%2BseRM25dqnqI44auvCWrlW9Q0P4DeTDGH%2F9o4BCQXPxnUcWjnIk%2Ff6y8PGBDUPOAPRVoE25CwKaH6bO4ELgI216Xev8wl004HIohqh%2FAs3Xq69S2t3XdUdZTXKAU%3D',
  SWID   : '{D03EEEB0-C999-42DA-9394-C054A93119A9}'
};
const leagueId = 175917;


// Example file system  (test)
var fs = require("fs");
var data = fs.readFileSync('example.txt');
console.log(data.toString());
console.log("(.) -- Example Displayed -- (.)");


// Set up Discord client
const Discord = require('discord.js'); // Require the discord.js module
const client = new Discord.Client(); // Create a new Discord client
console.log('Discord client started successfully');


//R-script
//var R = require("r-script"); // (Removed from package.json)


// ---------------------------------




//============//
// PARAMS:    //
//============//

const week = 16;
const playersLimit = 1;


// ---------------------------------




//============//
// DISCORD    //
// CLIENT     //
// COMMANDS:  //
//============//

// Start (or restart) Discord client
client.on('ready', function() {
  console.log('');
  console.log('Firing up RoboCommish  ...');
  console.log('');
  console.log('RoboCommish successfully deployed.')
});


// Message received
client.on("message", (message) => {

  // (Ensure this msg is NOT from a bot/self ( => infinite loop error))
  if (message.author.bot) {
    return
  };
  // (This msg is actually a command)
  if (message.content.startsWith(config.prefix)) {
    return
  };

  // Convert msg to lowercase
  msgCntnt = message.content.toString().toLowerCase();

  // If msg is {My makeshift 'scrape ESPN league' command}, then ...
  if (msgCntnt.includes("^teams")) {
    console.log('      <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>      ');
    console.log('   <> <> <> <> <> <    Scraping data from the Gentleman\'s League on ESPN ...      > <> <> <> <> <>   ');
    console.log('      <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <> <>      ');

    message.author.send("Scraping...");

    console.log(GL_ID.length);
    console.log(GL_ID);

    // Special exception (fuck JJ Howse)
    var i;
    for (i = 1; i <= 13; i++) {
      console.log(i)

      if (i >= 5) {
        i = i + 1
        console.log(i-1 + " --> " + i)
      };

      // GL ID
      var glid = GL_ID[i];
      console.log('Team ' + i + ":");

      // Get this team's roster
      espnFF.getSingleTeamPlayers(cookies, leagueId, glid, week)
        .then(players => {
          console.log(players.playerName + ', ' + players.playerPosition);
          return players
        })
        .catch({statusCode: 503}, err => {
          console.error("Error: You fucked up! ${err.message}");
          console.error("Perhaps check that your Heroku environ vars are your correct espn_s2 and SWID cookies?");
          message.channel.send("Error: You fucked up!");
          message.channel.send("${err.message}");
          message.channel.send("Perhaps check that your Heroku environ vars are your correct espn_s2 and SWID cookies?");
        })
        .done(result => {
          console.log('GL scrape job complete.');
        });
    };

    // Collusion-detector
    if (msgCntnt.includes("collusion") || msgCntnt.includes("collude") || msgCntnt.includes("colluding")  || msgCntnt.includes("colluder")) {
      console.log('[ << ----- COLLUSION DETECTED ----- >> ]');
      message.channel.send("Collusion - Code Red");
    };

  }; // Semi End

}); // Real End


//============//
// INIT BOT:  //
//============//

// Log in to Discord with token (now stored in server env vars. eat that, Russian bots.)
client.login(token);
