import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Timer from "./Timer";
import dayjs from "dayjs";
import CounterUI from "../counter";
import "./promo.css";
import { currencyFormat } from "../helpers";



function Promo(props) {
  const [diffInSeconds, setDiffInSeconds] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [promoTime, setPromoTime] = useState();
  const currentTime = dayjs();
  //Time handler
  useEffect(() => {
    if (promoTime) {
      const diffInSeconds =
        promoTime - currentTime.diff(props.initialTime, "seconds");
      const isValid = diffInSeconds > 0;
      setDiffInSeconds(diffInSeconds);
      setIsValidPromo(isValid);
    }
  }, [promoTime, currentTime, props.initialTime]);

  const timerProps = {
    startingHours: 0,
    startingMinutes: Math.floor(diffInSeconds / 60),
    startingSeconds: diffInSeconds < 60 ? diffInSeconds : diffInSeconds % 60,
  };
  const [isvalidPromo, setIsValidPromo] = useState(false);
  //Opt in button handler
  const handleOptInClick = () => {
    window.location.href = "https://www.jackpotjoy.com/";
  };

  useEffect(() => {
    fetch("/sample.json")
      .then((response) => response.json())
      .then((data) => {
        setOfferPrice(data.data.prizeValue);
        setPromoTime(data.data.offerTime);
      });
  }, []);
  const invalidatePromo = () => {
    setIsValidPromo(false);
  };
  if (!isvalidPromo) { //page refresh handling 
    return (
      <CounterUI timeProps={{ hours: "00", minutes: "00", seconds: "00" }} />
    );
  } else
    return (
      <div className="promo-wrapper">
        <div className="promo-banner"></div>
        <h2 data-testid="promoOffer">
          Get Your Free <span className="offer-value">{currencyFormat(offerPrice)}</span>
           Now
        </h2>
        <br />
        <Timer timerProps={timerProps} timerCallBack={invalidatePromo} />
        <button
          data-testid="optInButton"
          className="optin-button"
          onClick={handleOptInClick}
        >
          Opt in
        </button>
      </div>
    );
}

const mapStateToProps = (state) => ({
  initialTime: state.promo.initialTime,
});
export default connect(mapStateToProps)(Promo);
