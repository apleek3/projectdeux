// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // ... loads battleship.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/battleship.html"));
  });

  // ... loads cms.html - content management assistance page kept for later pages (ICEBOX)
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cms.html"));
  });

  // ... loads battleship.html
  app.get("/battleship", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/battleship.html"));
  });

  // ... loads the game
  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/game.html"));
  });
  
  // ... loads the leaderboard
  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/leaderboard.html"));
  });
  
  //...loads the rules
  app.get("/rules", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/rules.html"));
  });
  
  //...loads the stats paage
  app.get("/statistics", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/statistics.html"));
  });

  //...loads the main page
  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });
  
  //...authentication with planned authentication features (ICEBOX)
  app.get("/authentication-login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/authentication-login.html"));
  });

  //...registration page with planned registration features (ICEBOX)
  app.get("/authentication-register", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/authentication-register.html"));
  });

  // ... loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/user-manager.html"));
  });

};

