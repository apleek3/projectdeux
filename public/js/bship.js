/* <script src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js"></script>
  <script>
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
</script> */

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
  arr.forEach(function(e, i, a) {
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
 */
function generateBoard(rows, cols) {
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
  board.find(".col-label").each(function(index) {
    $(this).append($("<p>").text(colArr[index]));
  });
  board.find(".row-label").each(function(index) {
    $(this).append($("<p>").text(rowArr[index]));
  });
  board.find(".play-square").each(function(index) {
    var numCoord = colArr[Math.floor(index / 10)];
    var abcCoord = rowArr[index % 10];
    this.setAttribute("data-coord", abcCoord + numCoord);

    $(this).on("click", function() {
      if (boat) {
        console.log("boat!");
      }
      //TODO: communicate with database via post request or firebase connection
      // $.post("/api/"+this.dataset.coord, function(res) {
      //     console.log(res);
      // });
    });
  });
  return board;
}
var boat = false;
var boatLength = 4;
$(document).ready(function() {
  //everything below this is pretty rough.
  $("body").append(generateBoard(10, 10));
  var btn = $("<button type='button' class='btn btn-primary'>").text("button");
  btn.on("click", function() {
    boat = !boat;
  });
  var div = $("<div>").addClass("button-div");
  div.append(btn);
  $("body").append(div);
  $(".play-square").hover(function(e) {
    var arr = $(".play-square");
    var index = arr.index(this);
    if (boat) {
      if (index < 100 - (boatLength - 1) * 10) {
        arr = arr.slice(index, index + 40);
        arr.splice(1, 9);
        arr.splice(2, 9);
        arr.splice(3, 9);
        arr.splice(4, 9);
        $(arr).css("background-color", function() {
          if (e.type === "mouseenter") {
            return "rgb(30,30,150,0.4)";
          } else if (e.type === "mouseleave") {
            return "lightgray";
          }
        });
      }
    } else {
      if (index % 10 <= 10 - boatLength) {
        $(arr.slice(index, index + 4)).css("background-color", function() {
          if (e.type === "mouseenter") {
            return "rgb(30,30,150,0.4)";
          } else if (e.type === "mouseleave") {
            return "lightgray";
          }
        });
      }
    }
  });
});
