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
    // start game
    startGame();
  });

  $('#game').click(function(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // Find the game square
    if (x <= this.width / 3) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(52, 52);
        ticTacToe.setGridLocation(0, 0);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(52, 152);
        ticTacToe.setGridLocation(1, 0);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(52, 252);
        ticTacToe.setGridLocation(2, 0);
      }
    }
    if ((this.width / 3 < x) && (x <= (this.width / 3) * 2)) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(152, 52);
        ticTacToe.setGridLocation(0, 1);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(152, 152);
        ticTacToe.setGridLocation(1, 1);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(152, 252);
        ticTacToe.setGridLocation(2, 1);
      }
    }
    if ((((this.width / 3) * 2) < x) && (x <= this.width)) {
      if (y <= this.height / 3) {
        ticTacToe.setPosition(252, 52);
        ticTacToe.setGridLocation(0, 2);
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        ticTacToe.setPosition(252, 152);
        ticTacToe.setGridLocation(1, 2);
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        ticTacToe.setPosition(252, 252);
        ticTacToe.setGridLocation(2, 2);
      }
    }
    ticTacToe.takeTurn();
    ticTacToe.checkForGameOver();
    
    // Computers turn
     timerId = window.setTimeout(chooseMove, 500);
  });
});

function clearGame() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ticTacToe.game[i][j] = '';
    }
  }
}

function startGame() {
  // User or Computer goes first?
  // Computer starts 
  if(ticTacToe.computersTurn) {
    ticTacToe.computersTurn = false;
    var space = ticTacToe.grid.find(square => square.num === '4' );
    ticTacToe.setPosition(space.coords[0], space.coords[1]);
    ticTacToe.setGridLocation(space.row, space.col)
    ticTacToe.takeTurn();
  }
  else {
    ticTacToe.computersTurn = true;
  }
}

function chooseMove() {
  console.log('in chooseMove');
  // choose free square with best probability of making a winning line 
  var freeSquare = ticTacToe.grid.find(square => square.value === '');
  console.log(freeSquare);
  ticTacToe.setPosition(freeSquare.coords[0], freeSquare.coords[1]);
  ticTacToe.setGridLocation(freeSquare.pos[0], freeSquare.pos[1]); 
  window.clearTimeout(timerId);
  console.log('Row: ' + ticTacToe.row);
  console.log('Column: ' + ticTacToe.col);
  ticTacToe.takeTurn();
}

function isPositionFree(square) {
  // Look-up square row and column
  // getRow(square) getColumn(square)
  //ticTacToe.grid.find(square => ) 
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
  "computersTurn": true,
  "x": 0,
  "y": 0,
  "row": 0,
  "col": 0,
  "side": 'X',
  "grid": [{num:'0', row:'0', col:'0', pos:[0,0], coords:[52,52], score:'3', value:''}, 
           {num:'1', row:'0', col:'1', pos:[0,1], coords:[152,52], score:'2', value:''}, 
           {num:'2', row:'0', col:'2', pos:[0,2], coords:[252,52], score:'3', value:''},
           {num:'3', row:'1', col:'0', pos:[1,0], coords:[52,152], score:'2', value:''}, 
           {num:'4', row:'1', col:'1', pos:[1,1], coords:[152,152], score:'4', value:''}, 
           {num:'5', row:'1', col:'2', pos:[1,2], coords:[252,152], score:'2', value:''},
           {num:'6', row:'2', col:'0', pos:[2,0], coords:[52,252], score:'3', value:''}, 
           {num:'7', row:'2', col:'1', pos:[2,1], coords:[152,252], score:'2', value:''}, 
           {num:'8', row:'2', col:'2', pos:[2,2], coords:[252,252], score:'3', value:''}],
  "winningLines": [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ],
  // "preferredSquares": [ {4:[4]}, {3:[0,2,6,8]}, {2:[1,3,5,7]} ], 
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
  "setGridValue": function() {
    console.log('set Grid Value Row: ' + this.row);
    console.log('set Grid Value Column: ' + this.col);
    var gridSquare = this.grid.find(square => ((square.row === this.row) && (square.col === this.col)))
    if (gridSquare) {
      gridSquare.value = this.side;
    }
    else {
      console.log('square not found');
    }
  },
  "takeTurn": function() {
    //  where position is a free space on the game board
    // validate position
    if ((this.row >= 0) && (this.row < 3) &&
      (this.col >= 0) && (this.col < 3)) {
      // is valid board position and is a free position in this game
      if (this.game[this.row][this.col] === '') {
        // set grid value
        this.setGridValue();
        this.game[this.row][this.col] = this.side;
        if (this.side === 'X') {
          drawCross(this.x, this.y);
          this.side = 'O';
        } else {
          drawCircle(this.x, this.y);
          this.side = 'X';
        }
        console.log(this.grid);
      }
      else {
        console.log('square is taken');
      }
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