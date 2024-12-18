import React from "react";
import "./RowBooking.scss";
import logo from "../../../../assets/img/logo1.png";

const RowBooking = ({ reservationCode, ticket, index }) => {
  const handleDownloadClick = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write("<html><head><title>In vé</title>");

    printWindow.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .ticket-container {
          background-color: #fff;
          padding: 8px;
          border-radius: 8px;
          user-select: none;
        }

        .ticket-container_img {
          background-color: #0091d4;
          padding: 10px
        }

        .print {
        }

        .print_wrap {
          display: flex;
          padding: 0 10px;
          border: 1px solid #ccc;
        }

        .print_title {
          font-size: 18px;
          color: #0082c0;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .print_wrap_left {
          flex: 1;
          margin-right: 20px;
          border-right: 1px solid #ccc;
        }

        .print_wrap_right {
          flex: 1;
          margin-left: 20px;
        }

        .print_left_title {
          font-size: 18px;
          color: #111;
        }

        .print_left_info {
          padding: 0 20px;
        }

        .print_left_info_text {
          font-size: 16px;
          color: #555;
        }

        .print_price {
          font-size: 18px;
          color: red;
          text-align: right;
        }

        .print_thanks {
          font-size: 20px;
          font-weight: bold;
          color: #111;
          text-align: right;
          margin-top: -8px;
        }


        @media print {
          body {
            -webkit-print-color-adjust: exact; /* Đảm bảo nền và màu sắc được in */
            print-color-adjust: exact;
          }
        
          .ticket-container {
            background-color: #ffffff !important; /* Đảm bảo nền được in */
            border: none !important;
          }

        }
      </style>
    `);

    printWindow.document.write("</head><body>");

    // Nội dung vé cần in
    printWindow.document.write(`
      <div class="ticket-container">
        <div class="ticket-container_img"><img src=${logo} class="logo"/></div>
        <p>Kính gửi quý khách hàng</p>
        <p>Xin chân trọng cảm ơn quý khách đã lựa chọn sử dụng dịch vụ vận tải hành khách của Tổng công ty Đường Sắt Việt Nam. Quý khách đã thực hiện mua vé thành công với thông tin như sau:</p>
        <div class="print">
          <div class="print_title">Mã đặt chỗ : ${reservationCode}</div>
          <div class="print_wrap">
            <div class="print_wrap_left">
              <p class="print_left_title">Thông tin hành trình</p>
              <div class="print_left_info">
                <p class="print_left_info_text">Ga đi - Ga đến : ${
                  ticket.nameStartStation
                } - ${ticket.nameEndStation}</p>
                <p class="print_left_info_text">Tàu : ${ticket.trainCode}</p>
                <p class="print_left_info_text">Ngày đi : ${new Date(
                  ticket.timeStart
                ).toLocaleDateString("vi-VN")}</p>
                <p class="print_left_info_text">Toa : ${
                  ticket.trainCarNumber
                }</p>
                <p class="print_left_info_text">Chỗ : ${
                  ticket.trainSeatNumber
                } (${ticket.codeType})</p>
              </div>
            </div>
            <div class="print_wrap_right">
              <p class="print_left_title">Thông tin hành khách</p>
              <div class="print_left_info">
                <p class="print_left_info_text">Họ tên : ${
                  ticket.passengerName
                }</p>
                <p class="print_left_info_text">Loại vé : ${
                  ticket.passengerType === "ADULT"
                    ? "Người lớn"
                    : ticket.passengerType === "CHILD"
                    ? "Trẻ em"
                    : "Người cao tuổi"
                }</p>
                <p class="print_left_info_text">Giấy tờ : ${
                  ticket.cccd === "" ? ticket.dateOfBirth : ticket.cccd
                }</p>
              </div>
            </div>
        </div>
        <p class="print_price">Giá vé : ${ticket.finalPrice.toLocaleString(
          "en-US"
        )} VNĐ</p>
        <p class="print_thanks">Tổng công ty Đường Sắt Việt Nam</p>
      </div>
    `);

    printWindow.document.write("</body></html>");
    printWindow.document.close();

    printWindow.print();
  };

  return (
    <tr className="rowBooking_table_tr">
      <td className="rowBooking_table_td">{index + 1}</td>
      <td className="rowBooking_table_td">{ticket.passengerName}</td>
      <td className="rowBooking_table_td">
        {ticket.cccd === "" ? ticket.dateOfBirth : ticket.cccd}
      </td>
      <td className="rowBooking_table_td">
        {ticket.passengerType === "ADULT"
          ? "Người lớn"
          : ticket.passengerType === "CHILD"
          ? "Trẻ em"
          : "Người cao tuổi"}
      </td>
      <td className="rowBooking_table_td">{`${ticket.nameStartStation} - ${ticket.nameEndStation} (${ticket.codeType})`}</td>
      <td className="rowBooking_table_td">
        <div className="rowBooking_table-text">{ticket.trainCode}</div>
        <div className="rowBooking_table-text">
          {new Date(ticket.timeStart).toLocaleDateString("vi-VN")}{" "}
          {new Date(ticket.timeStart).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="rowBooking_table-text">
          Toa : {ticket.trainCarNumber} chỗ số : {ticket.trainSeatNumber}
        </div>
      </td>
      <td className="rowBooking_table_td">Đã thanh toán.</td>
      <td className="rowBooking_table_td">
        <span onClick={handleDownloadClick}>Tải về</span>
      </td>
    </tr>
  );
};

export default RowBooking;
