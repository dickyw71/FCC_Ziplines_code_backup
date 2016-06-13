$(document).ready(function() {

  // draw the game grid
  drawGameGrid();

  $('ul').click(function() {
    if (!ticTacToe.playing) {
      $('p').slideUp();
      $('li').show();
    }
  });

  // choose X or O
  $('li').click(function() {
      // get li id
      if ($(this).is('#O')) {
        // User Plays O's (naughts)
        console.log('User chose O');
      } else {
        ticTacToe.computerPlaysXs = false;
        ticTacToe.computersTurn = false;
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
    let row = null
    let col = null
    // Find the game square
    if (x <= this.width / 3) {
      if (y <= this.height / 3) {
        row = 0
        col = 0
     } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        row = 1
        col = 0
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        row = 2
        col = 0
      }
    }
    if ((this.width / 3 < x) && (x <= (this.width / 3) * 2)) {
      if (y <= this.height / 3) {
        row = 0
        col = 1
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        row = 1
        col = 1
       } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        row = 2
        col = 1
      }
    }
    if ((((this.width / 3) * 2) < x) && (x <= this.width)) {
      if (y <= this.height / 3) {
        row = 0
        col = 2
      } else if ((this.height / 3 < y) && (y <= (this.height / 3) * 2)) {
        row = 1
        col = 2
      } else if ((((this.height / 3) * 2) < y) && (y < this.height)) {
        row = 2
        col = 2
      }
    }

    ticTacToe.takeTurn(row, col);
    ticTacToe.checkForGameOver();

    // Computers turn
    timerId = window.setTimeout(chooseMove, 500);
  });
});

function clearGame() {
  // clear the value of all squares in the grid
  ticTacToe.grid.forEach(curr => curr.value = '');
  console.log("clear grid: " + ticTacToe.grid);
  // restart game
  startGame();
}

function startGame() {
  ticTacToe.playing = true;
  // User or Computer goes first?
  // Computer starts 
  if (ticTacToe.computersTurn) {
    ticTacToe.computersTurn = false;
    ticTacToe.takeTurn(1,1);
  } else {
    ticTacToe.computersTurn = true;
  }
}

function tallyLine(winLine, gridVal) {
  let tally = {}
  winLine.forEach(number => {
    if (!tally.hasOwnProperty(gridVal[number])) tally[gridVal[number]] = 1
    else tally[gridVal[number]] += 1
  })
  return tally
}

function nextMove(winLine, gridVal, player) {
  let tally = tallyLine(winLine, gridVal)
  if((tally[player] === 1  && tally[''] === 2 ) || (tally[''] === 3) || (tally[''] === 1)) {
    console.log(winLine, gridVal, tally)
    return winLine.find(number => gridVal[number] === '')
  }
}

function checkForWinningMove(winLine, gridVal, player) {
  let tally = tallyLine(winLine, gridVal)
  if (tally[player] === 2 && tally[''] === 1) {
    console.log(winLine, gridVal, tally)
    return winLine.find(number => gridVal[number] === '')
  } 
}

function bestMove(winLines, grid, player) {
  console.log(player)
  // Make a line or block opponents line
  const gridValues = grid.map(obj => obj.value)
  let winningMove = null
  let blockingMove = null
    // check for winning move
  winLines.find(winLine => {
    return winningMove = checkForWinningMove(winLine, gridValues, player)
  })
    // block opponents winning move
  winLines.find(winLine => {
    let opponent = (player === 'X' ? 'O' : 'X')
    return blockingMove = checkForWinningMove(winLine, gridValues, opponent)
  })

  // find next move
  let move = null
    winLines.find(winLine => {
      return move = nextMove(winLine, gridValues, player)
    })
      
  console.log('Winning move:', winningMove)
  console.log('Blocking move:', blockingMove)
  console.log('Next move:', move)
  
  if(winningMove)
    return winningMove
  if(blockingMove)
    return blockingMove
  if(move)
    return move
  else
    return null
}

function chooseMove() {

  let num = bestMove(ticTacToe.winningLines, 
                     ticTacToe.grid, 
                     ticTacToe.side)
  
  var freeSquare = ticTacToe.grid.find(square => square.num === num);
  
  // find a square that will make a winning line
  if (freeSquare) {
    window.clearTimeout(timerId);
    ticTacToe.takeTurn(freeSquare.row, freeSquare.col);
    ticTacToe.checkForGameOver();
  } else {
    console.log("no free squares left");
  }
}

function isPositionFree(square) {
  // Look-up square row and column
  // getRow(square) getColumn(square)
  //ticTacToe.grid.find(square => ) 
}

function drawGameGrid() {
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

function drawCircleAtPoint(x, y) {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  // Draw a Circle centred on point x,y
  ctx.beginPath();
  ctx.strokeStyle = "rgb(200,200,0)";
  ctx.lineWidth = 5;
  ctx.arc(x, y, 35, 0, Math.PI * 2, true);
  ctx.stroke();
}

function drawCrossAtPoint(x, y) {
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

function hasWinningLine() {
  const gridValues = ticTacToe.grid.map(obj => obj.value)
  console.log(gridValues)
  return ticTacToe.winningLines.find(winLine => {
    let tally = tallyLine(winLine, gridValues)
    if(tally['X'] === 3)
      return true
  })    
}

var ticTacToe = {
  "computerPlaysXs": true,
  "computersTurn": true,
  "side": 'X',
  "grid": [{
    num: 0,
    row: 0,
    col: 0,
    xcoord: 52,
    ycoord: 52,
    score: 3,
    value: ''
  }, {
    num: 1,
    row: 0,
    col: 1,
    xcoord: 152,
    ycoord: 52,
    score: 2,
    value: ''
  }, {
    num: 2,
    row: 0,
    col: 2,
    xcoord: 252,
    ycoord: 52,
    score: 3,
    value: ''
  }, {
    num: 3,
    row: 1,
    col: 0,
    xcoord: 52,
    ycoord: 152,
    score: 2,
    value: ''
  }, {
    num: 4,
    row: 1,
    col: 1,
    xcoord: 152,
    ycoord: 152,
    score: 4,
    value: ''
  }, {
    num: 5,
    row: 1,
    col: 2,
    xcoord: 252,
    ycoord: 152,
    score: 2,
    value: ''
  }, {
    num: 6,
    row: 2,
    col: 0,
    xcoord: 52,
    ycoord: 252,
    score: 3,
    value: ''
  }, {
    num: 7,
    row: 2,
    col: 1,
    xcoord: 152,
    ycoord: 252,
    score: 2,
    value: ''
  }, {
    num: 8,
    row: 2,
    col: 2,
    xcoord: 252,
    ycoord: 252,
    score: 3,
    value: ''
  }],
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
  "playing": false,
  "timerId": null,
  "takeTurn": function(row, col) {
    //  where position is a free space on the game board
    let square = this.grid.find(x => (x.row === row && x.col === col))
    if (square.value === '') {
        // set grid value
        square.value = this.side
        if (this.side === 'X') {
          drawCrossAtPoint(square.xcoord, square.ycoord)
          this.side = 'O'
        } else {
          drawCircleAtPoint(square.xcoord, square.ycoord)
          this.side = 'X'
        }
        console.log(this.grid)
    } else {
      console.log('square is taken')
    }
  },
  "checkForGameOver": function() {
    // Either all squares are filled
    var hasBlankSquare = this.grid.some(a => a.value === '')
    if (!hasBlankSquare || hasWinningLine())  {
      console.log('Game Over')
      // reset game grid
      timerId = window.setTimeout(this.resetGame, 1500)
    }
  },
  "resetGame": function() {
    playing = false
    drawGameGrid()
    clearGame()
    window.clearTimeout(timerId)
  }
}