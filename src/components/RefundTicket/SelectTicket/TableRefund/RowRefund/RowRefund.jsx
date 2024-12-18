import React from "react";
import "./RowRefund.scss";

const RowRefund = () => {
  return (
    <tr className="rowRefund_table_tr">
      <td className="rowRefund_table_td">1</td>
      <td className="rowRefund_table_td">
        <span>Nguyễn Duy Thuần</span>
        <div className="rowRefund_table-text">Người lớn</div>
        <div className="rowRefund_table-text">Số giầy tờ : 0124154852465</div>
      </td>
      <td className="rowRefund_table_td">
        <div className="rowRefund_table-text">SE2 11/11/2024 19:20</div>
        <div className="rowRefund_table-text">Toa : 4 chỗ số : 28</div>
        <div className="rowRefund_table-text">Ngồi mềm điều hoà</div>
        <div className="rowRefund_table-text">Mã vé : 10465487512</div>
      </td>
      <td className="rowRefund_table_td">1,111,000</td>
      <td className="rowRefund_table_td">Bình thường</td>
      <td className="rowRefund_table_td">101,000</td>
      <td className="rowRefund_table_td">888,000</td>
      <td className="rowRefund_table_td">Đã thanh toán.</td>
      <td className="rowRefund_table_td">
        <input type="checkbox" />
      </td>
    </tr>
  );
};

export default RowRefund;
