describe('The count of steps', function() {

    beforeEach(function() {
        turnSimonOff()
        turnSimonOn()
        startSimonGame()
    })

    it('should have an initial value when the game begins', function() {

        expect(stepCount).toEqual(1)
    } )

    it('should increment by 1 when all steps are correctly repeated', function() {
        let num = stepCount
        buttonPress(steps[0])
        expect(stepCount).toEqual(num+1)
    })

    it('should be zero when the game is off', function() {
        turnSimonOff()
        expect(stepCount).toEqual(0)
    })

    it('should not change when any of the steps are incorrectly repeated', function() {
        let num = stepCount
        buttonPress(buttonColours.filter(function(colour) { colour !== steps[0] })[0])
        expect(stepCount).toEqual(num)
    })

    it('should increment up to 20', function() {       
        for(var i=0; i<steps.length;i++) {
            buttonPress(steps[i])
            if(stepCount===20) {
                break
            }
        }
        expect(steps.length).toEqual(20)
    })

    it('should not be greater than 20', function() {
      for(var i=0; i<steps.length;i++) {
            buttonPress(steps[i])
            if(stepCount===20) {
                break
            }
        }
        expect(stepCount).toEqual(20)
    })

    afterEach(function() {
        turnSimonOff()
    })
})