$(document).ready(function() {
 
  var userIsInTheMiddleOfEnteringANumber = false;
  
  /// digit click event handler
  $(".digit").click(function() {
    var display = $("#display").text();
    var digit = $(this).text(); 
    
    if(userIsInTheMiddleOfEnteringANumber) {
       $("#display").text(display + digit);
    }
    else {
      $("#display").text(digit);
      userIsInTheMiddleOfEnteringANumber = true;
    }
  });
  
  /// operator click event handler
  $(".operator").click(function() {
    userIsInTheMiddleOfEnteringANumber = false;
  });
  
});
