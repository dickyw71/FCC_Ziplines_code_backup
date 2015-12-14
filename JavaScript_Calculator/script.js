$(document).ready(function() {
 
  var userIsInTheMiddleOfEnteringANumber = false;
  var operandStack = [];
  var operator = "";
  
  /// ac click event handler
  $("#ac").click(function() {
    // reset all state
    $("#display").text("0");
    operandStack = [];
    operator = "";
    userIsInTheMiddleOfEnteringANumber = false;
  });
  
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
    if(userIsInTheMiddleOfEnteringANumber) {
      // get operator
      operator = $(this).text();
      // Get the number from the display
      var operand = $("#display").text();
      console.log(operand);
      // push operand onto stack
      if(operandStack.push(parseFloat(operand)) > 1) {
        // more than 1 operand in stack so 
        performOperation(operator);
      }
      
    }
    userIsInTheMiddleOfEnteringANumber = false;
  });
  
  /// decimal point clicked
  $(".decimal-point").click(function() {
    if(userIsInTheMiddleOfEnteringANumber) {
       var display = $("#display").text(); 
       if(display.indexOf(".") == -1) {
          $("#display").text(display + ".");
       }
    }
    else {
      $("#display").text("0.");
      userIsInTheMiddleOfEnteringANumber = true;
    }    
  });
  
  /// equals clicked
  $("#equals").click(function() {
    if(userIsInTheMiddleOfEnteringANumber) {
      // Get the number from the display
      var operand = $("#display").text();      
      if(operandStack.push(parseFloat(operand)) > 1) {
        // more than 1 operand in stack so 
        // pop 2 operands, apply operator and
        // push result back onto stack
        $("#display").text(performOperation(operator).toString());
      }      
    }
    userIsInTheMiddleOfEnteringANumber = false;
  });
  
  /// performOperation
  /// pop 2 operands, apply operator and
  /// push result back onto stack
  function performOperation(operator) {
    var result = 0.0;
    switch(operator) {
      case "/":
        // do divide operation
        var divisor = operandStack.pop();
        if(divisor) result = operandStack.pop() / divisor;
        break;
      case "X":
        // do multiply operation
        result = operandStack.pop() * operandStack.pop();
        break;
      case "-":
        // do minus operation
        var subtrahend = operandStack.pop();
        result = operandStack.pop() - subtrahend;
        break;
      case "+":
        // do plus operation
        result = operandStack.pop() + operandStack.pop();
        break;
      default:
        // unknown operator
        break;
    }
    operandStack.push(result);  
    return result;
  }
  
  
});