var Player = require("./models/Player.js")

exports.setup = function() {
    var fs = require("fs");
    //Loading data
    try {
        var file = fs.readFileSync("players.txt", "utf8");
    }
    catch(e) {
        console.log("ERROR: " + e.stack)
    }

    var linesOfText = file.split("\r\n"),
        players = [];

    linesOfText.forEach((line) => {
        var split = line.split("|");
        players.push(new Player(split[0], split[1], 0));
    });

    return players;
}