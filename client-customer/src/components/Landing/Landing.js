import "./Landing.css";
import land from "../../asset/img/mouse.png";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Landing = () => {
  return (
    <div className="landing__container">
      <div className="landing__header__container">
        <div className="landing__header">
          <h3 className="landing__header__discount">UP TO 15% DISCOUNT</h3>
          <h1 className="landing__header__main">
            Discover The Finest Devices At Our Store.
          </h1>
        </div>
      </div>
      <div className="landing__image__container">
        <img className="landing__image" src={land} alt="" />
      </div>
    </div>
  );
};

export default Landing;
