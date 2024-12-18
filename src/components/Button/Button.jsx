import React from "react";
import "./Button.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ name, iconLeft, iconRight, onClick, bacgGr }) => {
  return (
    <div className="button_wrap">
      <button className={`btn ${bacgGr}`} onClick={onClick}>
        {iconLeft && (
          <span className="btn_wrap_left">
            <FontAwesomeIcon icon={iconLeft} className="btn_icon_left" />
          </span>
        )}

        <span>{name}</span>

        {iconRight && (
          <span className="btn_wrap_right">
            <FontAwesomeIcon icon={iconRight} className="btn_icon_right" />
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
