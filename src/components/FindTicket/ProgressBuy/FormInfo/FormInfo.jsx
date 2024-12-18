import React from "react";
import "./FormInfo.scss";

const FormInfo = ({ bookerRequest }) => {
  return (
    <div className="formInfoPeople_info">
      <div className="formInfoPeople_header">Thông tin người đặt vé</div>
      <div className="formInfoPeople_content">
        <form className="formInfoPeople_form">
          <div className="form_wrapper">
            <div className="form_wrapper-title">
              <span className="form_wrapper-title-text">Họ và tên</span>
            </div>
            <input
              placeholder="Họ và tên"
              className="form_wrapper_ip "
              type="text"
              disabled={true}
              value={bookerRequest && bookerRequest.fullName}
            />
          </div>
          <div className="form_wrapper">
            <div className="form_wrapper-title">
              <span className="form_wrapper-title-text">Số CCCD/Hộ chiếu</span>
            </div>
            <input
              placeholder="Số CMND/Hộ chiếu"
              className="form_wrapper_ip "
              type="text"
              disabled={true}
              value={bookerRequest && bookerRequest.cccd}
            />
          </div>
          <div className="form_wrapper">
            <div className="form_wrapper-title">
              <span className="form_wrapper-title-text">Email</span>
            </div>
            <input
              placeholder="Email"
              className="form_wrapper_ip "
              type="text"
              disabled={true}
              value={bookerRequest && bookerRequest.email}
            />
          </div>
          <div className="form_wrapper">
            <div className="form_wrapper-title">
              <span className="form_wrapper-title-text">Số di động</span>
            </div>
            <input
              placeholder="Số di động"
              className="form_wrapper_ip "
              type="text"
              disabled={true}
              value={bookerRequest && bookerRequest.phone}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormInfo;
