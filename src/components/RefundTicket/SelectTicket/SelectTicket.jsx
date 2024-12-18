import React from "react";
import "./SelectTicket.scss";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import FormLookUp from "../../../components/FormLookUp/FormLookUp";
import TableRefund from "./TableRefund/TableRefund";
import FormInfo from "../../FindTicket/ProgressBuy/FormInfo/FormInfo";
import Button from "../../Button/Button";

const SelectTicket = ({ activeStep, handleGoNext }) => {
  const [showTable, setShowtable] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleShowTable = () => {
    setShowtable(true);
  };

  const handleRequest = () => {
    handleGoNext();
  };

  return (
    <div className="selectTicket">
      <Header activeStep={activeStep} />
      <span className="payTicket_wrap_info">TRẢ VÉ TRỰC TUYẾN</span>
      <div className="homeCheckTicket_noti">
        <p>
          Trả vé trực tuyến chỉ áp dụng với trường hợp khách hàng đã thanh toán
          trực tuyến (qua cổng thanh toán, ví điện tử, app ngân hàng) và có điền
          email khi mua vé.
        </p>
        <p>
          Nếu quý khách thanh toán bằng tiền mặt, trả sau qua ứng dụng ngân hàng
          và atm, chuyển khoản hoặc trả vé khi có sự cố bãi bỏ tàu vui lòng thực
          hiện thủ tục tại các nhà ga, đại lý bán vé.
        </p>
      </div>
      <FormLookUp
        onClick={handleShowTable}
        title="Để hiển thị các vé cần trả, vui lòng điền chính xác 3 thông tin dưới đây :"
      />
      <div className="homeCheckTicket_formErorr">Không có dữ liệu</div>
      {showTable && (
        <>
          <TableRefund />
          <div className="selectTicket_footer">
            <FormInfo disabled={true} />
            <div className="selectTicket_footer_btn">
              <Button name="Yêu cầu trả vé" onClick={handleRequest} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectTicket;
