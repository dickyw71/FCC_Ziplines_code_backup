let stepCount = 0
let steps = []
let state = 'OFF'
let playerButtons = []
let strictMode = false
let beforeStepTimerID = null
let afterStepTimerID = null
const beforeStepPause = 500 // milliseconds
const stepDuration = 1000   // milliseconds
const buttonColours = ['RED', 'GREEN', 'BLUE', 'YELLOW']
const maxSteps = 20
const simonSound = {
  'RED': '1',
  'YELLOW': '2',
  'GREEN': '3',
  'BLUE': '4'
}

function init() {
  stepCount = 0
  steps = []
  state = 'OFF'
  playerButtons.length = 0
  strictMode = false
  displayText.innerHTML = '--'
}

function turnSimonOff() {
  init()
  powerDown()
}

function turnSimonOn() {
  state = 'READY'
}

function strict(setting) {
  if (state !== 'OFF') {
    strictMode = setting
  }
}

function startSimonGame() {
  if (state === 'READY') {
    state = 'PLAYING'
    playerButtons.length = 0
    incrementSteps()
    playSequence(0)
  } else {
    restartSimonGame()
  }
}

function restartSimonGame() {
  if (state === 'PLAYING') {
    init()
    turnSimonOn()
    startSimonGame()
  }
}

function incrementSteps() {
  steps.push(buttonColours[getRandomInt(0, buttonColours.length)])
  stepCount = steps.length
  console.log(steps)
  displayText.innerHTML = ('0' + stepCount).slice(-2)
    // play button press sequence  

  // add the button event listeners

}

function playSequence(index) {

  //removeButtonClickHandlers()

  if (index < steps.length) {
    playStep(steps[index], index)
  } else {
    window.clearTimeout(afterStepTimerID)
    window.clearTimeout(beforeStepTimerID)
    //addButtonClickHandlers()
  }
}

function playStep(colour, index) {
  
    turnOnButton(colour)  
    afterStepTimerID = window.setTimeout(turnOffButton, stepDuration, colour, index)  
}

function turnOnButton(colour) {
  switch (colour) {
    case 'RED':
      pressRed()
      break;
    case 'BLUE':
      pressBlue()
      break;
    case 'YELLOW':
      pressYellow()
      break;
    case 'GREEN':
      pressGreen()
      break;
  }
}

function turnOffButton(colour, index) {
  switch (colour) {
    case 'RED':
      releaseRed()
      break;
    case 'BLUE':
      releaseBlue()
      break;
    case 'YELLOW':
      releaseYellow()
      break;
    case 'GREEN':
      releaseGreen()
      break;
  }
  beforeStepTimerID = window.setTimeout(playSequence, beforeStepPause, (index + 1))
}

function buttonPress(colour) {
  console.log(colour)
  playerButtons.push(colour)
  console.log(playerButtons.length)
  if (checkPlayerButtonsMatchSimonsSteps()) {
    if (playerButtons.length === steps.length) {
      playerButtons.length = 0 // empty the array

      if (stepCount !== maxSteps) {
        incrementSteps()
        playSequence(0)
      } else {
        console.log('Victory!')
        restartSimonGame()
      }
    }
  } else {
    // play error sound
    console.log('Error!')
    playerButtons.length = 0 // empty the array
    playSequence(0)
    if (strictMode) {
      console.log('Starting again')
      restartSimonGame()

    }
  }
}

function checkPlayerButtonsMatchSimonsSteps() {
  return playerButtons.every(function(button, index) {
    return button === steps[index]
  })
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function powerDown() {
  // turn strict lamp off
  strictLamp.setAttribute('fill', 'black')

  // turn count display off
}

// create variables for display elements and add event listeners
var powerCtrl = document.getElementById('power');
var powerSwitch = document.getElementById('powerSwitch')
powerCtrl.addEventListener('click', switchPower, false)

var strictBtn = document.getElementById('strictBtn')
var strictLamp = document.getElementById('strictLamp')
strictBtn.addEventListener('click', toggleStrict, false)

var displayText = document.getElementById('displayText')

var startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', startSimonGame, false)

var greenBtn = document.getElementById('greenBtn')
var redBtn = document.getElementById('redBtn')
var blueBtn = document.getElementById('blueBtn')
var yellowBtn = document.getElementById('yellowBtn')

function addButtonClickHandlers() {
  greenBtn.addEventListener('click', buttonPress('GREEN'), false)
  redBtn.addEventListener('click', buttonPress('RED'), false)
  blueBtn.addEventListener('click', buttonPress('BLUE'), false)
  yellowBtn.addEventListener('click', buttonPress('YELLOW'), false)
}

function removeButtonClickHandlers() {
  greenBtn.removeEventListener('click', buttonPress)
  redBtn.removeEventListener('click', buttonPress)
  blueBtn.removeEventListener('click', buttonPress)
  yellowBtn.removeEventListener('click', buttonPress)
}

function switchPower() {
  if (state == 'OFF') {
    turnSimonOn()
    if (powerSwitch.getAttribute('x') == '580') {
      powerSwitch.setAttribute('x', '602')
    }
    displayText.setAttribute('fill', '#E60000')
  } else {
    turnSimonOff()
    powerSwitch.setAttribute('x', '580')
    displayText.setAttribute('fill', '#330000')
  }
}

function toggleStrict() {
  if (strictMode) {
    strict(false)
    strictLamp.setAttribute('fill', 'black')
  } else {
    strict(true)
    if (strictMode) {
      strictLamp.setAttribute('fill', 'red')
    }
  }
}

// event listeners that light-up the colour buttons when pressed
greenBtn.addEventListener('mousedown', pressGreen, false)
greenBtn.addEventListener('mouseup', releaseGreen, false)
redBtn.addEventListener('mousedown', pressRed, false)
redBtn.addEventListener('mouseup', releaseRed, false)
blueBtn.addEventListener('mousedown', pressBlue, false)
blueBtn.addEventListener('mouseup', releaseBlue, false)
yellowBtn.addEventListener('mousedown', pressYellow, false)
yellowBtn.addEventListener('mouseup', releaseYellow, false)

function pressGreen() {
  greenBtn.setAttribute('fill', '#00FF00')
}

function releaseGreen() {
  greenBtn.setAttribute('fill', '#009900')
}

function pressRed() {
  redBtn.setAttribute('fill', '#FF0000')
}

function releaseRed() {
  redBtn.setAttribute('fill', '#990000')
}

function pressBlue() {
  blueBtn.setAttribute('fill', '#0000FF')
}

function releaseBlue() {
  blueBtn.setAttribute('fill', '#000099')
}

function pressYellow() {
  yellowBtn.setAttribute('fill', '#FFFF00')
}

function releaseYellow() {
  yellowBtn.setAttribute('fill', '#E6E600')
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  switch(keyName) {
    case "b":
      buttonPress('BLUE')
      break
      case "r":
      buttonPress('RED')
      break
      case "y":
      buttonPress('YELLOW')
      break
      case 'g':
      buttonPress('GREEN')
      break
  }
  
}, false)
