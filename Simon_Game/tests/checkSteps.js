describe('The steps that are played by Simon', function() {

    beforeEach(function() {
        turnSimonOff()
    })
 
    it('should have a length that equals the stepCount', function() {
        expect(steps.length).toEqual(stepCount)
    })

    it('should be either RED/GREEN/BLUE/YELLOW', function() {
        turnSimonOn()
        startSimonGame()
        steps.forEach(function(step) {
            expect(buttonColours.includes(step)).toBe(true)
        })      
    })

    it('should be randomly selected from RED/GREEN/BLUE/YELLOW', function() {
        turnSimonOn()
        var colour = buttonColours[getRandomInt(0, buttonColours.length)]
        steps.push(colour)
        steps.forEach(function(step) {
            expect(buttonColours.includes(step)).toBe(true)
        })
    })
})

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
