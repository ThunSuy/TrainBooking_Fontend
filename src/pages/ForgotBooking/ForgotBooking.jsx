import React from "react";
import "./ForgotBooking.scss";
import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";

const ForgotBooking = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleBtn = (event) => {
    event.preventDefault();
    console.log(inputValue);
  };

  return (
    <div className="forgotBooking">
      <span className="payTicket_wrap_info">Lấy lại mã đặt chỗ</span>
      <div className="forgotBooking_wrap">
        <span className="forgotBooking_wrap-text">
          Nhắn tin theo cú pháp VTBC gửi tới 8200 hoặc nhập email để lấy lại Mã
          đặt chỗ.
        </span>
        <p>Email</p>
        <form>
          <input type="text" onChange={handleInputChange} />
          <Button name="Nhận lại mã" onClick={handleBtn} />
        </form>
      </div>
    </div>
  );
};

export default ForgotBooking;
