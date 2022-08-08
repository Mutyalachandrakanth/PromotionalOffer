import React from "react";
import "./counter.css";

//Countdown UI component 

function CounterUI(props) {
  const { hours, minutes, seconds } = props.timeProps;
  return (
    <div className="countdown">
      <div data-testid="timerValue" className="countdown-row">
        <span> {hours}</span>
        <span> : </span>
        <span> {minutes}</span>
        <span> : </span>
        <span> {seconds}</span>
      </div>
      <div className="countdown-row1">
        <span className="countdown-labels"> Hours</span>
        <span className="countdown-labels"> Minutes</span>
        <span className="countdown-labels"> Seconds</span>
      </div>
    </div>
  );
}

export default CounterUI;
