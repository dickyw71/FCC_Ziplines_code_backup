describe('The Simon Game view', function() {

    // mock view by adding elements to the DOM
    (function() {
        'use strict';
        var n = document.createElement('div');
        n.style.backgroundColor = 'green';
        n.style.width = '250px';
        n.style.height = '250px';
        n.setAttribute('id', 'powerCtrl');
        n.classList.add('simon-btn', 'green');
        document.body.appendChild(n);

        function simulateMousedown() {
            var evt = new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                view: window
            });
            var b = document.getElementById("powerCtrl"); //element to click on
            var canceled = !b.dispatchEvent(evt);
            if(canceled) {
                // A handler called preventDefault
                alert("canceled");
            } else {
                // None of the handlers called preventDefault
                alert("not canceled");
            }
        }
        document.getElementById("powerCtrl").addEventListener('mousedown', simulateMousedown);

    })();
 
    it('should call Mousedown on button to play sound', function() {

        var btn = document.getElementsByClassName('green')
        expect(btn.mousedown).toBeDefined()
    })
})