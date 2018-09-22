//***************
//              *
// CONSTRUCTORS *
//              *
//***************/

/**
 * @description Creates a new player with name, board, and boats, various arrays for game data
 * @param {string} name
 * @param {array} boats
 * @param {array} board
 * @param {array} guesses
 */
var Player = function(name, boats, board, guesses) {
  this.name = name || "player";
  this.boats = boats || defaultBoats();
  this.allBoatCoords = [];
  this.board = board || createBoard(10, 10);
  this.guesses = guesses || [];
  this.validGuessCoords = [];
  this.placeBoat = function(boat, index) {
    var board = this.board;
    var row = index.row;
    var col = index.col;
    if (!boat.orientation) {
      for (var i = 0; i < boat.length; i++) {
        if (board[row][col + i] === undefined) {
          return false;
        } else if (board[row][col + i]) {
          return false;
        }
      }
      for (var i = 0; i < boat.length; i++) {
        board[row][col + i] = boat.abbr;
        boat.coord[i] = indexToCoord({ row: row, col: col + i });
        this.allBoatCoords.push(boat.coord[i]);
      }
      return true;
    } else if (boat.orientation) {
      for (var i = 0; i < boat.length; i++) {
        if (board[row + i] === undefined) {
          return false;
        } else if (board[row + i][col]) {
          return false;
        }
      }
      for (var i = 0; i < boat.length; i++) {
        board[row + i][col] = boat.abbr;
        boat.coord[i] = indexToCoord({ row: row + i, col: col });
        this.allBoatCoords.push(boat.coord[i]);
      }
      return true;
    }
  };
  this.checkGuess = function(index, board) {
    var row = index.row;
    var col = index.col;
    var hit = false;
    var invalid = false;
    var coord = indexToCoord(index);
    if (board[row] === undefined) {
      //checks for out of bounds guess
      hit = false;
      invalid = true;
      this.guesses.push({ hit: hit, invalid: invalid, coord: coord });
      return false;
    } else if (board[row][col] === "O" || board[row][col] === "X") {
      //checks for already guessed space
      hit = false;
      invalid = true;
      this.guesses.push({ hit: hit, invalid: invalid, coord: coord });
      return false;
    } else if (board[row][col] === null) {
      //checks for miss
      hit = false;
      invalid = false;
      this.guesses.push({ hit: hit, invalid: invalid, coord: coord });
      return this.makeGuess(index, board, hit);
    } else if (board[row][col]) {
      //checks for hits
      hit = true;
      invalid = false;
      this.guesses.push({ hit: hit, invalid: invalid, coord: coord });
      return this.makeGuess(index, board, hit);
    } else {
      //anything else is probably invalid
      hit = false;
      invalid = true;
      this.guesses.push({ hit: hit, invalid: invalid, coord: coord });
      return false;
    }
  };

  this.makeGuess = function(index, board, hit) {
    //only checks for hit/miss since checkGuess already does the bulk of it
    var row = index.row;
    var col = index.col;
    var coord = indexToCoord(index);
    this.validGuessCoords.push(coord);
    //changes the value at specified location and returns hit/miss and the coord. May need to work with this more in the future.
    if (hit) {
      board[row][col] = "X";
      return { hit: hit, coord: coord };
    } else {
      board[row][col] = "O";
      return { hit: hit, coord: coord };
    }
  };
};

/**
 * @description Boat contructor function which makes Boat object with length, name, abbreviation, orientation, and coordinates. Also sets up unused isSunk variable which may be useful in future.
 * @param {number} length Boat length
 * @param {string} name Boat name
 * @param {string} abbr Boat abbreviation
 * @param {boolean} orientation Boat orientation. 0 is horizontal, 1 is vertical.
 * @param {array} coord Boat coordinates. Stored as array of strings e.g. ["a1","a2","a3"]
 */
var Boat = function(length, name, abbr, orientation, coord) {
  this.length = length;
  this.name = name;
  this.abbr = abbr;
  this.orientation = orientation || 0;
  this.coord = coord || Array(length);
  this.isSunk = false;
};

// ********************
// *                  *
// *  GAME FUNCTIONS  *
// *                  *
// ********************

/**
 * @description Creates a "game board" as an array of arrays, default values all null.
 * @param {number} rows Number of rows in the array
 * @param {number} cols Number of columns in the array
 */
var createBoard = function(rows, cols) {
  var board = Array(rows);
  for (var col = 0; col < cols; col++) {
    board[col] = Array(cols).fill(null);
  }
  return board;
};

/**
 * @description translates coordinates e.g. "a3" to indeces e.g. {row: 0, col: 2}
 * @param {string} coord Coordinates to translate, in the form of of string i.e. single letter (default a-j), single number (defualt 1-10).
 * @returns {object} index object with properties row and col.
 */
var coordToIndex = function(coord) {
  if (coord) {
    var rowArr = "abcdefghijklmnopqrstuvwxyz".split("");
    var alpha = coord.charAt(0);
    var num = coord.slice(1) - 1;
    return {
      row: rowArr.indexOf(alpha),
      col: num
    };
  }
};
console.log(coordToIndex("c5"));

/**
 * @name indexToCoord
 * @description translates indeces e.g. {row: 0, col: 8} to coordinates e.g. "a9"
 * @param {object} index index object in the form {row: row, col: col}
 * @returns {string} coordinates translated from the index in form of string i.e. single letter single number e.g. "b5"
 */
var indexToCoord = function(index) {
  var rowArr = "abcdefghijklmnopqrstuvwxyz".split("");
  var alpha = rowArr[index.row];
  var num = parseInt(index.col) + 1;
  return alpha + num;
};

/**
 * @name rngIndex
 * @description generates random numerical coordinates
 * @returns {object} random index object in the form {row: row, col: col}
 */
var rngIndex = function() {
  var row = Math.floor(Math.random() * 10);
  var col = Math.floor(Math.random() * 10);
  return { row: row, col: col };
};

/**
 * @name defaultBoats
 * @description generates default array of boats as used in original battleship game
 * @returns {array} array of 5 boats: Aircraft Carrier "A" length: 5, etc.
 */
var defaultBoats = function() {
  return [
    new Boat(5, "Aircraft Carrier", "A", Math.floor(Math.random() * 2)),
    new Boat(4, "Battleship", "B", Math.floor(Math.random() * 2)),
    new Boat(3, "Submarine", "S", Math.floor(Math.random() * 2)),
    new Boat(3, "Cruiser", "C", Math.floor(Math.random() * 2)),
    new Boat(2, "Destroyer", "D", Math.floor(Math.random() * 2))
  ];
};
//SIMULATION//

//player creation
var player1 = new Player("phil");
var player2 = new Player("cpu");

//placing boats pregame
player1.boats.forEach(function(boat) {
  while (!player1.placeBoat(boat, rngIndex())) {
    continue;
  }
});
player2.boats.forEach(function(boat) {
  while (!player2.placeBoat(boat, rngIndex())) {
    continue;
  }
});

//making guesses
var winner = false;
var playTurn = function(input) {
  //This function takes an input, but if it is invalid it recurses with a random guess. In the future it may be useful
  //to separate the player and cpu turn in order to recurse or prematurely end the player turn when an invalid guess is
  //made so the game can prompt the user for more input.
  if (winner) {
    return;
  }
  var guess = player1.checkGuess(input, player2.board);
  if (!guess) {
    playTurn(rngIndex());
  } else if (guess.hit) {
    var winCondition1 = player2.allBoatCoords.every(function(elem) {
      return player1.validGuessCoords.indexOf(elem) > -1;
    });
    if (winCondition1) {
      winner = player1;
      return;
    }
  }
  var cpuGuess = rngGuess();
  if (cpuGuess.hit) {
    var winCondition2 = player1.allBoatCoords.every(function(elem) {
      return player2.validGuessCoords.indexOf(elem) > -1;
    });
    if (winCondition2) {
      winner = player2;
      return;
    }
  }
};
var rngGuess = function() {
  var guess = player2.checkGuess(rngIndex(), player1.board);
  if (guess.invalid) {
    guess = rngGuess();
  } else {
    return guess;
  }
};

//simulate game running with 2 players guessing randomly until a winner is found, limit 100 turns.
var i = 0;
while (i < 100) {
  playTurn(rngIndex());
  i++;
}
console.log(player1);
