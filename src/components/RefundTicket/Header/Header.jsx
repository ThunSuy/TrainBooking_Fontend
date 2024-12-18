import React from "react";
import "./Header.scss";
import activeStepImg from "../../../assets/img/activeStep.png";
import inActiveStepImg from "../../../assets/img/inActiveStep.png";

const Header = ({ activeStep }) => {
  const steps = ["Chọn vé trả", "Xác nhận", "Trả vé", "Hoàn tất"];

  return (
    <div className="payTicket_header">
      <ul className="payTicket_header_list">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`payTicket_header_item ${
              index === activeStep ? "active_text" : ""
            }`}
          >
            <div className="payTicket_header_item_image">
              <img
                src={index === activeStep ? activeStepImg : inActiveStepImg}
                alt={`Erorr Image`}
              />
            </div>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
