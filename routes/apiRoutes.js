var db = require("../models");


module.exports = function (app) {
  // Get all games
  app.get("/api/games", function (req, res) {
    db.Game.findAll({}).then(function (dbGames) {
      res.json(dbGames);
    });
  });

  // // Create a new game
  // app.post("/api/games", function(req, res) {
  //   // console.log(req.body);
  //   // console.log(res.body);
  //   db.Game.create(req.body).then(function(dbGame) {
  //     console.log(dbGame);
  //     res.json(dbGame);
  //   });
  // });

  app.post("/api/Games", function (req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)

    /////////////////////////////////////////////////////////////////////////
    db.Game.create({
      username: req.body.text
    }).then(function (dbGame) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbGame);
  
    });
  });
  /////////////////////////////////////////////////////////////////////////
  // Delete an game by id
  app.delete("/api/games/:id", function (req, res) {
    db.Game.destroy({ where: { id: req.params.id } }).then(function (dbGame) {
      res.json(dbGame);
    });
  });
};
