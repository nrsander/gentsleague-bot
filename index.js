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

const espnFF = require('espn-ff-api');
const cookies = {
  espnS2 : 'AECEQQFfq9v%2FKF46rl7BoFgHimTDQb5YtXB1lwH6kDf7cRKjMsTUunVQaZTZjsCs7SOLB5L1Y2b7mMDPH7Hgblhb7KUB2assXYlXNRKnwU3DzeN7KRF8zw8EFYX3FFhAmyp4N%2Fl%2BseRM25dqnqI44auvCWrlW9Q0P4DeTDGH%2F9o4BCQXPxnUcWjnIk%2Ff6y8PGBDUPOAPRVoE25CwKaH6bO4ELgI216Xev8wl004HIohqh%2FAs3Xq69S2t3XdUdZTXKAU%3D',
  SWID   : '{D03EEEB0-C999-42DA-9394-C054A93119A9}'
};

const leagueId = 175917;

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
    console.log('RoboCommish successfully deployed.')
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


  // ESPN-getter
  if (msgCntnt.includes("^teams")) {

    console.log('[ ----- Scraping data from the Gentleman\'s League ESPN page ... ----- ]');
    message.author.send("Thinking ...");

    // Returns simplified league object
    espnFF.getOverallStandings(cookies, leagueId)
          .then(result => {
            var resultSize = 12;
            console.log("ESPN --> GL --> getOverallStandings:")
            console.log(result)

            //var resStr;
            var i;
            var tmid;
            for (i = 0; i <= resultSize - 1; i++) {

              // Main:
              message.channel.send("\n" + result[i].teamLocation + " " + result[i].teamNickname + "\n\t\tGL member #" + result[i].teamId + "\n\t\tWins: " + result[i].wins + "\n\t\tPoints: " + result[i].pointsFor);
              console.log(result[i].teamLocation + " " + result[i].teamNickname + "\n\t\tGL member #" + result[i].teamId + "\n\t\tWins: " + result[i].wins + "\n\t\tPoints: " + result[i].pointsFor);
              //testy = getSingleTeamPlayers(cookies, leagueId, i, 16)
              //console.log(testy)
              //resStr += resStr + "\n" + "GL Member #" + result[i].teamIdresult + "\t" + result[i].teamLocation + " " + result[i].teamNickname;

              var playersLimit = 1;
              var k;
              tmid = result[i].teamId;
              espnFF.getSingleTeamPlayers(cookies, leagueId, result[i].teamId, 16)
                    .then(players => {
                      rstr = '';
                      for (j=0; j<=playersLimit-1; j++) {
                        if(j>0){
                          rstr += ", "
                        };

                        console("Run " + j + ":\t" + rstr);
                        rstr += players[j].playerName;

                        //k = result[j].teamId;
                        //console.log("Starting ID="+k);
                        //console.log(result[k].playerName);
                      }
                      
                      console.log("Rstr:\t" + rstr)
                      message.channel.send("Players:\n" + rstr)
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
