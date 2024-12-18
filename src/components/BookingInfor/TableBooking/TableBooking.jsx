import React from "react";
import "./TableBooking.scss";
import logo from "../../../assets/img/logo1.png";
import RowBooking from "./RowBooking/RowBooking";

const TableBooking = ({ reservationCode, totalPrice, trainTickets }) => {
  const handleDownloadClick = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write("<html><head><title>In vé</title>");

    // CSS cho giao diện in
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

    .print_total {
      font-size: 18px;
      color: red;
      text-align: right;
    }

    .print_price {
      font-size: 16px;
      color: #333;
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
    const firstHTML = `<div class="ticket-container">
    <div class="ticket-container_img">
      <img src="${logo}" class="logo" alt="Logo"/>
    </div>
    <p>Kính gửi quý khách hàng</p>
    <p>Xin chân trọng cảm ơn quý khách đã lựa chọn sử dụng dịch vụ vận tải hành khách của Tổng công ty Đường Sắt Việt Nam. Quý khách đã thực hiện mua vé thành công với thông tin như sau:</p>
    <div class="print">
      <div class="print_title">Mã đặt chỗ: ${reservationCode}</div>`;

    // Nội dung vé cần in
    const ticketsHTML = trainTickets
      .map(
        (ticket, index) => `
          <div class="print_wrap">
            <div class="print_wrap_left">
              <p class="print_left_title">Thông tin hành trình</p>
              <div class="print_left_info">
                <p class="print_left_info_text">Ga đi - Ga đến: ${
                  ticket.nameStartStation
                } - ${ticket.nameEndStation}</p>
                <p class="print_left_info_text">Tàu: ${ticket.trainCode}</p>
                <p class="print_left_info_text">Ngày đi: ${new Date(
                  ticket.timeStart
                ).toLocaleDateString("vi-VN")}</p>
                <p class="print_left_info_text">Toa: ${
                  ticket.trainCarNumber
                }</p>
                <p class="print_left_info_text">Chỗ: ${
                  ticket.trainSeatNumber
                } (${ticket.codeType})</p>
              </div>
            </div>
            <div class="print_wrap_right">
              <p class="print_left_title">Thông tin hành khách</p>
              <div class="print_left_info">
                <p class="print_left_info_text">Họ tên: ${
                  ticket.passengerName
                }</p>
                <p class="print_left_info_text">Loại vé: ${
                  ticket.passengerType === "ADULT"
                    ? "Người lớn"
                    : ticket.passengerType === "CHILD"
                    ? "Trẻ em"
                    : "Người cao tuổi"
                }</p>
                <p class="print_left_info_text">Giấy tờ: ${
                  ticket.cccd === "" ? ticket.dateOfBirth : ticket.cccd
                }</p>
              </div>
            </div>
          </div>
          <p class="print_price">Giá vé: ${ticket.finalPrice.toLocaleString(
            "en-US"
          )} VNĐ</p>

      `
      )
      .join(""); // Kết hợp tất cả các vé thành một chuỗi HTML duy nhất

    const lastHTML =
      firstHTML +
      ticketsHTML +
      `   <p class="print_total">Tổng tiền: ${totalPrice.toLocaleString(
        "en-US"
      )} VNĐ</p>       <p class="print_thanks">Tổng công ty Đường Sắt Việt Nam</p>
      </div>
    </div>`;

    // Chèn nội dung HTML vào tài liệu in
    printWindow.document.write(lastHTML);

    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Đảm bảo cửa sổ in sẵn sàng trước khi in
    printWindow.onload = () => {
      printWindow.print();
    };
  };

  return (
    <div className="tableBooking_wrapper">
      <div className="tableBooking_wrapper_title">Các giao dịch thành công</div>
      <div className="tableBooking_con">
        <table className="tableBooking_table">
          <thead>
            <tr>
              <th className="tableBooking_table_th">STT</th>
              <th className="tableBooking_table_th">Họ tên</th>
              <th className="tableBooking_table_th">Số CCCD/Hộ chiếu</th>
              <th className="tableBooking_table_th">Đối tượng</th>
              <th className="tableBooking_table_th">Loại chỗ</th>
              <th className="tableBooking_table_th">Thông tin vé</th>
              <th className="tableBooking_table_th">Trạng thái</th>
              <th className="tableBooking_table_th">Tải về</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={8} className="confirmInfo_table_title">
                <span onClick={handleDownloadClick}>Tải toàn bộ vé</span>
              </th>
            </tr>
            {trainTickets.map((ticket, index) => (
              <RowBooking
                key={index}
                reservationCode={reservationCode}
                ticket={ticket}
                index={index}
              />
            ))}
            {/* <tr>
              <th colSpan={8} className="confirmInfo_table_title">
                Sài Gòn - Hà Nội 24/11/2024
                <a href="" target="_blank">
                  Tải toàn bộ vé
                </a>
              </th>
            </tr> */}
          </tbody>
        </table>
        <div className="tableTicket_table_footer">
          <div className="tableTicket_table_footer-text">
            Tổng tiền : {totalPrice.toLocaleString("en-US")} VNĐ
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
