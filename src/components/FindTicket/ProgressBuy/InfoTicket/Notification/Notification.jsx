import React from "react";
import "./Notification.scss";

const Notification = ({ showNoti, handleOpenNoti, handleCloseNoti }) => {
  return (
    <>
      {showNoti && (
        <div className="formInfoPeople_noti">
          <div className="noti_wrap">
            <div className="noti_wrap_title">Cảnh báo</div>
            <div className="noti_wrap_content">
              <div className="noti_wrap_content-text">
                Tổng Công ty DSVN khuyến cáo quý khách nên cung cấp đầy đủ và
                chính xác số giấy tờ tùy thân (CMND/Hộ chiếu), số điện thoại di
                động cùng với địa chỉ email để đảm báo quyền lợi trong quá trình
                sử dụng vé điện tử, soát vé trên tàu và trả vé.
              </div>
              <div className="noti_wrap_content-text">
                - Quý khách sẽ nhận được thông tin vé điện tử qua email nếu cung
                cấp địa chỉ email hợp lệ. Trả vé trực tuyến nay cũng có thể thực
                hiện qua xác thực bằng email với kênh thanh toán trực tuyến.
              </div>
              <div className="noti_wrap_content-text">
                - Quý khách có thể đăng ký nhận thông tin vé điện tử qua tin
                nhắn nếu cung cấp số điện thoại di động hợp lệ.
              </div>
              <div className="noti_wrap_content-text">
                Ngoài ra, nếu quý khách có nhu cầu lấy hóa đơn thì cần cung cấp
                đầy đủ và chính xác các thông tin xuất hóa đơn. Nếu quý khách
                tiếp tục thực hiện các bước sau mà không có thông tin xuất hóa
                đơn thì quý khách không thể lấy hóa đơn cho các vé đã đặt.
              </div>
            </div>
            <div className="noti_wrap_button">
              <button className="noti_wrap_btn1" onClick={handleOpenNoti}>
                Bổ sung thông tin
              </button>
              <button className="noti_wrap_btn2" onClick={handleCloseNoti}>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
