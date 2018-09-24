$(document).ready(function() {
  /* global moment */

  // battleshipContainer holds all of our games
  var battleshipContainer = $(".battleship-container");
  var gameCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleGameDelete);
  $(document).on("click", "button.edit", handleGameEdit);
  // Variable to hold our games
  var games;

  // The code below handles the case where we want to get battleship games for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getGames(userId);
  }
  // If there's no userId we just get all games as usual
  else {
    getGames();
  }


  // This function grabs games from the database and updates the view
  function getGames(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/games" + userId, function(data) {
      console.log("Games", data);
      games = data;
      if (!games || !games.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete games
  function deleteGame(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/games/" + id
    })
      .then(function() {
        getGames(gameCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed game HTML inside battleshipContainer
  function initializeRows() {
    battleshipContainer.empty();
    var gamesToAdd = [];
    for (var i = 0; i < games.length; i++) {
      gamesToAdd.push(createNewRow(games[i]));
    }
    battleshipContainer.append(gamesToAdd);
  }

  // This function constructs a game's HTML
  function createNewRow(game) {
    var formattedDate = new Date(game.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newGameCard = $("<div>");
    newGameCard.addClass("card");
    var newGameCardHeading = $("<div>");
    newGameCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newGameTitle = $("<h2>");
    var newGameDate = $("<small>");
    var newGameUser = $("<h5>");
    newGameUser.text("Written by: " + game.User.name);
    newGameUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newGameCardBody = $("<div>");
    newGameCardBody.addClass("card-body");
    var newGameBody = $("<p>");
    newGameTitle.text(game.title + " ");
    newGameBody.text(game.body);
    newGameDate.text(formattedDate);
    newGameTitle.append(newGameDate);
    newGameCardHeading.append(deleteBtn);
    newGameCardHeading.append(editBtn);
    newGameCardHeading.append(newGameTitle);
    newGameCardHeading.append(newGameUser);
    newGameCardBody.append(newGameBody);
    newGameCard.append(newGameCardHeading);
    newGameCard.append(newGameCardBody);
    newGameCard.data("game", game);
    return newGameCard;
  }

  // This function figures out which game we want to delete and then calls deleteGame
  function handleGameDelete() {
    var currentGame = $(this)
      .parent()
      .parent()
      .data("game");
    deleteGame(currentGame.id);
  }

  // This function figures out which game we want to edit and takes it to the appropriate url
  function handleGameEdit() {
    var currentGame = $(this)
      .parent()
      .parent()
      .data("game");
    window.location.href = "/cms?game_id=" + currentGame.id;
  }

  // This function displays a message when there are no games
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    battleshipContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No games yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    battleshipContainer.append(messageH2);
  }

});
