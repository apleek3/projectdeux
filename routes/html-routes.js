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

  // index route loads battleship.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/battleship.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/cms.html"));
  });

  // battleship route loads battleship.html
  app.get("/battleship", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/battleship.html"));
  });

  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/game.html"));
  });

  app.get("/leaderboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/leaderboard.html"));
  });

  app.get("/rules", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/rules.html"));
  });

  app.get("/statistics", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/statistics.html"));
  });

  app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  });

  app.get("/authentication-login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/authentication-login.html"));
  });

  app.get("/authentication-register", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/authentication-register.html"));
  });

  // users route loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/user-manager.html"));
  });

};

