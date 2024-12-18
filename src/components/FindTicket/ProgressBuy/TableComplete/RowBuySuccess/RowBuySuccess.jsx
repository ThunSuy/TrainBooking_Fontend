import React from "react";
import "./RowBuySuccess.scss";

const RowBuySuccess = ({ ticket, activeStep, checkFail }) => {
  return (
    <tr className="rowBuySuccess_table_tr">
      <td className="rowBuySuccess_table_td">{ticket.passengerName}</td>
      <td className="rowBuySuccess_table_td">
        {ticket.cccd === "" ? ticket.dateOfBirth : ticket.cccd}
      </td>
      <td className="rowBuySuccess_table_td">
        {ticket.passengerType === "ADULT"
          ? "Người lớn"
          : ticket.passengerType === "CHILD"
          ? "Trẻ em"
          : "Người cao tuổi"}
      </td>
      <td className="rowBuySuccess_table_td">
        {`${ticket.nameStartStation} - ${ticket.nameEndStation} (${ticket.codeType})`}
      </td>
      <td className="rowBuySuccess_table_td">
        <div className="rowBuySuccess_table-text">{ticket.trainCode}</div>
        <div className="rowBuySuccess_table-text">
          {new Date(ticket.timeStart).toLocaleDateString("vi-VN")}{" "}
          {new Date(ticket.timeStart).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="rowBuySuccess_table-text">
          Toa : {ticket.trainCarNumber} chỗ số : {ticket.trainSeatNumber}
        </div>
      </td>
      <td className="rowBuySuccess_table_td">
        {activeStep === 2
          ? checkFail
            ? "Lỗi giao dịch tại cổng thanh toán."
            : "Đang xử lý thanh toán trực tuyến."
          : activeStep === 3
          ? "Đã thanh toán."
          : null}
      </td>
      <td className="rowBuySuccess_table_td">
        {" "}
        {ticket.finalPrice.toLocaleString("en-US")}
      </td>
    </tr>
  );
};

export default RowBuySuccess;
