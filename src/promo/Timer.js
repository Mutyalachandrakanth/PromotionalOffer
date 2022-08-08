import React, { useState, useEffect } from "react";
import CounterUI from "../counter";
//Countdown timer

function Timer(props) {
  var [seconds, setSeconds] = useState(props.timerProps.startingSeconds);
  const [mins, setMins] = useState(props.timerProps.startingMinutes);
  const [hours, setHours] = useState(props.timerProps.startingHours);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (mins === 0) {
          props.timerCallBack();
          clearInterval(sampleInterval);
        } else {
          setMins(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });
  return (
    <CounterUI
      timeProps={{
        hours: hours > 9 ? hours : `0${hours}`,
        minutes: mins > 9 ? mins : `0${mins}`,
        seconds: seconds > 9 ? seconds : `0${seconds}`,
      }}
    />
  );
}

export default Timer;
