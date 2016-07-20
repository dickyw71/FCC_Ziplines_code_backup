describe('The Simon Game', function() {

    beforeEach(function() {
        // intialise the Simon Game state
        turnSimonOff()
    })

    it('should initially be off', function() {
        expect(state).toBe('OFF')
    })

    it('should be off when turned off', function() {
        expect(state).toBe('OFF')
    } )

    it('should not start when game is off', function() {
        turnSimonOn()
        startSimonGame()
        expect(state).not.toBe('OFF')
    })

    it('should be ready to play when turned-on', function() {
        turnSimonOn()
        expect(state).toBe('READY')
    })

    it('should only start when ready-to-play', function() {
        turnSimonOn()
        expect(state).toBe('READY')
        startSimonGame()    
    })

    it('should be playing after starting', function() {
        turnSimonOn()
        startSimonGame()
        expect(state).toBe('PLAYING')
    })

    it('should not (re)start when already playing', function() {
        turnSimonOn()
        startSimonGame()
        incrementSteps()
        expect(stepCount).toEqual(2)
        startSimonGame()
        expect(stepCount).toEqual(1)
        expect(stepCount).not.toEqual(2)
    })

    it('should have a constant maxSteps value of 20', function() {
        expect(maxSteps).toEqual(20)
    })

    it('should (indicate victory and) restart when correctly repeated 20 steps', function() {
        turnSimonOn()
        startSimonGame()
        for(var i=0; i<steps.length;i++) {
            buttonPress(steps[i])
            // if(stepCount===20) {
            //     break
            // }
        }
        buttonPress(steps[19])
        expect(stepCount).toEqual(1)
    })

    it('should (indicate error and) restart when in strict mode and incorrect step entered', function() {
       turnSimonOn()
        startSimonGame()
        for(var i=0; i<10;i++) {
            buttonPress(steps[i])
        }
        buttonPress(buttonColours.filter(function(colour) { colour !== steps[9] })[0])
        expect(stepCount).toEqual(1)
    })

    it('should have a restart option', function() {
        turnSimonOn()
        startSimonGame()
        buttonPress(steps[0])
        restartSimonGame()
        expect(stepCount).toEqual(1)
    })

    it('should return the correct simonSound for the given colour', function() {
        expect(simonSound.RED).toBe('1')
        expect(simonSound.YELLOW).toBe('2')
        expect(simonSound.GREEN).toBe('3')
        expect(simonSound.BLUE).toBe('4')
    })

    it('should restart sequence on error in strict mode', function() {
        turnSimonOn()
        startSimonGame()
        strict(true)
        expect(strictMode).toBe(true)
        buttonPress(steps[0])
        buttonPress(buttonColours.filter(function(colour) { colour !== steps[1] })[0])
        expect(stepCount).not.toEqual(2)
        expect(stepCount).toEqual(1)

        
    })

    it('should be able to toggle strictMode ON and OFF only when the game is turned ON', function() {
        // cannot toggle strict when turned off
        expect(strictMode).toBe(false)
        strict(true)
        expect(strictMode).toBe(false)

        // can toggle strict when turned on
        turnSimonOn()
        expect(strictMode).toBe(false)
        strict(true)
        expect(strictMode).toBe(true)
        strict(false)
        expect(strictMode).toBe(false)
    })
})