import React from "react";
import "./PaymentMethod.scss";
import imgMomo from "../../assets/img/momo.png";
import imgZaloPay from "../../assets/img/zalopay.png";
import imgVnPay from "../../assets/img/vnpay.png";

const PaymentMethod = ({
  showCheckBox,
  erorr,
  handleSelectMethod,
  selectedMethod,
}) => {
  return (
    <div className="formInfoPeople_pay">
      {showCheckBox ? (
        <div className="formInfoPeople_header">Phương thức thanh toán</div>
      ) : (
        <div className="formInfoPeople_header">
          Để thay đổi phương thức thanh toán, bấm vào phương thức thanh toán bên
          dưới
        </div>
      )}

      <ul className="formInfoPeople_pay_list">
        {/* <li className={`formInfoPeople_pay_item ${erorr ? "erorr" : ""}`}>
          {showCheckBox && (
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === "momo"}
              onChange={() => handleSelectMethod("momo")}
            />
          )}
          <div className="info_logo">
            <img src={imgMomo} alt="Momo" />
          </div>
          <div className="formInfoPeople_pay_item-info">
            <div className="info_title">Thanh toán qua Momo</div>
            <div className="info_text">
              - QR Pay trên ứng dụng Mobile Banking của các ngân hàng và Ví
              Momo.
            </div>
          </div>
        </li> */}

        {/* <li className={`formInfoPeople_pay_item ${erorr ? "erorr" : ""}`}>
          {showCheckBox && (
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === "zalopay"}
              onChange={() => handleSelectMethod("zalopay")}
            />
          )}
          <div className="info_logo">
            <img src={imgZaloPay} alt="ZaloPay" />
          </div>
          <div className="formInfoPeople_pay_item-info">
            <div className="info_title">Thanh toán qua ZaloPay</div>
            <div className="info_text">
              - QR Pay trên ứng dụng Mobile Banking của các ngân hàng và Ví
              ZaloPay.
            </div>
          </div>
        </li> */}

        <li className={`formInfoPeople_pay_item ${erorr ? "erorr" : ""}`}>
          {showCheckBox && (
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedMethod === "vnpay"}
              onChange={() => handleSelectMethod("vnpay")}
            />
          )}
          <div className="info_logo">
            <img src={imgVnPay} alt="VNPay" />
          </div>
          <div className="formInfoPeople_pay_item-info">
            <div className="info_title">Thanh toán qua VNPay</div>
            <div className="info_text">
              - Thẻ quốc tế phát hành trong nước và nước ngoài: Visa, Master,
              JCB, UnionPay, Amex, Google Pay, Apple Pay, Samsung Pay
            </div>
            <div className="info_text">- Thẻ ATM/Tài khoản nội địa</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default PaymentMethod;
