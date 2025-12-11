import React, { useState, useEffect } from "react";

export default function Odliczanie() {
  const [licznik, setLicznik] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("START");

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isRunning && licznik > 0) {
      interval = setInterval(() => {
        setLicznik((prev) => Math.max(prev - 0.1, 0));
      }, 100);

      console.log(licznik);
      if (licznik <= 0 + 0.00001) {
        setButtonText("Odliczanie zakończone");
        setIsRunning(false);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, licznik]);

  const handleButtonClick = () => {
    if (licznik > 0) {
      setIsRunning(!isRunning);
      setButtonText(isRunning ? "START" : "STOP");
    }
  };

  return (
    <div>
      <div>{licznik.toFixed(1)} sek</div>
      <button onClick={handleButtonClick} disabled={licznik <= 0.00001}>
        {buttonText}
      </button>
    </div>
  );
}
