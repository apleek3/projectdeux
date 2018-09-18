var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Games.findAll({}).then(function(dbGames) {
      res.render("index", {
        msg: "Welcome!",
        games: dbGames
      });
    });
  });

  // Load game page and pass in an game by id
  app.get("/game/:id", function(req, res) {
    db.Games.findOne({ where: { id: req.params.id } }).then(function(dbGame) {
      res.render("game", {
        game: dbGame
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
