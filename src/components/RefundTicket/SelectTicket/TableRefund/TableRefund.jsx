import React from "react";
import "./TableRefund.scss";
import RowRefund from "./RowRefund/RowRefund";

const TableRefund = () => {
  return (
    <div className="tableRefund_wrapper">
      <div className="tableRefund_wrapper_title">Các giao dịch thành công</div>
      <div className="tableRefund_con">
        <table className="tableRefund_table">
          <thead>
            <tr>
              <th className="tableRefund_table_th">#</th>
              <th className="tableRefund_table_th">Họ tên</th>
              <th className="tableRefund_table_th">Thông tin vé</th>
              <th className="tableRefund_table_th">Thành tiền (VNĐ)</th>
              <th className="tableRefund_table_th">Loại trả vé</th>
              <th className="tableRefund_table_th">Lệ phí trả vé</th>
              <th className="tableRefund_table_th">Tiền trả lại</th>
              <th className="tableRefund_table_th">trạng thái</th>
              <th className="tableRefund_table_th">Chọn vé trả</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={9} className="confirmInfo_table_title">
                Hà Nội - Sài Gòn 14/11/2024
              </td>
            </tr>
            <RowRefund />
            <RowRefund />
            <tr>
              <td colSpan={9} className="confirmInfo_table_title">
                Sài Gòn - Hà Nội 24/11/2024
              </td>
            </tr>
            <RowRefund />
            <RowRefund />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRefund;
