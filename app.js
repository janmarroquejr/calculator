class Calculator {
  constructor(prevText, currText) {
    this.prevText = prevText;
    this.currText = currText;
    this.clear();
  }

  clear() {
    this.curr = "";
    this.prev = "";
    this.operation = undefined;
  }

  delete() {
    this.curr = this.curr.toString().slice(0, -1);
  }

  appendNum(number) {
    if (number === "." && this.curr.includes(".")) return;
    this.curr = this.curr.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.curr === "") return;
    if (this.prev !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prev = this.curr;
    this.curr = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.prev);
    const current = parseFloat(this.curr);
    if (isNaN(previous) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "/":
        computation = previous / current;
        break;
      default:
        return;
    }

    this.curr = computation;
    this.operation = undefined;
    this.prev = "";
  }

  getDisplay(num) {
    const stringNum = num.toString();
    const intDigits = parseFloat(stringNum.split(".")[0]);
    const decimalDigits = stringNum.split(".")[1];
    let intDisplay;
    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    this.currText.innerText = this.getDisplay(this.curr);
    if (this.operation != null) {
      this.prevText.innerText = `${this.getDisplay(this.prev)} ${
        this.operation
      }`;
    } else {
      this.prevText.innerText = "";
    }
  }
}

const numbers = document.querySelectorAll("[data-num]");
const operations = document.querySelectorAll("[data-operation]");
const equals = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const prevText = document.querySelector("[data-previous]");
const currText = document.querySelector("[data-current]");

const calculator = new Calculator(prevText, currText);

numbers.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNum(btn.innerText);
    calculator.updateDisplay();
  });
});

operations.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
  });
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

equals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
