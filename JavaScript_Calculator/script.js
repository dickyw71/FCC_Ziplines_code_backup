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
    console.log("AC");
  });

  /// plus/minus event handler
  $("#plus_minus").click(function() {
    var display = $("#display").text();
    if (display !== "0") {
      if (display.indexOf("-") == -1) {
        $("#display").text("-" + display);
      } else {
        $("#display").text(display.substring(1));
      }
    }
  });

  /// Percent event handler
  $("#percent").click(function() {
    var display = $("#display").text();
    if (display !== "0") {
      var percentage = parseFloat(display) / 100;
      var currentOperand = operandStack.pop();
      if (currentOperand === undefined) {
        $("#display").text(percentage);
      } else {
        var percentOfOperand = currentOperand * percentage;
        operandStack.push(currentOperand);
        $("#display").text(percentOfOperand);
      }
    }
  });

  /// digit click event handler
  $(".digit").click(function() {
    var display = $("#display").text();
    var digit = $(this).text();

    if (userIsInTheMiddleOfEnteringANumber) {
      $("#display").text(display + digit);
    } else {
      $("#display").text(digit);
      userIsInTheMiddleOfEnteringANumber = true;
    }
  });

  /// operator click event handler
  $(".operator").click(function() {
    // perform any pending operation first
    if (operator == "") {
      // get operator
      operator = $(this).text();
    }
    console.log("OP:" + operator);
    if (userIsInTheMiddleOfEnteringANumber) {
      // Get the number from the display
      var operand = $("#display").text();
      // push operand onto stack
      if (operandStack.push(parseFloat(operand)) == 2) {
        // more than 1 operand in stack so      
        console.log("Pre OP: " + operandStack);
        $("#display").text(performOperation(operator).toString());
        operator = $(this).text();
        console.log("Post OP: " + operandStack);
      }
    } else {
      operator = $(this).text();
    }
    userIsInTheMiddleOfEnteringANumber = false;
  });

  /// decimal point clicked
  $(".decimal-point").click(function() {
    if (userIsInTheMiddleOfEnteringANumber) {
      var display = $("#display").text();
      if (display.indexOf(".") == -1) {
        $("#display").text(display + ".");
      }
    } else {
      $("#display").text("0.");
      userIsInTheMiddleOfEnteringANumber = true;
    }
  });

  /// equals clicked
  $("#equals").click(function() {
    if (userIsInTheMiddleOfEnteringANumber) {
      // Get the number from the display
      var operand = $("#display").text();
      if (operandStack.push(parseFloat(operand)) == 2) {
        // more than 1 operand in stack so 
        // pop 2 operands, apply operator and
        // push result back onto stack
        console.log("Pre OP: " + operandStack);
        $("#display").text(performOperation(operator).toString());
        console.log("Post OP: " + operandStack);
      }
    }
    userIsInTheMiddleOfEnteringANumber = false;
  });

  /// performOperation
  /// pop 2 operands, apply operator and
  /// push result back onto stack
  function performOperation(operator) {
    var result = 0.0;
    console.log(operator);
    switch (operator) {
      case "÷":
        // do divide operation
        var divisor = operandStack.pop();
        if (divisor) result = operandStack.pop() / divisor;
        break;
      case "×":
        // do multiply operation
        result = operandStack.pop() * operandStack.pop();
        break;
      case "−":
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
    operator = "";
    operandStack.push(result);
    return result;
  }

});
