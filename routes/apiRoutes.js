var db = require("../models");

module.exports = function(app) {
  // Get all games
  app.get("/api/games", function(req, res) {
    db.Game.findAll({}).then(function(dbgames) {
      res.json(dbgames);
    });
  });

  // Create a new game
  app.post("/api/games", function(req, res) {
    db.Game.create(req.body).then(function(dbGame) {
      res.json(dbGame);
    });
  });

  // Delete an game by id
  app.delete("/api/games/:id", function(req, res) {
    db.Game.destroy({ where: { id: req.params.id } }).then(function(dbGame) {
      res.json(dbGame);
    });
  });
};
