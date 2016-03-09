$(document).ready(function() {

  var minutesText = $(".minutes").text();
  var timeinterval = null;
  var plusMinusRepeat = 200; //  millisecs
  var repeatIntervalID = null;

  const MAX_MINUTES = 50;
  const MIN_MINUTES = 1;

  // ion sound config
  ion.sound({
    sounds: [{
      name: "secondsOut"
    }],
    path: "https://dickyw.blob.core.windows.net/audio/",
    preload: true,
    volume: 0.9
  });

  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
        //  hide cancel control and show reset control
        $(".cancel-control").css("display", "none");
        $(".reset-control").fadeIn(2000);
        // play sound
        ion.sound.play("secondsOut");
      }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }

  /// timer click event handler
  $(".timer-button").click(function() {

    if (timeinterval === null) {
      var deadline = new Date(Date.parse(new Date()) + parseInt($(".minutes").text(), 10) * 60 * 1000);
      //  hide timer and plus/minus buttons
      $(".timer-button").css("display", "none");
      $(".plusMinus-controls").fadeOut(1000);
      // start the clock
      initializeClock('clockdiv', deadline);
      // show cancel button
      $(".cancel-control").fadeIn(3000);
    }
  });

  /// cancel button event handler
  $(".cancel-button").click(function() {
    //  hide cancel control and show reset control
    $(".cancel-control").css("display", "none");
    $(".reset-control").fadeIn(2000);

    // clear window timer intervalID
    if (timeinterval !== null) {
      clearInterval(timeinterval);
      timeinterval = null;
    }
  });

  /// reset button event handler
  $(".reset-button").click(function() {

    // reset timer
    $(".minutes").text(minutesText);
    $(".seconds").text("00");
    // reset controls
    $(".reset-control").css("display", "none");
    $(".timer-button").fadeIn(2000);
    $(".plusMinus-controls").fadeIn(2000);

    // clear window timer intervalID
    if (timeinterval !== null) {
      clearInterval(timeinterval);
      timeinterval = null;
    }
  });

  // $(".plus-button").click(function() {
  //   incrementMinutes();
  // });

  $(".plus-button").hover(
    function() { //  mouse-in
      repeatIntervalID = setInterval(function() {
        incrementMinutes();
      }, plusMinusRepeat);
    },
    function() { //  mouse-out
      clearInterval(repeatIntervalID);
    });

//     $(".plus-button").mousedown(function() {
//       repeatIntervalID = setInterval(function() {
//         incrementMinutes();
//       }, plusMinusRepeat);
//     });

//     $(".plus-button").mouseup(function() {
//       clearInterval(repeatIntervalID);
//     });

  // $(".minus-button").click(function() {
  //   decrementMinutes();
  // });

  $(".minus-button").hover(
    function() { //  mouse-in
      repeatIntervalID = setInterval(function() {
        decrementMinutes();
      }, plusMinusRepeat);
    },
    function() { //  mouse-out
      clearInterval(repeatIntervalID);
    });

//     $(".minus-button").mousedown(function() {
//       repeatIntervalID = setInterval(function() {
//         decrementMinutes();
//       }, plusMinusRepeat);
//     });

//     $(".minus-button").mouseup(function() {
//       clearInterval(repeatIntervalID);
//     });

  function incrementMinutes() {
    var minsVal = parseInt($(".minutes").text(), 10);
    minsVal = minsVal + 1;
    if (minsVal <= MAX_MINUTES) {
      minutesText = ('0' + minsVal).slice(-2);
      $(".minutes").text(minutesText);
    }
  }

  function decrementMinutes() {
    var minsVal = parseInt($(".minutes").text(), 10);
    minsVal = minsVal - 1;
    if (minsVal >= MIN_MINUTES) {
      minutesText = ('0' + minsVal).slice(-2);
      $(".minutes").text(minutesText);
    }
  }
});
