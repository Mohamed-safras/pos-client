import React, { useState, useEffect, useCallback } from "react";

const buttons = [
  ["7", "8", "9", "/", "√"],
  ["4", "5", "6", "*", "^"],
  ["1", "2", "3", "-", "("],
  ["0", ".", "=", "+", ")"],
  ["C", "±", "%", "⌫"],
];

function evaluateExpression(expr: string): string {
  try {
    let safeExpr = expr.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");
    safeExpr = safeExpr.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");
    safeExpr = safeExpr.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
    // eslint-disable-next-line no-eval
    let result = eval(safeExpr);
    return result.toString();
  } catch {
    return "Error";
  }
}

const keyMap: { [key: string]: string } = {
  Enter: "=",
  "=": "=",
  Escape: "C",
  c: "C",
  C: "C",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "%": "%",
  "^": "^",
  "(": "(",
  ")": ")",
  ".": ".",
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
  Backspace: "⌫",
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);

  // Insert value at cursor position
  const insertAtCursor = (value: string) => {
    setInput((prev) => {
      const left = prev.slice(0, cursor);
      const right = prev.slice(cursor);
      setCursor(cursor + value.length);
      return left + value + right;
    });
    setResult("");
  };

  // Remove character before cursor
  const backspaceAtCursor = () => {
    setInput((prev) => {
      if (cursor === 0) return prev;
      const left = prev.slice(0, cursor - 1);
      const right = prev.slice(cursor);
      setCursor(cursor - 1);
      return left + right;
    });
    setResult("");
  };

  // Remove character at cursor
  const deleteAtCursor = () => {
    setInput((prev) => {
      if (cursor === prev.length) return prev;
      const left = prev.slice(0, cursor);
      const right = prev.slice(cursor + 1);
      return left + right;
    });
    setResult("");
  };

  const handleClick = useCallback(
    (value: string) => {
      if (value === "C") {
        setInput("");
        setResult("");
        setCursor(0);
      } else if (value === "=") {
        setResult(evaluateExpression(input));
        setCursor(input.length);
      } else if (value === "±") {
        if (input) {
          if (input.startsWith("-")) {
            setInput(input.slice(1));
            setCursor((c) => Math.max(0, c - 1));
          } else {
            setInput("-" + input);
            setCursor((c) => c + 1);
          }
        }
      } else if (value === "⌫") {
        backspaceAtCursor();
      } else {
        insertAtCursor(value);
      }
    },
    [input, cursor]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      let key = e.key;
      if (key === "ArrowLeft") {
        setCursor((c) => Math.max(0, c - 1));
        return;
      }
      if (key === "ArrowRight") {
        setCursor((c) => Math.min(input.length, c + 1));
        return;
      }
      if (key === "Backspace") {
        backspaceAtCursor();
        return;
      }
      if (key === "Delete") {
        deleteAtCursor();
        return;
      }
      if (key === "Home") {
        setCursor(0);
        return;
      }
      if (key === "End") {
        setCursor(input.length);
        return;
      }
      if (key === "r" || key === "R") {
        setInput("");
        setResult("");
        setCursor(0);
        return;
      }
      if (key === "s" || key === "S") {
        insertAtCursor("√");
        return;
      }
      if (key === "Enter") {
        handleClick("=");
        e.preventDefault();
        return;
      }
      if (keyMap[key]) {
        if (key !== "Enter") {
          if (keyMap[key] === "⌫") {
            backspaceAtCursor();
          } else {
            insertAtCursor(keyMap[key]);
          }
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [input, cursor, handleClick]);

  // Render input with cursor
  const renderInputWithCursor = () => {
    const left = input.slice(0, cursor);
    const right = input.slice(cursor);
    return (
      <span>
        <span>{left}</span>
        <span
          className="inline-block w-0.5 h-6 align-middle bg-green-400 animate-pulse mx-0.5"
          style={{ verticalAlign: "middle" }}
        />
        <span>{right}</span>
      </span>
    );
  };

  return (
    <div className="w-[340px] mx-auto bg-gradient-to-br from-[var(--background-variant)] via-gray-900 to-black rounded-2xl shadow-2xl p-4 border-4 border-gray-800">
      <div
        className="mb-2 bg-black bg-opacity-60 rounded-lg p-3 text-right text-2xl font-mono flex flex-col justify-end text-white"
        style={{
          minHeight: "80px",
          height: "80px",
          maxHeight: "80px",
          overflow: "hidden",
        }}
        tabIndex={0}
        onClick={() => setCursor(input.length)}
      >
        <div className="w-full truncate select-none cursor-pointer">
          {input.length === 0 ? (
            <span>
              <span
                className="inline-block w-0.5 h-6 align-middle bg-green-400 animate-pulse mx-0.5"
                style={{ verticalAlign: "middle" }}
              />
              0
            </span>
          ) : (
            renderInputWithCursor()
          )}
        </div>
        <div className="text-lg text-green-400 w-full truncate">
          {result !== "" ? result : null}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {buttons.flat().map((btn, idx) => (
          <button
            key={idx}
            className={`p-3 rounded font-bold text-lg shadow-md focus:outline-none transition ${
              btn === "="
                ? "col-span-1 bg-green-500 text-white"
                : btn === "C"
                  ? "col-span-2 bg-red-500 text-white"
                  : btn === "⌫"
                    ? "bg-gray-600 text-red-300"
                    : ["/", "*", "-", "+", "%", "^", "√"].includes(btn)
                      ? "bg-gray-600 text-yellow-300"
                      : btn === "±"
                        ? "bg-gray-600 text-blue-300"
                        : "bg-gray-800 text-white"
            }`}
            style={btn === "C" ? { gridColumn: "span 2" } : {}}
            onClick={() => handleClick(btn)}
            tabIndex={0}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
