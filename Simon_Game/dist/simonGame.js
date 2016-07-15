let stepCount = 0
let steps = []
let state = 'OFF'
let playerButtons = []
let strictMode = false
const buttonColours = ['RED','GREEN','BLUE','YELLOW']
const maxSteps = 20
const simonSound = {'RED': '1', 'YELLOW': '2', 'GREEN': '3', 'BLUE': '4'}

// ion sound config
ion.sound({
    sounds: [
        {
            name: "1"
        },
        {   
            name: "2"
        },
       {   
            name: "3"
        },
        {   
            name: "3"
        }        
    ],
    path: "https://s3.amazonaws.com/freecodecamp/simonSound",
    preload: true,
    volume: 0.9
})

function init() {
    stepCount = 0
    steps = []
    state = 'OFF'
    playerButtons = []
}

function turnSimonOff() {
    init()
}

function turnSimonOn() {
    state = 'READY'
}

function strict(setting) {
    strictMode = setting
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
        if(strictMode) {
            // play error sound
            restartSimonGame() 

        }
    }
}

function checkPlayerButtonsMatchSimonsSteps() {
    return playerButtons.every(function(button, index) {
        return button === steps[index]
    })
}


function playSound() {
    // play sound
    ion.sound.play("secondsOut")
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}