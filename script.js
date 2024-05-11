// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get reference to the display
  const display = document.getElementById("display");

  // Get all buttons
  const buttons = document.querySelectorAll("button");

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
    "%": "%",
    "^": "^",
    " ": "Root",
    "M": "M +",
    "m": "M -",
    "R": "MRC",
    "Enter": "=",
    "Backspace": "Clear",
    "Delete": "AC",
     "O": "Module"
};

// Add event listener for key press
document.addEventListener("keydown", function(event) {
    const key = event.key;
    console.log("Key pressed:", key);
    if (keyboardShortcuts.hasOwnProperty(key)) {
        const buttonValue = keyboardShortcuts[key];
        console.log("Button value:", buttonValue);
        // Find the button with the matching value
        const button = Array.from(buttons).find(button => button.textContent === buttonValue);
        if (button) {
            button.click(); // Simulate click on the button
        }
    }
});
 let memmory = 0;
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
            
              default:
                  currentValue += value;
          }

        
          // Update the display
          display.value = currentValue;
      });
  });
});
