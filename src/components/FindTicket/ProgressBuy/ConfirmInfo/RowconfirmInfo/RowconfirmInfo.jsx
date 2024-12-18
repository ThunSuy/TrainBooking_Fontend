import React from "react";
import "./RowconfirmInfo.scss";

const RowconfirmInfo = ({ ticket, stt }) => {
  return (
    <tr className="rowconfirmInfo_table_tr">
      <td className="rowconfirmInfo_table_td">{stt}</td>
      <td className="rowconfirmInfo_table_td">
        <div className="rowconfirmInfo_table_td2">
          <div className="rowconfirmInfo_table_td2-left">
            <div>
              Họ tên: <span>{ticket.passengerName}</span>
            </div>
            <div>
              Số giấy tờ:{" "}
              <span>
                {ticket.cccd === "" ? ticket.dateOfBirth : ticket.cccd}
              </span>
            </div>
          </div>
          <div className="rowconfirmInfo_table_td2-right">
            <div>
              Đối tượng: <span>{ticket.passengerType}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="rowconfirmInfo_table_td">
        <div className="rowconfirmInfo_table_td3">
          <div className="rowconfirmInfo_table_td3-left">
            <div>
              Hành trình:{" "}
              <span>
                {ticket.trainCode || ticket.trainCode1}{" "}
                {ticket.nameStartStation || ticket.nameStartStation1} -{" "}
                {ticket.nameEndStation || ticket.nameEndStation1}
              </span>{" "}
            </div>
            <div>
              <span>
                Toa {ticket.trainCarNumber} chỗ {ticket.numSeat} Ngồi{" "}
                {ticket.trainCarTypeCode}
              </span>
            </div>
          </div>
          <div className="rowconfirmInfo_table_td3-right">
            <div>
              {new Date(
                ticket.departureTime || ticket.departureTime1
              ).toLocaleDateString("vi-VN")}{" "}
              <span>
                {new Date(
                  ticket.departureTime || ticket.departureTime1
                ).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="rowconfirmInfo_table_td">
        {" "}
        {(ticket.finalPrice * 1000).toLocaleString("en-US")}
      </td>
    </tr>
  );
};

export default RowconfirmInfo;
