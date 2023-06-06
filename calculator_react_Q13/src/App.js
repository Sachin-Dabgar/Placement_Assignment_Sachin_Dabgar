import React, { useState, useEffect } from 'react';
import { BsMoonStarsFill } from "react-icons/bs"
import { BsFillSunFill } from "react-icons/bs"

import Header from './Components/Header/Header';
import Keypad from './Components/Keypad/Keypad';

import './App.css';

function App() {

  // creating state to manage modes [dark and light]
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("calculator-app-mode")) || false);
  // to get an access of expression and result
  const [expression, setexpression] = useState("");
  const [result, setresult] = useState("0");

  // state for history
  const [history, sethistory] = useState(JSON.parse(localStorage.getItem("calculator-app-history")) || []);
  console.log(history)

  // keycodes for the only keys which we requre in our app.
  const usedKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
  ];

  // these are the keys we have in our app
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["-", "+", "*", "/"];

  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode))
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history))
  }, [history]);

  // creating function to handle the key pressed
  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) {
      return
    }

    if (!usedKeyCodes.includes(keyCode)) {
      return
    }

    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) {
          return
        }
      }
      calculateExpression(expression + key)
      setexpression(expression + key)
    }

    else if (operators.includes(key)) {
      if (!expression) {
        return
      }
      if (operators.includes(expression.charAt(expression.length - 1))) {
        return
      }
      if (operators.includes(expression.charAt(expression.length - 1)) === ".") {
        return
      }
      setexpression(expression + key)
    }

    else if (keyCode === 8) {
      if (!expression) {
        return
      }
      calculateExpression(expression)
      setexpression(expression.slice(0, -1))
    }

    else if (key === ".") {
      if (!expression) {
        return
      }
      if (operators.includes(expression.charAt(expression.length - 1))) {
        return
      }
      setexpression(expression + key)
    }

    else if (keyCode === 13) {
      if (!expression) {
        return
      }
      if (operators.includes(expression.charAt(expression.length - 1)) || ((expression.charAt(expression.length - 1)) === ".")) {
        let ans = eval(expression.slice(0, -1)) + ""
        setresult(ans)
        return
      }
      calculateExpression(expression)
      const tempHistory = [...history]
      if (tempHistory.length > 20) {
        tempHistory = tempHistory.splice(0, 1)
      }
      tempHistory.push(expression)
      sethistory(tempHistory)
    }

  }

  const calculateExpression = (exp) => {
    if (!exp) {
      setresult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp) + "";
    setresult(answer);
  }

  return (
    <div className="app"
      // hadling the keys pressed using keyboard
      tabIndex={0}
      onKeyDown={(event) => {
        handleKeyPress(event.keyCode, event.key)
      }}
      data-theme={isDarkMode ? "dark" : ""}>
      {/* main design of the calculator app */}
      <div className='app_calculator'>
        {/* navbar having toggle button */}
        <div className='app_calculator_navbar'>
          <div className='app_calculator_navbar_toggle_modes'>
            <div className='app_calculator_navbar_modes'
              onClick={() => {
                setIsDarkMode(!isDarkMode)
              }}>
              {isDarkMode ? <BsMoonStarsFill style={isDarkMode ? { color: "#fff" } : { color: "#000" }} /> : <BsFillSunFill />}
            </div>
          </div>
        </div>
        <Header expression={expression} result={result} history={history} />
        <Keypad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default App;
