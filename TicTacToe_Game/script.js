$(document).ready(function() {

  // start game
  drawGrid();

  $('ul').click(function() {
    $('p').slideUp();
    $('li').show();
  });

  // choose X or O
  $('li').click(function() {
    // get li id
    if ($(this).is('#O')) {
      // User Plays O's (naughts)
      console.log('User chose O');
    } else {
      ticTacToe.computerPlaysXs = false;
      console.log('User chose X');
    }
    $('li').slideUp();
    $('#game').show();
  });

  $('#game').click(function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // Find the game square
    if (x <= this.width / 3) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(52, 52);
        ticTacToe.setGridLocation(0,0);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(52, 152);
        ticTacToe.setGridLocation(1,0);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(52, 252);
        ticTacToe.setGridLocation(2,0);
      }
    }
    if ((this.width / 3 < x) && (x <= (this.width / 3) * 2)) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(152, 52);
        ticTacToe.setGridLocation(0,1);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(152, 152);
        ticTacToe.setGridLocation(1,1);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(152, 252);
        ticTacToe.setGridLocation(2,1);
      }
    }
    if ((((this.width / 3) * 2) < x) && (x <= this.width)) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(252, 52);
        ticTacToe.setGridLocation(0,2);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(252, 152);
        ticTacToe.setGridLocation(1,2);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(252, 252);
        ticTacToe.setGridLocation(2,2);
      }
    }
    ticTacToe.takeTurn();
    ticTacToe.checkForGameOver();
  });
});

function clearGame() {
    for (var i=0; i<3; i++) {
      for (var j=0; j<3; j++) {
        ticTacToe.game[i][j] = '';
      }
    }
}

function drawGrid() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw game grid
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(10, 100, 280, 5);
  ctx.fillRect(10, 200, 280, 5);
  ctx.fillRect(100, 10, 5, 280);
  ctx.fillRect(200, 10, 5, 280);
}

function drawCircle(x, y) {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  // Draw a Circle centred on point x,y
  ctx.beginPath();
  ctx.strokeStyle = "rgb(200,200,0)";
  ctx.lineWidth = 5;
  ctx.arc(x, y, 35, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawCross(x, y) {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const n = 32;
  // Draw a Cross centred on x,y
  ctx.beginPath();
  ctx.strokeStyle = "rgb(000,200,200)";
  ctx.lineWidth = 5;
  ctx.moveTo(x - n, y - n); //  x-32, y-32
  ctx.lineTo(x + n, y + n); //  x+32, y+32
  ctx.moveTo(x + n, y - n); // x+32, y-32
  ctx.lineTo(x - n, y + n); // x-32, y+32
  ctx.stroke();
}

var ticTacToe = {
  players: 0,
  "computerPlaysXs": true,
  "x": 0,
  "y": 0,
  "row":0,
  "col":0,
  "side": 'X',
  "grid": [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  "winningLines": [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],
  "game": [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  "gameOver": false,
  "timerId": null,
  
  "setPosition": function(x, y) {
    this.x = x;
    this.y = y;
  },
  "setGridLocation": function(row, col) {
    this.row = row;
    this.col = col;
  },
  "takeTurn": function() {
    //  where position is a free space on the game board
    // validate position
    if ((this.row >= 0) && (this.row < 3) &&
      (this.col >= 0) && (this.col < 3)) {
      // is valid board position and is a free position in this game
      if (this.game[this.row][this.col] === '') {
        this.game[this.row][this.col] = this.side;
      }
    }
    if(this.side === 'X') {
      drawCross(this.x, this.y);
      this.side = 'O';
    }
    else {
      drawCircle(this.x, this.y);
      this.side = 'X';
    }  
  },
  "checkForGameOver": function() {
    // Either all squares are filled
    var hasBlankSquare = this.game.reduce((a, b) => a.concat(b)).includes('');
    if (hasBlankSquare === false) {
      console.log('Game Over');
      // reset game grid
      timerId = window.setTimeout(this.resetGame, 1500);
    }
    // OR there is a winning line
  },
  "checkForAWinner": function() {

  },

  "hasWinningLine": function() {

  },
  "resetGame": function() {
    drawGrid();
    clearGame();
    window.clearTimeout(timerId);
  }

};