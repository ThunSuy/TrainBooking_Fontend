import React from "react";
import "./Complete.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Button from "../../Button/Button";

const Complete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="complete">
      <Header activeStep={3} />
      <span className="payTicket_wrap_info">Trả vè thành công </span>
      <div className="completet_noti">
        Yêu cầu trả vé của bạn đã <span>thành công</span>
      </div>
      <div className="completet_btn">
        <Button name="Trang chủ" onClick={handleBackHome} />
      </div>
    </div>
  );
};

export default Complete;
