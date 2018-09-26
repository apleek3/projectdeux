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
var battleship = require("../app/battleship.js");
function gameExistsCallback(res, user, gameID, exists) {
    if (exists) {
        db.ref("users/" + user + "/games/" + gameID).once("value", function (snapshot) {
            res.send({
                boats: snapshot.val().data.playerBoats
            });
        });
    } else {
        var player1 = new battleship.constructors.Player("player");
        var player2 = new battleship.constructors.Player("cpu");
        var newGame = battleship.methods.gameData(player1, player2);
        db.ref("users/" + user + "/games/" + gameID).set({
            data: newGame
        });
        res.send({
            boats: newGame.playerBoats
        });
    }
}

// Tests to see if /users/games/<gameID> has any data. 
function checkIfGameExists(res, user, gameID) {
    db.ref("users/" + user + "/games/").child(gameID).once("value", function (snapshot) {
        var exists = (snapshot.val() !== null);
        gameExistsCallback(res, user, gameID, exists);
    });
}

// Routes
// =============================================================
module.exports = function (app) {
    app.post("/new/game", function (req, res) {
        if (req.body) {
            var user = req.body.user;
            var gameID = req.body.gameID;
        } else {
            var user = "anon";
            var gameID = "anon";
        }
        checkIfGameExists(res, user, gameID);
    });
};