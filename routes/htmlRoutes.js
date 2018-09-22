var db = require("../models");
var path = require("path");


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("../views/index.handlebars");
  });

  // Load game page and pass in an game by id
  app.get("/game/:id", function (req, res) {
    res.render("../views/example.handlebars");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
