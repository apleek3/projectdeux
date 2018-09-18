var db = require("../models");

module.exports = function(app) {
  // Get all games
  app.get("/api/games", function(req, res) {
    db.Example.findAll({}).then(function(dbgames) {
      res.json(dbgames);
    });
  });

  // Create a new example
  app.post("/api/games", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/games/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
