import React from "react";
import "./Notification.scss";

const Notification = ({ message, handleBtn }) => {
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("notification")) {
      handleBtn();
    }
  };

  return (
    <div className="notification" onClick={handleOutsideClick}>
      <div className="notification_wrap">
        <div className="notification_wrap_title">Thông báo</div>
        <div className="notification_wrap_erorr">{message}</div>
        <div className="notification_wrap_button">
          <div onClick={handleBtn} className="btn">
            Đóng
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
