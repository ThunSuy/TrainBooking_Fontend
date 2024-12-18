import React from "react";
import "./BuySuccessTicket.scss";
import FormInfo from "../FormInfo/FormInfo";
import Header from "../Header/Header";
import PaymentMethod from "../../../PaymentMethod/PaymentMethod";
import ButtonPayTicket from "../ButtonPayTicket/ButtonPayTicket";
import Button from "../../../Button/Button";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import TableComplete from "../TableComplete/TableComplete";
import {
  faAnglesLeft,
  faAnglesRight,
  faCheck,
  faHome,
  faHouse,
  faMoneyCheck,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";

const BuySuccessTicket = ({ activeStep, checkFail, upActiveStep }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const reservationCode = localStorage.getItem("reservationCode");

  const bookerData = JSON.parse(localStorage.getItem("bookerData"));

  const [bookerRequest, setBookerRequest] = useState({
    fullName: bookerData.fullName,
    email: bookerData.email,
    phone: bookerData.phone,
    cccd: bookerData.cccd,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [upActiveStep]);

  const handleBackHome = () => {
    navigate("/");
  };

  const handlePrint = () => {
    navigate("/thongtindatcho");
  };

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        // Lấy query từ URL
        const params = new URLSearchParams(window.location.search);

        // Gửi API đến backend
        const response = await axios.get(
          "http://localhost:8081/vnpay-payment",
          {
            params,
          }
        );

        const { status } = response.data.result;

        // Điều hướng dựa vào kết quả
        if (status === "SUCCESS") {
          navigate("/payment-success", { state: response.data.result });
        } else {
          navigate("/payment-failed", { state: response.data.result });
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        // navigate("/payment-failed");
      }
    };

    fetchPaymentStatus();
  }, [navigate]);

  return (
    <>
      <Header activeStep={activeStep} />
      <div className="buyCuccessTicket">
        {activeStep === 2 ? (
          checkFail ? (
            <span className="payTicket_wrap_info">
              giao dịch không thành công
            </span>
          ) : (
            <span className="payTicket_wrap_info">
              giao dịch đang chờ thanh toán ...
            </span>
          )
        ) : activeStep === 3 ? (
          <span className="payTicket_wrap_info">giao dịch thành công</span>
        ) : null}
        <div className="buyCuccess_header">
          {activeStep === 2 && checkFail ? (
            ""
          ) : (
            <div className="buyCuccess_title">
              Cám ơn quý khách đã sử dụng dịch vụ vận chuyển hành khách của Tổng
              công ty Đường sắt Việt Nam. Quý khách đã thực hiện mua vé thành
              công với thông tin chi tiết như dưới đây:
            </div>
          )}
          <div className="buyCuccess_WrapID">
            <div className="buyCuccess_WrapID_text">
              Mã đặt chỗ :
              <span>
                {"  "}
                {reservationCode}
              </span>
            </div>
          </div>
        </div>
        <div>
          <TableComplete activeStep={activeStep} checkFail={checkFail} />
        </div>
        <div className="buyCuccessTicket_footer">
          {activeStep === 2 && checkFail && (
            <div className="buyCuccessTicket_pay">
              <PaymentMethod />
            </div>
          )}
          <div className="buyCuccessTicket_info">
            <FormInfo disabled={true} bookerRequest={bookerRequest} />
          </div>
          <div className="buyCuccess_sup">
            <div className="buyCuccess_sup_text">
              Quý khách có thể liên hệ với trung tâm hỗ trợ khách hàng 19006469
              để được trợ giúp.
            </div>
            <div className="buyCuccess_sup_text">
              Chúng tôi phục vụ quý khách 24 giờ trong ngày và 7 ngày trong
              tuần.
            </div>
          </div>
          {activeStep === 3 ? (
            <ButtonPayTicket
              iconLeft={faHome}
              nameLeft="Trang chủ"
              onClickLeft={handleBackHome}
              iconRight={faPrint}
              nameRight="In vé"
              onClickRight={handlePrint}
              btnCenter="btnCenter"
            />
          ) : (
            <div></div>
            // checkFail && (
            //   <ButtonPayTicket
            //     iconLeft={faHome}
            //     nameLeft="Trang chủ"
            //     // iconRight={faMoneyCheck}
            //     // nameRight="Thanh toán"
            //     btnCenter="btnCenter"
            //     bacgGrRight="success"
            //   />
            // )
          )}
        </div>
      </div>
    </>
  );
};

export default BuySuccessTicket;
