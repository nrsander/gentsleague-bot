//============//
// STARTUP:   //
//============//

// (config)
const config = require("./config.json");
// (env vars)
const token = process.env.GL_DISCORD_TOKEN;
console.log('Hid the Russian bot token in a secret place.');

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
// COMMANDS:  //
//============//

// Start (/restart) Discord client
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
    return; // quit
  }
  // (This msg is actually a command)
  if (message.content.startsWith(config.prefix)) {
    return; // quit
  }

  // convert msg to lowercase
  msgCntnt = message.content.toString().toLowerCase();


  // if msg = {my makeshift 'scrape ESPN league' command} then ...
  if (msgCntnt.includes("^teams")) {
    console.log('[ ----- Scraping data from the Gentleman\'s League ESPN page ... ----- ]');

    message.author.send("Thinking ...");

    // Get Overall Standings
    //    returns simplified league object
    espnFF.getOverallStandings(cookies, leagueId)
          .then(result => {
              var resultSize = result.length;

              console.log("Result:");
              console.log(result);
              console.log("\t  ^  =  ESPN-->GL-->getOverallStandings(...)");
              console.log("\tResult size = " + resultSize);

              message.channel.send("QB1 - Week " + week);

              let rstr = '';

              var tmid;
              var i;
              for (i = 0; i <= resultSize - 1; i++) {

              // Bot Response:
              message.channel.send(result[i].teamLocation + " " + result[i].teamNickname + " [GL #" + result[i].teamId + "] " + result[i].wins + " wins, " + result[i].pointsFor + " pts.");
              console.log(result[i].teamLocation + " " + result[i].teamNickname + " [GL #" + result[i].teamId + "] " + result[i].wins + " wins, " + result[i].pointsFor + " pts.");

              // Get QB1's ...

              // Which team are we on?
              let tmid = result[i].teamId;
              console.log("Team ID   : " + tmid);
              console.log("Team Name : " + result[i].teamLocation + " " + result[i].teamNickname);

              espnFF.getSingleTeamPlayers(cookies, leagueId, tmid, week)
                    .then(players => {
                      console.log("Players:");
                      console.log(players);
                    })
                    .done(players => {
                      for (j=0; j<=playersLimit-1; j++) {
                        if(j>0){
                          rstr += ", "
                        };
                        rstr += players[j].playerName;
                        console.log("(" + j + ")" + "Player    : " + players[j].playerName);
                      }
                      console.log("All " + playersLimit + " Requested Players:\n\t" + rstr);
                      message.channel.send("Req'd Players:\n" + rstr);

                      console.log('==> GetSingleTeamPlayers ==> Complete (100%)');
                    });

            }
          })
          .catch({statusCode: 503}, err => {
                  console.error("Error: You fucked up! ${err.message}");
                  console.error("Perhaps check that your Heroku environ vars are your correct espn_s2 and SWID cookies?");
                  message.channel.send("Error: You fucked up!");
                  message.channel.send("${err.message}");
                  message.channel.send("Perhaps check that your Heroku environ vars are your correct espn_s2 and SWID cookies?");
                })
          .done(result => {
            console.log('Done!');
          });
    //message.author.send("Finished.");
  }


  var pipi;
  // Collusion Detector
  if (msgCntnt.includes("collusion") || msgCntnt.includes("collude") || msgCntnt.includes("colluding")  || msgCntnt.includes("colluder")) {
    console.log('[ << ----- COLLUSION DETECTED ----- >> ]');
    message.channel.send("COLLUSION??");
    espnFF.getSingleTeamPlayers(cookies, leagueId, 1, 16)
          .then(result => {
            for (i=0; i<=16; i++) {
              console.log(result[i].playerName)
            }
          });
  }
});


//============//
// INIT BOT:  //
//============//

// Log in to Discord with token (now stored in server env vars. eat that, Russian bots.)
client.login(token);
