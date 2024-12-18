import React from "react";
import "./ConfirmInfo.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RowconfirmInfo from "./RowconfirmInfo/RowconfirmInfo";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ButtonPayTicket from "../ButtonPayTicket/ButtonPayTicket";
import PayBank from "../../ProgressBuy/PayBank/PayBank";
import Header from "../Header/Header";
import NotiConfirmPay from "./NotiConfirmPay/NotiConfirmPay";

const ConfirmInfo = ({ goToPreviousStep, goToNextStep, methodPay, total }) => {
  const navigate = useNavigate();

  const [showNotiConfirmPay, setShowNotiConfirmPay] = useState(false);
  const [erorr, setErorr] = useState("none");

  const [oneWayTickets, setOneWayTickets] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [roundTickets, setRoundTripTickets] = useState(
    JSON.parse(localStorage.getItem("selectedSeats1"))
  );

  const bookerData = JSON.parse(localStorage.getItem("bookerData"));

  const [bookerRequest, setBookerRequest] = useState({
    id: bookerData.id,
    fullName: bookerData.fullName,
    email: bookerData.email,
    phone: bookerData.phone,
    cccd: bookerData.cccd,
  });

  const allTickets = [...oneWayTickets, ...roundTickets];

  const convertDate = (inputDate) => {
    // Tách ngày, tháng, năm từ chuỗi input
    const [day, month, year] = inputDate.split("/").map(Number);

    // Định dạng chuỗi theo yêu cầu với số 0 đứng trước (nếu cần)
    const formattedDay = day.toString().padStart(2, "0");
    const formattedMonth = month.toString().padStart(2, "0");

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const [listTrainTicketRequest, setListTrainTicketRequest] = useState(
    allTickets.map((ticket, index) => ({
      idBooking: null,
      idTrainTrip: ticket.idTrainTrip || ticket.idTrainTrip1,
      idStartStation: ticket.idRouteStartStation || ticket.idRouteStartStation1,
      idEndStation: ticket.idRouteEndStation || ticket.idRouteEndStation1,
      idTrainSeat: ticket.id || "",
      passengerName: ticket.passengerName || "",
      passengerType:
        ticket.passengerType === "Người lớn"
          ? "ADULT"
          : ticket.passengerType === "Trẻ em"
          ? "CHILD"
          : ticket.passengerType === "Người lớn tuổi"
          ? "SENIOR"
          : "ADULT",
      cccd: ticket.cccd || "",
      dateOfBirth:
        ticket.dateOfBirth !== "" ? convertDate(ticket.dateOfBirth) : "",
      finalPrice: ticket.finalPrice * 1000 || 0,
    }))
  );

  const [formData, setFormData] = useState({
    bookerId: bookerData.id,
    listTrainTicketRequest: listTrainTicketRequest,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleOpenFormNoti = () => {
    setShowNotiConfirmPay(true);
  };

  const handleCancel = () => {
    setShowNotiConfirmPay(false);
  };

  const handleBack = () => {
    goToPreviousStep(methodPay);
  };

  const handleConfirm = async (isChecked) => {
    if (isChecked) {
      setErorr("none");
      setShowNotiConfirmPay(false);

      try {
        const result = await axios.post(
          "http://localhost:8081/booking/add",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const paymentUrl = result.data.result.paymentUrl;
        const reservationCode = result.data.result.reservationCode;
        const trainTickets = result.data.result.trainTickets;
        const totalPrice = result.data.result.totalPrice;

        // Lưu xuống localStorage
        localStorage.setItem("reservationCode", reservationCode);
        localStorage.setItem("trainTickets", JSON.stringify(trainTickets));
        localStorage.setItem("totalPrice", JSON.stringify(totalPrice));

        if (paymentUrl) {
          // Chuyển hướng đến VNPay
          localStorage.removeItem("selectedSeats");
          localStorage.removeItem("selectedSeats1");

          window.location.href = paymentUrl;
        } else {
          console.error("Payment URL is missing in the response");
        }
      } catch (err) {
        console.error("Error:", err.response?.data || err.message);
        alert("Có lỗi xảy ra trong quá trình thanh toán, vui lòng thử lại.");
      } finally {
      }
      ``;
    } else {
      setErorr("erorr");
    }
  };

  return (
    <>
      {/* <PayBank showQR={true} /> */}
      <NotiConfirmPay
        showNotiConfirmPay={showNotiConfirmPay}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        erorr={erorr}
      />
      <Header activeStep={1} />
      <div className="confirmInfo">
        <div className="confirmInfo_title">
          Xác nhận thông tin đặt mua vé tàu
        </div>
        <div className="confirmInfo_info">
          <div className="confirmInfo_info-title">Thông tin người mua vé</div>
          <div className="confirmInfo_info-info">
            <span className="info_text">- Họ và tên:</span>
            <span className="info_text_bold">{bookerRequest.fullName}</span>
          </div>
          <div className="confirmInfo_info-info">
            <span className="info_text">- Số CCCD/Hộ chiếu:</span>
            <span className="info_text_bold">{bookerRequest.cccd}</span>
          </div>
          <div className="confirmInfo_info-info">
            <span className="info_text">- Số di động:</span>
            <span className="info_text_bold"> {bookerRequest.phone}</span>
          </div>
          <div className="confirmInfo_info-info">
            <span className="info_text">- Email:</span>
            <span className="info_text_bold">{bookerRequest.email}</span>
          </div>
          <div className="confirmInfo_info-info">
            <span className="info_text">- Phương thức thanh toán:</span>
            <span className="info_text_bold">
              Thanh toán qua ví {methodPay}
            </span>
          </div>
        </div>
        <div className="confirmInfo_table">
          <div className="confirmInfo_info-title">Thông tin vé mua</div>
          <div className="confirmInfo_con">
            <table className="confirmInfo_table">
              <thead>
                <tr>
                  <th className="confirmInfo_table_th">STT</th>
                  <th className="confirmInfo_table_th">Thông tin người đi</th>
                  <th className="confirmInfo_table_th">Thông tin vé</th>
                  <th className="confirmInfo_table_th">Thành tiền (VNĐ)</th>
                </tr>
              </thead>
              <tbody>
                {oneWayTickets.map((ticket, index) => (
                  <RowconfirmInfo key={index} ticket={ticket} stt={index + 1} />
                ))}
                {roundTickets.map((ticket, index) => (
                  <RowconfirmInfo key={index} ticket={ticket} stt={index + 1} />
                ))}
              </tbody>
            </table>
            <div className="confirmInfo_table_footer">
              <div className="confirmInfo_table_footer-text">
                Tổng tiền : {(total * 1000).toLocaleString("en-US")} VNĐ
              </div>
            </div>
          </div>
          <div className="confirmInfo_note">
            Quý khách vui lòng kiểm tra kỹ và xác nhận các thông tin đã nhập
            trước khi thực hiện giao dịch mua vé. Sau khi thực hiện giao dịch
            thanh toán ở trang tiếp theo quý khách sẽ không thể thay đổi được
            thông tin mua vé trên.
          </div>
          <ButtonPayTicket
            iconLeft={faAnglesLeft}
            nameLeft="Nhập lại"
            onClickLeft={handleBack}
            iconRight={faAnglesRight}
            nameRight="Đồng ý xác nhận"
            onClickRight={handleOpenFormNoti}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmInfo;
