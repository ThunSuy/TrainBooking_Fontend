import React from "react";
import "./Confirm.scss";
import { useEffect } from "react";
import Header from "../Header/Header";
import Info from "./Info/Info";
import Button from "../../Button/Button";

const Confirm = ({ handleComfirm }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleBtn = () => {
    handleComfirm();
  };

  return (
    <div className="confirm">
      <Header activeStep={1} />
      <span className="payTicket_wrap_info">Xác nhận trả vé</span>
      <div className="tableRefund_wrapper_title">Danh sách các vé chọn trả</div>
      <div className="confirm_wrap">
        <div className="confirm_wrap_item">
          <div className="confirm_wrap_item_title">
            Hà Nội - Sài Gòn 14/11/2024
          </div>
          <div className="confirm_wrap_item_con">
            <Info />
            <Info />
          </div>
        </div>
        <div className="confirm_wrap_item">
          <div className="confirm_wrap_item_title">
            Hà Nội - Sài Gòn 14/11/2024
          </div>
          <div className="confirm_wrap_item_con">
            <Info />
            <Info />
            <Info />
          </div>
        </div>
        <div className="confirm_wrap_last">
          <div className="confirm_wrap_last-left">
            <div className="confirm_wrap_last-text">
              Tổng vé : <span>2</span>
            </div>
            <div className="confirm_wrap_last-text">
              Tổng lệ phí : <span>224,000</span>VNĐ
            </div>
          </div>
          <div className="confirm_wrap_last-right">
            <div className="confirm_wrap_last-text">
              Tổng tiền vé : <span>3,224,000</span>VNĐ
            </div>
            <div className="confirm_wrap_last-text">
              Tổng tiền trả : <span>2,331,000</span>VNĐ
            </div>
          </div>
        </div>
        <div className="confirm_wrap_ft">
          <div className="tableRefund_wrapper_title">
            Phương thức nhận mã xác nhận trả vé
          </div>
          <div className="confirm_wrap_ft_select">
            <p>
              <input type="checkbox" />
              <span>Email: email@gmail.com</span>
            </p>
            <p>
              <input type="checkbox" />
              <span>Số điện thoại: 0764513977</span>
            </p>
          </div>
          <div className="confirm_wrap_ft_button">
            <Button name="Xác nhận" onClick={handleBtn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
