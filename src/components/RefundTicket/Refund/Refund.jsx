import React from "react";
import "./Refund.scss";
import { useEffect } from "react";
import Button from "../../Button/Button";
import Header from "../Header/Header";

const Refund = ({ handleRefund }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleBtn = () => {
    handleRefund();
  };

  return (
    <div className="refund">
      <Header activeStep={2} />
      <span className="payTicket_wrap_info">Trả vé</span>
      <div className="refund_title">
        Quý khách vui lòng kiểm tra hòm thư tại đại chỉ <span>Email</span> hoặc
        tin nhắn trên <span>số điện thoại</span>đã dùng mua vé để nhận mã xác
        nhận. Chúng tôi sẽ dùng mã xác nhận này để đảm bảo rằng chính quý khách
        là người mua vé và có quyền trả vé đã mua
      </div>
      <div className="refund_wrap">
        <div className="refund_wrap_left">
          <span>Mã xác nhận (6số)</span>
          <input type="text" placeholder="Nhập mã xác nhận" />
        </div>
        <div className="refund_wrap_right">
          <Button name="Trả vé" bacgGr="refund" onClick={handleBtn} />
          <span className="refund_wrap_right-text">Gửi lại mã (81s)</span>
        </div>
      </div>
    </div>
  );
};

export default Refund;
