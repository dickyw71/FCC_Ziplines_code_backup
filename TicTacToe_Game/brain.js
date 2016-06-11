var winningLines = [
  ['0', '1', '2'],
  ['3', '4', '5'],
  ['6', '7', '8'],
  ['0', '3', '6'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['0', '4', '8'],
  ['2', '4', '6']
]

var grid = [{
  num: '0',
  rank: 3,
  value: ''
}, {
  num: '1',
  rank: 2,
  value: 'X'
}, {
  num: '2',
  rank: 3,
  value: 'X'
}, {
  num: '3',
  rank: 2,
  value: 'O'
}, {
  num: '4',
  rank: 4,
  value: 'O'
}, {
  num: '5',
  rank: 2,
  value: ''
}, {
  num: '6',
  rank: 3,
  value: ''
}, {
  num: '7',
  rank: 2,
  value: ''
}, {
  num: '8',
  rank: 3,
  value: ''
}]

// console.log(winningLines.filter(array => array.find(ele => ele === '3')))
// // Choose a potential winning line
// // filter highest ranked empty square
// console.log(grid.filter(obj => obj.value === '' && obj.rank >= 3))

function checkWinningLine(winLine, gridVal, player) {
  let tally = {}
  winLine.forEach(number => {
    if (!tally.hasOwnProperty(gridVal[number])) tally[gridVal[number]] = 1
    else tally[gridVal[number]] += 1
  })
  console.log(player, winLine, JSON.stringify(tally))
  if (tally[player] === 2 && tally[''] === 1) {
    let num = null
    winLine.forEach(number => {
      if (gridVal[number] === '') num = number
    })

    return num
  } else return null
}
// const gridValues = grid.map(obj => obj.value)
// const player = 'O'
// winningLines.forEach(line => {
//   let winningMove = checkWinningLine(line, gridValues, player)
//   if(winningMove) {
//     console.log(winningMove, 'is winning move for player', player)
//   }
// })

bestMove(winningLines, grid, 'X')
  //const gridScores = grid.filter(obj => obj.value === '') 
function bestMove(winLines, grid, player) {
  // Make a line or block opponents line
  const gridValues = grid.map(obj => obj.value)
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

  console.log('Winning move:', winningMove)
  console.log('Blocking move:', blockingMove)
}

function blockOpponentMove(winLine, gridVal, player) {

  // checkWinningLine for opponent
  // then make blocking move
}