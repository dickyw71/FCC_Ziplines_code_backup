const winningLines = [
  ['0', '4', '8'],
  ['2', '4', '6'],
  ['3', '4', '5'],
  ['1', '4', '7'],
  ['0', '1', '2'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['2', '5', '8']
]

var grid = [{ num: '0', rank: 3, value: 'E'},  { num: '1', rank: 2, value: 'E'},  { num: '2', rank: 3, value: 'E'}, 
            { num: '3', rank: 2, value: 'E'}, { num: '4', rank: 4, value: 'O'}, { num: '5', rank: 2, value: 'E'}, 
            { num: '6', rank: 3, value: 'E'},  { num: '7', rank: 2, value: 'E'}, { num: '8', rank: 3, value: 'E'}]

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
  console.log(winLine, gridVal, tally)
  if((tally['E'] === 2) && (tally[player] === 1)){
    return winLine.find(number => gridVal[number] === 'E')
  }
}

function checkWinningLine(winLine, gridVal, player) {
  let tally = tallyLine(winLine, gridVal)
  if ((tally[player] === 2) && (tally['E'] === 1)) {
    console.log(winLine, gridVal, tally)
    return winLine.find(number => gridVal[number] === 'E')
  } 
}

bestMove(winningLines, grid, 'O')
function bestMove(winLines, grid, player) {
  // Make a line or block opponents line
  const gridValues = grid.map(obj => obj.value)
  console.log(player)
  let winningMove = null
  let blockingMove = null
    // check for winning move
  winLines.find(winLine => {
    return winningMove = checkWinningLine(winLine, gridValues, player)
  })
    // block opponents winning move
  winLines.find(winLine => {
    let opponent = (player === 'X' ? 'O' : 'X')
    return blockingMove = checkWinningLine(winLine, gridValues, opponent)
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
