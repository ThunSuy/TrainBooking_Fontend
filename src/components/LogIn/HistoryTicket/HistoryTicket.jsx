import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HistoryTicket.scss";
import DetailHistory from "./DetailHistory/DetailHistory";

const HistoryTicket = () => {
  const [showDetails, setShowDetails] = useState(new Set());
  const [listHistory, setListHistory] = useState([]);

  const bookerData = JSON.parse(localStorage.getItem("bookerData"));

  useEffect(() => {
    const fetchBookingHistory = async () => {
      // const email = "limartinb8ayr@gmail.com";
      const email = bookerData.email;
      try {
        const response = await axios.get(
          `http://localhost:8081/booking/history?email=${email}`
        );

        if (response && response.data && response.data.code === 1000) {
          setListHistory(response.data.result.list);
        } else {
          console.error("API error: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchBookingHistory();
  }, []);

  const handleShow = (reservationCode) => {
    setShowDetails((prevState) => {
      const newState = new Set(prevState);
      if (newState.has(reservationCode)) {
        newState.delete(reservationCode);
      } else {
        newState.add(reservationCode);
      }
      return newState;
    });
  };

  return (
    <div className="historyTicket">
      <div className="historyTicket_title">Lịch sử đặt vé</div>
      {listHistory.length === 0 ? (
        <div className="historyTicket_noti">
          <p>
            Hiện tại bạn chưa có lịch sử đặt vé. Vui lòng thực hiện đặt vé để
            trải nghiệm dịch vụ của chúng tôi.
          </p>
        </div>
      ) : (
        <div className="historyTicket_wrap">
          {listHistory
            .slice()
            .reverse()
            .map((item, index) => (
              <div className="historyTicket_wrap_list" key={index}>
                <div className="historyTicket_wrap_item">
                  <p className="historyTicket_wrap_item_title">
                    Mã đặt chỗ: <span>{item.reservationCode}</span>
                  </p>
                  <p className="historyTicket_wrap_item_title">
                    Ngày đặt :{" "}
                    <span>
                      {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </p>
                  <p className="historyTicket_wrap_item_title">
                    Thời gian đặt :{" "}
                    <span>
                      {new Date(item.createdAt).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="historyTicket_wrap_item_title">
                    Tổng tiền :{" "}
                    <span>{item.totalPrice.toLocaleString("en-US")} VNĐ</span>
                  </p>
                  <div
                    className="historyTicket_wrap_item_btn"
                    onClick={() => handleShow(item.reservationCode)}
                  >
                    <span>
                      {showDetails.has(item.reservationCode) ? "Ẩn" : "Hiện"}
                    </span>
                  </div>
                </div>
                {showDetails.has(item.reservationCode) && (
                  <div className="detailHistory">
                    <div className="detailHistory_wrap">
                      <table className="station-table">
                        <thead>
                          <tr>
                            <th>Mã vé</th>
                            <th>Họ tên</th>
                            <th>Số CCCD/Hộ chiếu</th>
                            <th>Đối tượng</th>
                            <th>Ga đi</th>
                            <th>Ga đến</th>
                            <th>Tàu</th>
                            <th>Loại chỗ</th>
                            <th>Ngày đi</th>
                            <th>Thời gian</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.trainTickets.map((rs, index1) => (
                            <DetailHistory key={index1} result={rs} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTicket;
