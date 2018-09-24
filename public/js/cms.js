$(document).ready(function() {
  // Getting jQuery references to the game body, title, form, and user select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var userSelect = $("#user");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a game)
  var url = window.location.search;
  var gameId;
  var userId;
  // Sets a flag for whether or not we're updating a game to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the game id from the url
  // In '?game_id=1', gameId is 1
  if (url.indexOf("?game_id=") !== -1) {
    gameId = url.split("=")[1];
    getGameData(gameId, "game");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their games
  getUsers();

  // A function for handling what happens when the form to create a new game is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the game if we are missing a body, title, or user
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newGame object to hand to the database
    var newGame = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      UserId: userSelect.val()
    };

    // If we're updating a game run updateGame to update a game
    // Otherwise run submitGame to create a whole new game
    if (updating) {
      newGame.id = gameId;
      updateGame(newGame);
    }
    else {
      submitGame(newGame);
    }
  }

  // Submits a new game and brings user to battleship page upon completion
  function submitGame(game) {
    $.post("/api/games", game, function() {
      window.location.href = "/battleship";
    });
  }

  // Gets game data for the current game if we're editing, or if we're adding to an user's existing games
  function getGameData(id, type) {
    var queryUrl;
    switch (type) {
    case "game":
      queryUrl = "/api/games/" + id;
      break;
    case "user":
      queryUrl = "/api/users/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this game exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        userId = data.UserId || data.id;
        // If we have a game with this id, set a flag for us to know to update the game
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get("/api/users", renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.name);
    return listOption;
  }

  // Update a given game, bring user to the battleship page when done
  function updateGame(game) {
    $.ajax({
      method: "PUT",
      url: "/api/games",
      data: game
    })
      .then(function() {
        window.location.href = "/battleship";
      });
  }
});
