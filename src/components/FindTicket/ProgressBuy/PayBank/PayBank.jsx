import React from "react";
import "./PayBank.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import ButtonPayTicket from "../ButtonPayTicket/ButtonPayTicket";

const PayBank = ({ showQR, onClickLeft }) => {
  return (
    <>
      {showQR && (
        <div className="payBank">
          <div className="payBank_wrapper">
            <div className="payBank_wrapper-top">
              <div className="payBank_left">
                <div className="payBank_info">
                  <div className="payBank_info_header">Thông tin đơn hàng</div>
                  <div className="payBank_info_ncc">
                    <div className="payBank_info_title">Nhà cung cấp</div>
                    <div className="payBank_info_ncc_tt">
                      <img src="./src/assets/img/logo.png" />
                      <span className="payBank_info_text">
                        Công ty cổ phần vận tải đường sắt việt nam
                      </span>
                    </div>
                  </div>
                  <div className="payBank_info_tt">
                    <div className="payBank_info_title">Mã đặt chỗ</div>
                    <div className="payBank_info_text">18739772</div>
                  </div>
                  <div className="payBank_info_tt">
                    <div className="payBank_info_title">Mã thanh toán</div>
                    <div className="payBank_info_text">QL2TYY9</div>
                  </div>
                  <div className="payBank_info_tt1">
                    <div className="payBank_info_title">Số tiền</div>
                    <div className="payBank_info_text">1.000.000đ</div>
                  </div>
                </div>
                <div className="payBank_time">
                  <div className="payBank_time_title">
                    Đơn hàng này sẽ hết hạn sau
                  </div>
                  <div className="payBank_time_tg">
                    <div className="payBank_time_tg_wrap">
                      <div className="payBank_time_tg_wrap_num">22</div>
                      <div className="payBank_time_tg_wrap_text">Phút</div>
                    </div>
                    <div className="payBank_time_tg_wrap">
                      <div className="payBank_time_tg_wrap_num">22</div>
                      <div className="payBank_time_tg_wrap_text">Phút</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="payBank_right">
                <div className="payBank_right_title">
                  Quét mã QR để thanh toán
                </div>
                <div className="payBank_right_logo">
                  <img src="./src/assets/img/chu_momo.png" />
                </div>
                <div className="payBank_right_qr">
                  <img src="./src/assets/img/maQR_momo.jpg" />
                </div>
                <div className="payBank_right_hd">
                  <FontAwesomeIcon
                    icon={faQrcode}
                    className="payBank_right_hd-icon"
                  />
                  <div className="payBank_right_hd_name">
                    Sử dụng
                    <span>App MoMo</span>
                    hoặc
                    <span>ứng dụng ngân hàng</span>
                    để quét mã
                  </div>
                </div>
                <div className="payBank_right_ft">
                  <span>Gặp khó khi thanh toán?</span>
                  <a
                    href="https://www.momo.vn/huong-dan/huong-dan-thanh-toan-bang-hinh-thuc-quet-ma"
                    target="_blank"
                  >
                    Xem hướng dẫn
                  </a>
                </div>
              </div>
            </div>
            <div className="payBank_button">
              <ButtonPayTicket
                nameLeft="Để sau"
                bacgGrLeft="cancel"
                iconRight={faMoneyCheck}
                onClickLeft={onClickLeft}
                nameRight="Thanh toán xong"
                bacgGrRight="success"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayBank;
