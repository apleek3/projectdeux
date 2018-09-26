// *********************************************************************************
// game-routes.js - this file offers a set of routes for requesting game data from the server
// *********************************************************************************

// Dependencies
// =============================================================
var admin = require("firebase-admin");
var serviceAccount = require("../app/battleship-167f9-firebase-adminsdk-noo5b-b3471d47a0.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://battleship-167f9.firebaseio.com"
});
var db = admin.database();
var path = require("path");
var battleship = require("../app/battleship.js");
// Routes
// =============================================================
module.exports = function (app) {
    app.post("/new/game", function (req, res) {
        if (req.body) {
            console.log(req.body);
            var id = req.body.id;
        } else {
            var id = "anon";
        }
        var player1 = new battleship.constructors.Player("player");
        var player2 = new battleship.constructors.Player("cpu");
        var newGame = battleship.methods.gameData(player1, player2);
        db.ref("users" + id + "/games").set({
            data: newGame
        });
        res.send({
            id: id,
            boats: newGame.playerBoats
        });
    });

};

//db.ref("games/" + id).push(new GameData(player1, player2));