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

  // users route loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/user-manager.html"));
  });

};
