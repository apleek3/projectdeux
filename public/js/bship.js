// Initialize Firebase
var config = {
  apiKey: "AIzaSyCcrKJgxnJp0SkukTc1HhI-dkxMfX3jT2s",
  authDomain: "battleship-167f9.firebaseapp.com",
  databaseURL: "https://battleship-167f9.firebaseio.com",
  projectId: "battleship-167f9",
  storageBucket: "battleship-167f9.appspot.com",
  messagingSenderId: "167042498206"
};
firebase.initializeApp(config);
var db = firebase.database();
/**
 * @desc executes the jQuery append function multiple times with a single jQuery object.
 * @param {object} appThis jQuery object with content to append
 * @param {object} appTo jQuery object to which the content is appended
 * @param {number} num number of times the content is appended
 */
function appendMultiple(appThis, appTo, num) {
  for (var i = 0; i < num; i++) {
    appTo.append(appThis.clone());
  }
}
/**
 * @desc creates and returns an array of numbers as strings, starting with "1"
 * @param {number} num length of the array
 */
function numArr(num) {
  var arr = Array(num).fill("");
  arr.forEach(function (e, i, a) {
    a[i] += 1 + i;
  });
  return arr;
}
/**
 * creates and returns an array of letters as strings, starting with "a"
 * @param {number} num length of the array
 */
function alphArr(num) {
  return "abcdefghijklmnopqrstuvwxyz".slice(0, num).split("");
}
/**
 * @description Generates a game board in the form of a div. Works in conjunction with css file and uses the CSS Grid Layout. Coordines are applied to each play area square as data-coord.
 * @param {number} rows number of rows on the game board play area
 * @param {number} cols number of columnss on the game board play area
 * @param {string} player the owner of the board (cpu or human player)
 */
function generateBoard(rows, cols, player) {
  var colArr = numArr(cols);
  var rowArr = alphArr(rows);
  var board = $("<div>").addClass("board");
  var square = $("<div>").addClass("square");
  var colLabelSqure = square.clone().addClass("col-label");
  var rowLabelSquare = square.clone().addClass("row-label");
  var playSquare = square.clone().addClass("play-square");
  board.append(square.clone());
  appendMultiple(colLabelSqure, board, 10);
  for (var i = 0; i < 10; i++) {
    board.append(rowLabelSquare.clone());
    appendMultiple(playSquare, board, 10);
  }
  board.find(".col-label").each(function (index) {
    $(this).append($("<p>").text(colArr[index]));
  });
  board.find(".row-label").each(function (index) {
    $(this).append($("<p>").text(rowArr[index]));
  });
  board.find(".play-square").each(function (index) {
    var abcCoord = rowArr[Math.floor(index / 10)];
    var numCoord = colArr[index % 10];
    this.setAttribute("data-coord", abcCoord + numCoord);
    this.setAttribute("data-player", player);
    $(this).on("click", function () {
      if (boat) {
        console.log("boat!");
      }
    });
  });
  return board;
}
var boat = false;
var boatLength = 4;
var playerTurn = true;
var guesses = [];
var cpuGuesses = [];
var hits = 0;
var cpuHits = 0;
var rngGuess = function () {
  return alphArr(10)[Math.floor(Math.random() * 10)] + numArr(10)[Math.floor(Math.random() * 10)];
}
var cpuTurn = function (gameRef) {
  var guess = rngGuess();
  if (cpuGuesses.includes(guess)) {
    cpuTurn(gameRef);
  } else {
    cpuGuesses.push(guess);
    db.ref(gameRef + "/guesses/cpu").set(cpuGuesses);
  }
}

$(document).ready(function () {
  var attackHistory = $("<div>").css({
    //TODO: make the attack history div look better
    //TODO: append shots to the msg-div
  });
  attackHistory.addClass("history-box");
  $("#game-area-player").append(generateBoard(10, 10, "player"));
  $("#game-area-msg").append(attackHistory);
  $("#game-area-cpu").append(generateBoard(10, 10, "cpu"));

  if (location.search) {
    var queryURL = (location.search).split("&");
    var gameID = queryURL[0].slice(queryURL[0].indexOf("=") + 1);
    var user = queryURL[1].slice(queryURL[1].indexOf("=") + 1);
  } else {
    var user = "anon"
    var gameID = Math.floor(Math.random() * 10000);
  }

  $.post("./new/game", { gameID: gameID, user: user }, function (data) {
    data.boats.forEach(function (e) {
      $("[data-coord=" + e + "][data-player=player]").css("background-color", "rgba(30,30,30,0.4)");
    });
    gameRef = "/users/" + user + "/games/" + gameID + "/data/";
    db.ref(gameRef + "/guesses/player").once("value", function (snapshot) {
      if (snapshot.val()) {
        guesses = snapshot.val();
      }
    });
    db.ref(gameRef + "/guesses/cpu").once("value", function (snapshot) {
      if (snapshot.val()) {
        cpuGuesses = snapshot.val();
      }
    });

    $("#game-area-cpu").on("click", ".play-square", function () {
      if (guesses.includes(this.dataset.coord)) {
        console.log(this.dataset.coord + " already guessed that");
      } else {
        guesses.push(this.dataset.coord);
        db.ref(gameRef + "/guesses/player").set(guesses);
      }
      cpuTurn(gameRef);
    });

    db.ref(gameRef + "/guesses/player").once("value", function (snapshot) {
      var arr = snapshot.val();
      if (arr) {
        arr.forEach(function (guess) {
          db.ref(gameRef + "/cpuBoats/").once("value", function (snapshot) {
            if (snapshot.val().includes(guess)) {
              //hit
              $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(100,40,40,0.6)");
            } else {
              //miss
              $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(10,10,10,0.8)");
            }
          });
        });
      }
    });

    db.ref(gameRef + "/guesses/cpu").once("value", function (snapshot) {
      var arr = snapshot.val();
      if (arr) {
        arr.forEach(function (guess) {
          db.ref(gameRef + "/playerBoats/").once("value", function (snapshot) {
            if (snapshot.val().includes(guess)) {
              //hit
              $("[data-coord=" + guess + "][data-player=player]").css("background-color", "rgba(100,40,40,0.6)");
            } else {
              //miss
              $("[data-coord=" + guess + "][data-player=player]").css("background-color", "rgba(10,10,10,0.8)");
            }
          });
        });
      }
    });

    db.ref(gameRef + "/guesses/player").on("value", function (snapshot) {
      var arr = snapshot.val();
      if (arr) {
        var guess = arr[arr.length - 1];
        db.ref(gameRef + "/cpuBoats/").once("value", function (snapshot) {
          if (snapshot.val().includes(guess)) {
            //hit
            $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(100,40,40,0.6)");
            if (snapshot.val().every(e => arr.indexOf(e) > -1)) {
              console.log("player wins!");
              alert("PLAYER WINS!")
              $("#game-area-cpu").off("click", ".play-square");
              db.ref(gameRef + "/winner/").set("player");
              db.ref(gameRef).once("value", function (snapshot) {
                var gameData = snapshot.val();
                if (user !== "anon") {
                  $.post("/api/games", {
                    title: "game_" + gameID,
                    body: JSON.stringify(gameData),
                    UserId: user
                  }, function (data) {
                    console.log(data);
                  });
                }
              });
            }
          } else {
            //miss
            $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(10,10,10,0.8)");
          }
        });
      }
    });

    db.ref(gameRef + "/guesses/cpu").on("value", function (snapshot) {
      var arr = snapshot.val();
      if (arr) {
        var guess = arr[arr.length - 1];
        db.ref(gameRef + "/playerBoats/").once("value", function (snapshot) {
          if (snapshot.val().includes(guess)) {
            //hit
            $("[data-coord=" + guess + "][data-player=player]").css("background-color", "rgba(100,40,40,0.6)");
            if (snapshot.val().every(e => arr.indexOf(e) > -1)) {
              console.log("cpu wins!");
              alert("CPU WINS!");
              $("#game-area-cpu").off("click", ".play-square");
              db.ref(gameRef + "/winner/").set("cpu");
              db.ref(gameRef).once("value", function (snapshot) {
                var gameData = snapshot.val();
                if (user !== "anon") {
                  $.post("/api/games", {
                    title: "game_" + gameID,
                    body: JSON.stringify(gameData),
                    UserId: user
                  }, function (data) {
                    console.log(data);
                  });
                }
              });
            }
          } else {
            //miss
            $("[data-coord=" + guess + "][data-player=player]").css("background-color", "rgba(10,10,10,0.8)");
          }
        });
      }
    });





  });


  //TODO: improve win screen
  //TODO: simple cpu AI




  // if (arr.data.cpuBoats.includes(guess)) {
  //   //hit
  //   $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(100,40,40,0.6)");
  //   hits++;
  //   console.log(hits);
  //   if (hits === 34) {
  //     alert("you win :)");
  //   }
  //   playerTurn = !playerTurn;
  //   if (!playerTurn) {
  //     cpuTurn();
  //   }
  // } else {
  //   //miss
  //   $("[data-coord=" + guess + "][data-player=cpu]").css("background-color", "rgba(10,10,10,0.8)");
  //   playerTurn = !playerTurn;
  //   if (!playerTurn) {
  //     cpuTurn();
  //   }
  // }
  // if (arr.data.guesses.cpu) {
  //   var cpuGuess = arr.data.guesses.cpu[arr.data.guesses.cpu.length - 1];
  //   if (arr.data.playerBoats.includes(cpuGuess)) {
  //     //hit
  //     cpuHits++;
  //     if (cpuHits === 34) {
  //       alert("you lose :(");
  //     }
  //     $("[data-coord=" + cpuGuess + "][data-player=player]").css("background-color", "rgba(100,40,40,0.6)");
  //   } else {
  //     //miss
  //     $("[data-coord=" + cpuGuess + "][data-player=player]").css("background-color", "rgba(10,10,10,0.8)");
  //   }
  // }

});
