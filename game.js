function gameMatrix() {
  var m = [];
  for (var i = 0; i<3; i++){
    m.push([0, 0, 0]);
  }

  return m;
}

var draw = false;
var tableGame = gameMatrix();
console.log(tableGame);

var player = '';
var gameOver = false;
var playerTurn = 0;

var cells = document.querySelectorAll(".cell");

document.querySelector(".btn").addEventListener("click", function() {
  restart();
  gameStart();
  status();
  this.textContent = "Restart";
});

function status() {
  if (playerTurn % 2 === 0) {
    document.querySelector(".game-status").textContent="O's turn"
  } else {
    document.querySelector(".game-status").textContent="X's turn"
  }
}

function gameStart() {
  for (var i = 0; i < 9; i++) {
    cells[i].addEventListener("click", game);   // event click, function = game()
  }
}

function restart() {
  tableGame = gameMatrix();
  playerTurn = 0;
  gameOver = false;
  var cells = document.querySelectorAll(".cell");
  for (var i = 0; i<cells.length; i++) {
    cells[i].textContent = "";
  }
}

function game() {
  if (!gameOver) {
    var matrixNumber = this.getAttribute("class");
    matrixNumber = matrixNumber.slice(8);
    var firstMatrix = Number(matrixNumber[0]); // table game[first][second]
    var secondMatrix = Number(matrixNumber[1]);

    if (playerTurn % 2 === 0) {
      document.querySelector(".game-status").textContent="X's turn"
      playerChoose('O', firstMatrix, secondMatrix, this);
    } else {
      document.querySelector(".game-status").textContent="O's turn"
      playerChoose('X', firstMatrix, secondMatrix, this);
    }

  } else {
    console.log("gameOver");
  }
}

function playerChoose(player, number1, number2, cellTag) {
  if (tableGame[number1][number2] == 0) {
    tableGame[number1][number2] = player;

    checkAnswer(number1, number2, player);
    // console.log(cellTag);
    draw = checkDraw();
    if (draw) {
      gameOver = true;
    }
    cellTag.textContent = player;
    playerTurn++;
  } else {
    console.log(tableGame);
    console.log("Already taken");
  }
}

function checkAnswer(row, col, player) {
  var diag = 0;

  if ((row == col) || (row + col == 2)){
    diag = diagAnswer(row, col, player);
  }
  if (rowAnswer(row, player) == 3 || colAnswer(col, player) == 3 || diag == 3) {
    console.log("game: "+player);
    gameOver = true;
    document.querySelector(".game-status").textContent=(player+" WIN!!!")
  }
}

function rowAnswer(row, player) {
  var point = 0;

  for (i = 0; i<3; i++) {
    if (tableGame[row][i] == player) {
      point++;
    }
  }

  return point;
}

function colAnswer(col, player) {
  var point = 0;
  //console.log(row);
  for (i = 0; i<3; i++) {
    if (tableGame[i][col] == player) {
      point++;
    }
  }

  return point;
}

function diagAnswer(row, col, player) {
  var point = 0;
  if (row == col) {
    for (var index = 0; index < 3; index++) {
      if (tableGame[index][index] == player) {
        point++;
      }
    }
  } else {
    var i = 0;
    var j = 2;
    for (var index = 0; index < 3; index++) {
      if (tableGame[i][j] == player) {
        point++;
      }
      i++;
      j--;
    }
  }

  return point;
}

function checkDraw() {
  for (var i = 0; i<tableGame.length; i++) {
    for (var j = 0; j<tableGame[0].length; j++) {
      if (tableGame[i][j] == 0) {
        return false;
      }
    }
  }
  document.getElementsByClassName("game-status")[0].textContent="DRAW~~~"
  return true;
}

















// final
