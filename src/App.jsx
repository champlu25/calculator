import { useState } from "react";
import styles from "./App.module.css";
import data from "./data/data.json";

function App() {
  const [buttons] = useState(data);
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  const handleNumberClick = (content) => {
    if (result) {
      setOperand1(content);
      setResult("");
    } else if (!operator) {
      setOperand1((prev) => prev + content);
    } else {
      setOperand2((prev) => prev + content);
    }
  };

  const handleOperatorClick = (op) => {
    if (result) {
      setOperand1(result.toString());
      setOperand2("");
      setResult("");
    }
    if (operand1) {
      setOperator(op);
    }
  };

  const handleReset = () => {
    setOperand1("");
    setOperand2("");
    setOperator("");
    setResult("");
  };

  const handleCalculate = () => {
    if (operand1 && operand2 && operator) {
      let res;
      switch (operator) {
        case "+":
          res = parseFloat(operand1) + parseFloat(operand2);
          break;
        case "-":
          res = parseFloat(operand1) - parseFloat(operand2);
          break;
        default:
          res = "";
      }
      setResult(res);
      setOperand1(res.toString());
      setOperand2("");
      setOperator("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <div className={styles.calcOutput}>
          {result ? result : operand1 + operator + operand2}
        </div>
        <div className={styles.buttons}>
          <ul>
            {buttons.map(({ id, content }) => (
              <li key={id}>
                <button
                  onClick={() => handleNumberClick(content)}
                  className={styles.buttonNumbers}
                >
                  {content}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleOperatorClick("+")}
                className={styles.buttonSum}
              >
                +
              </button>
            </li>
            <li>
              <button
                onClick={() => handleOperatorClick("-")}
                className={styles.buttonSubtraction}
              >
                -
              </button>
            </li>
            <li>
              <button onClick={handleReset} className={styles.buttonReset}>
                C
              </button>
            </li>
            <li>
              <button onClick={handleCalculate} className={styles.buttonResult}>
                =
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
