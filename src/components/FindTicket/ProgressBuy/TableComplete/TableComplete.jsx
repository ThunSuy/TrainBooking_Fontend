import React from "react";
import "./TableComplete.scss";
import RowBuySuccess from "./RowBuySuccess/RowBuySuccess";

const TableComplete = ({ activeStep, checkFail }) => {
  const trainTickets = JSON.parse(localStorage.getItem("trainTickets"));
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  return (
    <div className="tableTicket_wrapper">
      <div className="tableTicket_wrapper_title">Thông tin vé</div>
      <div className="tableTicket_con">
        <table className="tableTicket_table">
          <thead>
            <tr>
              <th className="tableTicket_table_th">Họ tên</th>
              <th className="tableTicket_table_th">Số CCCD/Hộ chiếu</th>
              <th className="tableTicket_table_th">Đối tượng</th>
              <th className="tableTicket_table_th">Loại chỗ</th>
              <th className="tableTicket_table_th">Thông tin vé</th>
              <th className="tableTicket_table_th">Trạng thái</th>
              <th className="tableTicket_table_th">Thành tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td colSpan={7} className="confirmInfo_table_title">
                Hà Nội - Sài Gòn 14/11/2024
              </td>
            </tr> */}
            {trainTickets.map((ticket, index) => (
              <RowBuySuccess
                ticket={ticket}
                activeStep={activeStep}
                checkFail={checkFail}
              />
            ))}
            {/* <tr>
              <td colSpan={7} className="confirmInfo_table_title">
                Hà Nội - Sài Gòn 14/11/2024
              </td>
            </tr> */}
          </tbody>
        </table>
        <div className="tableTicket_table_footer">
          <div className="tableTicket_table_footer-text">
            Tổng tiền : {totalPrice.toLocaleString("en-US")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComplete;
