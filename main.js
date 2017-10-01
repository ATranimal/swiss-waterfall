var setup = require("./setup.js");
var Player = require("./models/Player.js");
var GameState = require("./models/GameState.js");
var prompt = require("prompt");

main();

function main() {
    // Loading txt data into setup
    var data = setup.setup();
    var gameState = new GameState(data);

    gameState.calculateMatches();
    displayMatches(gameState);

}

//-------//
// VIEW  //
//-------//
function displayMatches(gameState) {
    console.log("=================");
    console.log("Round "+ gameState.round + " Start: " + gameState.matches[0].length + " matches.");
    console.log("=================");
        
    for (var i = 0; i < gameState.matches[0].length; i++){
        console.log(i+1 + ". " + gameState.matches[0][i].name + " vs " + gameState.matches[1][i].name);
    }

    //TODO: Add verification for input (try catch) or prompt validation
    prompt.start();
    prompt.get("results", (err, res) => {
        gameState.finishRound(res.results);
        displayPlayers(gameState);
    });
}

function displayPlayers(gameState) {
    gameState.sortPlayers();
    gameState.players.forEach( (player) => {
        console.log(player.name + ": " + player.score);
    });

    prompt.start();
    prompt.get("continue", (err, res) => {
        if (res.continue == 'y') {
            gameState.calculateMatches();
            displayMatches(gameState);
        }
        else {
            //Todo: Add code for bracket seeding generation;
        }

    });
}  
