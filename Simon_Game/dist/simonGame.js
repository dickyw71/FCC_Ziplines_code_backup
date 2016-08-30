let stepCount = 0
let steps = []
let state = 'OFF'
let playerButtons = []
let strictMode = false
const buttonColours = ['RED','GREEN','BLUE','YELLOW']
const maxSteps = 20
const simonSound = {'RED': '1', 'YELLOW': '2', 'GREEN': '3', 'BLUE': '4'}


function init() {
    stepCount = 0
    steps = []
    state = 'OFF'
    playerButtons = []
    strictMode = false
}

function turnSimonOff() {
    init()
    powerDown()
}

function turnSimonOn() {
    state = 'READY'
}

function strict(setting) {
    if(state !== 'OFF') {
        strictMode = setting
    }
}

function startSimonGame() {
    if(state === 'READY') {
        state = 'PLAYING'
        incrementSteps()
    }
    else {
        restartSimonGame()
    }
}

function restartSimonGame() {
    if(state === 'PLAYING') {
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

function buttonPress(colour) {
    playerButtons.push(colour)
    if(checkPlayerButtonsMatchSimonsSteps()) {
        if(playerButtons.length === steps.length) {
            if(stepCount !== maxSteps) {
                incrementSteps()
            }
            else {
                console.log('Victory!')
                restartSimonGame()
            }
        }
    }
    else {
        // play error sound
        console.log('Error!')
        if(strictMode) {
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

// add event listener
var powerCtrl = document.getElementById('power');
var powerSwitch = document.getElementById('powerSwitch')
powerCtrl.addEventListener('click', switchPower, false)

var strictBtn = document.getElementById('strictBtn')
var strictLamp = document.getElementById('strictLamp')
strictBtn.addEventListener('click', toggleStrict, false)


function switchPower() {
    if(state == 'OFF') {
        turnSimonOn()
        if(powerSwitch.getAttribute('x') == '580') {
            powerSwitch.setAttribute('x', '602')
        }
    }
    else {
        turnSimonOff()
        powerSwitch.setAttribute('x', '580')
    }
}

function toggleStrict() {
    if(strictMode) {
        strict(false)
        strictLamp.setAttribute('fill', 'black')
    }
    else {
        strict(true)
        if(strictMode) {
            strictLamp.setAttribute('fill', 'red')
        }
    }
}