import React from "react";
import "./HomeBookingInfo.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import FormLookUp from "../../FormLookUp/FormLookUp";
import FormInfo from "../../FindTicket/ProgressBuy/FormInfo/FormInfo";
import TableBooking from "../TableBooking/TableBooking";

const HomeBookingInfo = () => {
  const [checkShowTable, setCheckShowTable] = useState();

  const [bookerRequest, setBookerRequest] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [trainTickets, setTrainTickets] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const [reservationCode, setReservationCode] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleBtn = async (maDatCho, email, sodt) => {
    const formData = {
      reservationCode: maDatCho?.trim(),
      email: email?.trim() || "",
      phone: sodt?.trim() || "",
    };

    setReservationCode(formData.reservationCode);

    try {
      const response = await axios.post(
        "http://localhost:8081/booking/search",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setBookerRequest(response.data.result.bookerResponse);
      setTotalPrice(response.data.result.totalPrice);
      setTrainTickets(response.data.result.trainTickets);
      setPaymentStatus(response.data.result.paymentStatus);

      setCheckShowTable(true);
    } catch (err) {
      if (err.response) {
        console.error("Response error:", err.response.data);
        setPaymentStatus("UNPAID");
        setCheckShowTable(false);
      } else {
        console.error("Request error:", err.message);
        setCheckShowTable(false);
      }
    }
  };

  return (
    <div className="homeBookingInfo">
      <span className="payTicket_wrap_info">tra cứu thông tin đặt chỗ</span>
      <FormLookUp
        onClick={handleBtn}
        checkStar={true}
        title="Để tra cứu thông tin, quý khách vui lòng nhập chính xác 3 thông tin bên dưới."
      />
      {(paymentStatus === "UNPAID" || paymentStatus === "CANCELLED") && (
        <div className="homeCheckTicket_formErorr">
          Không tìm thấy hồ sơ đặt vé này
        </div>
      )}
      {/* {(paymentStatus === "UNPAID" || paymentStatus === "CANCELLED") && (
        <div className="homeCheckTicket_formErorr">
          Không tìm thấy hồ sơ đặt vé này
        </div>
      )} */}
      {checkShowTable && paymentStatus === "PAID" && (
        <>
          <TableBooking
            reservationCode={reservationCode}
            totalPrice={totalPrice}
            trainTickets={trainTickets}
          />
          <div className="homeBookingInfo_tt">
            <FormInfo disabled={true} bookerRequest={bookerRequest} />
          </div>
        </>
      )}
    </div>
  );
};

export default HomeBookingInfo;
