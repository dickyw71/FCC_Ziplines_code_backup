describe('Player Button Presses', function() {

    beforeEach(function() {
        turnSimonOff()
    })

    it('should match the Simon steps', function() {
        turnSimonOn()
        startSimonGame()
        buttonPress(steps[0])
        // compare player button press to Simon steps
        var result = checkPlayerButtonsMatchSimonsSteps()
        expect(result).toBe(true)
    })


})