import React from "react";
import Button from "../../../Button/Button";
import "./ButtonPayTicket.scss";

const ButtonPayTicket = ({
  iconLeft,
  nameLeft,
  iconRight,
  nameRight,
  onClickLeft,
  onClickRight,
  bacgGrLeft,
  bacgGrRight,
  btnCenter,
}) => {
  return (
    <div className={`formInfoPeople_button ${btnCenter}`}>
      <div>
        <Button
          bacgGr={bacgGrLeft}
          name={nameLeft}
          iconLeft={iconLeft}
          onClick={onClickLeft}
        />
      </div>
      <div>
        <Button
          bacgGr={bacgGrRight}
          name={nameRight}
          iconRight={iconRight}
          onClick={onClickRight}
        />
      </div>
    </div>
  );
};

export default ButtonPayTicket;
