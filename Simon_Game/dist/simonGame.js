let stepCount = 0
let steps = []
let state = 'OFF'
let playerButtons = []
let strictMode = false
let beforeStepTimerID = null
let afterStepTimerID = null
const beforeStepPause = 400 // milliseconds
const stepDuration = 600   // milliseconds
const buttonColours = ['RED', 'GREEN', 'BLUE', 'YELLOW']
const maxSteps = 20
const simonSound = {
  'BLUE': '1',
  'YELLOW': '2',
  'RED': '3',
  'GREEN': '4'
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
}

function playSequence(index) {

  displayText.innerHTML = ('0' + stepCount).slice(-2)
  removeButtonClickHandlers()

  if (index < steps.length) {
    playStep(steps[index], index)
  } else {
    window.clearTimeout(afterStepTimerID)
    window.clearTimeout(beforeStepTimerID)  
    addButtonClickHandlers()
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
        beforeStepTimerID = window.setTimeout(playSequence, 1500, 0)
      } else {
        console.log('Victory!')
        displayText.innerHTML = '😎'
        beforeStepTimerID = window.setTimeout(restartSimonGame, 2500)
      }
    }
  } else {
    // play error sound
    console.log('Error!')
    displayText.innerHTML = '!!'
    playerButtons.length = 0 // empty the array
    beforeStepTimerID = window.setTimeout(playSequence, 1500, 0)
    if (strictMode) {
      console.log('Starting again')
      beforeStepTimerID = window.setTimeout(restartSimonGame, 1500)
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
  // event listeners that light-up the colour buttons when pressed
  greenBtn.addEventListener('mousedown', mousedownGreen, false)
  greenBtn.addEventListener('mouseup', mouseupGreen, false)
  redBtn.addEventListener('mousedown', mousedownRed, false)
  redBtn.addEventListener('mouseup', mouseupRed, false)
  blueBtn.addEventListener('mousedown', mousedownBlue, false)
  blueBtn.addEventListener('mouseup', mouseupBlue, false)
  yellowBtn.addEventListener('mousedown', mousedownYellow, false)
  yellowBtn.addEventListener('mouseup', mouseupYellow, false)
}

function removeButtonClickHandlers() {
  greenBtn.removeEventListener('mousedown', mousedownGreen)
  greenBtn.removeEventListener('mouseup', mouseupGreen)
  redBtn.removeEventListener('mousedown', mousedownRed)
  redBtn.removeEventListener('mouseup', mouseupRed)
  blueBtn.removeEventListener('mousedown', mousedownBlue)
  blueBtn.removeEventListener('mouseup', mouseupBlue)
  yellowBtn.removeEventListener('mousedown', mousedownYellow)
  yellowBtn.removeEventListener('mouseup', mouseupYellow)
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


function mousedownGreen(event) {
  event.preventDefault() 
  pressGreen()
}

function mouseupGreen(event) {
  event.preventDefault() 
  releaseGreen()
  buttonPress('GREEN')
}

function mousedownRed(event) {
  event.preventDefault() 
  pressRed()
}

function mouseupRed(event) {
  event.preventDefault() 
  releaseRed()
  buttonPress('RED')
}

function mousedownBlue(event) {
  event.preventDefault() 
  pressBlue()
}

function mouseupBlue(event) {
  event.preventDefault() 
  releaseBlue()
  buttonPress('BLUE')
}

function mousedownYellow(event) {
  event.preventDefault() 
  pressYellow()
}

function mouseupYellow(event) {
  event.preventDefault() 
  releaseYellow()
  buttonPress('YELLOW')
}

function pressGreen() {
  playSimonSound(simonSound.GREEN)
  greenBtn.setAttribute('fill', '#00FF00')
}

function releaseGreen() {
  
  greenBtn.setAttribute('fill', '#009900')
}

function pressRed() {
  playSimonSound(simonSound.RED)
  redBtn.setAttribute('fill', '#FF0000')
}

function releaseRed() {
  redBtn.setAttribute('fill', '#990000')
}

function pressBlue() {
  playSimonSound(simonSound.BLUE)
  blueBtn.setAttribute('fill', '#0000FF')
}

function releaseBlue() {
  blueBtn.setAttribute('fill', '#000099')
}

function pressYellow() {
  playSimonSound(simonSound.YELLOW)
  yellowBtn.setAttribute('fill', '#FFFF00')
}

function releaseYellow() {
  yellowBtn.setAttribute('fill', '#999900')
}

function playSimonSound(sound) {
  let audio = document.getElementById('audio')
    let div1 = document.getElementById('div-1')
    if(audio) {
      audio.remove()
    }    
    div1.innerHTML = '<audio id="audio" controls="controls" autobuffer="autobuffer" autoplay="autoplay"> <source src="https://s3.amazonaws.com/freecodecamp/simonSound' + sound + '.mp3"  type="audio/mpeg"> </audio>'  
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
