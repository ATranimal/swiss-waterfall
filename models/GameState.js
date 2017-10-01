"use strict";
var Player = require("./Player.js");
var prompt = require("prompt");

module.exports = class GameState {
    constructor(players) {
        this.players = players;
        this.sortPlayers();

        this.round = 0;
        this.matches = [ [], [] ];
        this.oddPlayers = (players.length % 0 == 1) ? true : false; 
    }

    sortPlayers() {
        //TODO: Replace bubblesort LOL
        for (var i = 0; i < this.players.length; i++) {
            for (var j = 1; j < this.players.length-1; j++){
                if (this.players[j+1].score > this.players[j].score){
                    var temp = this.players[j];
                    this.players[j] = this.players[j+1];
                    this.players[j+1] = temp;
                }
            }
        }

    }


    //This is a doozy
    calculateMatches() {        
        this.round += 1;

       //Need checks for REGION, 

       // ROUND 1 MATCHING -> PLAYING OPPOSITE SEED
       for (var i = 0; i < Math.floor(this.players.length/2); i++) {
           this.matches[0].push(this.players[i]);
           this.matches[1].push(this.players[this.players.length - 1 - i]);
       }

       // ROUND 2 MATCHING -> PLAYING CLOSE SEED
    }

    finishRound(results) {

        //update scores of players based on results
        for (var i = 0; i < results.length; i++) {
            
            //get players in ith match
            var player1 = this.matches[0][i];
            var player2 = this.matches[1][i];

            //calculate their new score based on round
            //TODO: not make this a pile of garbage
            if (results[i] == 1){
                if (this.round == 1) {
                    player1.score = (player1.score + 1) / this.round; 
                    player2.score = (player2.score + 0) / this.round; 
                }
                else {
                    player1.score = ((player1.score * (this.round-1)) + 1) / this.round; 
                    player2.score = ((player2.score * (this.round-1)) + 0) / this.round; 
                
                }
            }
            else if (results[i] == 2 ) {                
                if (this.round == 0) {
                    player1.score = (player1.score + 0) / this.round; 
                    player2.score = (player2.score + 1) / this.round; 
                }
                else {
                    player1.score = ((player1.score * (this.round-1)) + 0) / this.round; 
                    player2.score = ((player2.score *(this.round-1)) + 1) / this.round; 
                
                }
            }
        }

        //empty matches
        this.matches = [ [], [] ];
    }

    searchPlayers (name) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].name == name) {
                return this.players[i];
            }
        }
    }

}
