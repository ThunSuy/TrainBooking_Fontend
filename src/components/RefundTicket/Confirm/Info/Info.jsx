import React from "react";
import "./Info.scss";

const Info = () => {
  return (
    <div className="info">
      <div className="info_item">
        <p className="info_item_text">- Họ tên : Nguyễn Duy Thuần</p>
        <p className="info_item_text">Tàu SE1 Toa: 1 chỗ số: 28</p>
        <p className="info_item_text">
          Lệ phí trả vé : <span>101,000</span>
        </p>
      </div>
      <div className="info_item">
        <p className="info_item_text">- Số giấy tờ : 0213546238</p>
        <p className="info_item_text">- Tiền vé : 1,200,000 VNĐ</p>
        <p className="info_item_text">
          - Tiền trả : <span>999,000</span>VNĐ
        </p>
      </div>
    </div>
  );
};

export default Info;
