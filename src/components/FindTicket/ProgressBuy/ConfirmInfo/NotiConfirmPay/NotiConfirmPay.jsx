import React, { useState, useEffect } from "react";
import "./NotiConfirmPay.scss";

const NotiConfirmPay = ({
  showNotiConfirmPay,
  handleCancel,
  handleConfirm,
  erorr,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (showNotiConfirmPay) {
      setIsChecked(false);
    }
  }, [showNotiConfirmPay]);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleConfirmClick = () => {
    handleConfirm(isChecked);
  };

  return (
    <>
      {showNotiConfirmPay && (
        <div className="notiConfirmPay_noti">
          <div className="notiConfirmPay_wrap">
            <div className="notiConfirmPay_wrap_title">
              Điều kiện thanh toán và hoàn trả tiền khi thanh toán qua cổng
              napas
            </div>
            <ul className="notiConfirmPay_wrap_content">
              <li className="notiConfirmPay_wrap_content-text">
                Trong một số trường hợp đặc biệt, để đảm bảo an toàn cho giao
                dịch thanh toán qua thẻ, hành khách có thể được yêu cầu xuất
                trình thẻ thanh toán ngân hàng và các giấy tờ tuỳ thân khi ra ga
                nhận vé.
              </li>
              <li className="notiConfirmPay_wrap_content-text">
                Khi trả vé hoặc đổi vé , hành khách sẽ phải ra ga để thực hiện
                thủ tục. Tiền mua vé sẽ được chuyển về Ngân hàng phát hành thẻ
                sau 1 ngày làm việc kể từ thời điểm đổi/trả vé. Hành khách có
                trách nhiệm liên hệ với Ngân hàng phát hành thẻ để hỗ trợ khách
                hàng khi có yêu cầu thông qua tổng đài hỗ trợ khách hàng số
                19006469.
              </li>
              <li className="notiConfirmPay_wrap_content-text">
                Quý khách sẽ có thời gian 10 phút để thực hiện thanh toán tại
                cổng thanh toán.
              </li>
              <div className={`notiConfirmPay_noti_note ${erorr}`}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span>
                  Tôi đồng ý với các điều kiện trên và tuân thủ
                  <a
                    target="_blank"
                    href="https://vr.com.vn/cac-quy-dinh/huong-dan-hanh-khach-thuc-hien-cac-quy-dinh-ve-mua-ve-va-thanh-toan-truc-tuyen.html"
                  >
                    các quy định về mua vé trực tuyển
                  </a>
                  của Tổng công ty Đường sắt Việt Nam
                </span>
              </div>
            </ul>

            <div className="notiConfirmPay_wrap_button">
              <button
                className="notiConfirmPay_wrap_btn2"
                onClick={handleCancel}
              >
                Huỷ
              </button>
              <button
                className="notiConfirmPay_wrap_btn1"
                onClick={handleConfirmClick}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotiConfirmPay;
