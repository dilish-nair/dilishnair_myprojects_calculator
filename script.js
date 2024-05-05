// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get reference to the display
  const display = document.getElementById("display");

  // Get all buttons
  const buttons = document.querySelectorAll("button");

  // Initialize the display value
  let currentValue = "";
  let memmory = 0;

   // Map keyboard keys to button values
   const keyboardShortcuts = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    ".": ".",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "%": "Module",
    "Enter": "=",
    "Backspace": "Clear",
    "Delete": "AC"
};

// Add event listener for key press
document.addEventListener("keypress", function(event) {
    const key = event.key;
    if (keyboardShortcuts.hasOwnProperty(key)) {
        const buttonValue = keyboardShortcuts[key];
        // Find the button with the matching value
        const button = Array.from(buttons).find(button => button.textContent === buttonValue);
        if (button) {
            button.click(); // Simulate click on the button
        }
    }
});

  // Add event listener to each button
  buttons.forEach(button => {
      button.addEventListener("click", function() {
          const value = this.textContent;

          // Perform action based on the button clicked
          switch(value) {
              case "AC":
                  currentValue = "";
                  break;
              case "Clear":
                  currentValue = currentValue.slice(0, -1);
                  break;
                  case "=":
                    try {
                        if (currentValue.includes("^")) {
                            const [x, y] = currentValue.split("^");
                            currentValue = Math.pow(parseFloat(x), parseFloat(y)); // Calculate x^y
                        } else {
                            currentValue = eval(currentValue);
                        }
                    } catch(err) {
                        currentValue = "Error";
                    }
                    break;
              case "Root":
                  currentValue = Math.sqrt(currentValue);
                  break;
              case "%":
                  currentValue = eval(currentValue)/100;
                  break;
              case "M +":
                //   let memmory = 0;
                memmory = eval(memmory + currentValue)         
                  break;
              case "M -":
                  memmory = eval(memmory - currentValue)
                  break;
              case "MRC":
                  currentValue = memmory
                  break;
              case "Module":
                //   currentValue += "%"
                currentValue = eval(currentValue.replace("/", "%"))
                  break;
            //   case "^":
            //     if (currentValue.includes("^")) {
            //         const [x, y] = currentValue.split("^");
            //         currentValue = Math.pow(parseFloat(x), parseFloat(y)); // Calculate x^y
            //     }
            //       break;
              default:
                  currentValue += value;
          }

        //   Replace Module with %
        //   currentValue = currentValue.replace("Module", "%")

          // Update the display
          display.value = currentValue;
      });
  });
});
