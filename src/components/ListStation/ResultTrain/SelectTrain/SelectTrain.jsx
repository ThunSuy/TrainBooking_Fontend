import React from "react";
import "./SelectTrain.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTrain } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const SelectTrain = ({ item, onClickBack }) => {
  const [result, setResult] = useState("");

  const typeDescriptions = [
    {
      codeType: "GN28",
      description: "Giường nằm khoang 4 điều hòa",
      price: item.trainDetail.trainCars[6].trainSeats[0].price,
    },
    {
      codeType: "GN42",
      description: "Giường nằm khoang 6 điều hòa",
      price: item.trainDetail.trainCars[2].trainSeats[0].price,
    },
    {
      codeType: "NM56",
      description: "Ngồi mềm điều hoà loại 56 ghế",
      price: item.trainDetail.trainCars[0].trainSeats[0].price,
    },
  ];

  const calculateDifference = () => {
    const startTime = new Date(item.departureTime);
    const endTime = new Date(item.endTime);

    const diffInMilliseconds = endTime - startTime;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    const days = Math.floor(diffInMinutes / (60 * 24));
    const hours = Math.floor((diffInMinutes % (60 * 24)) / 60);
    const minutes = diffInMinutes % 60;

    setResult(`${days} ngày, ${hours} giờ, ${minutes} phút`);
  };

  useEffect(() => {
    calculateDifference();
  }, []);

  return (
    <div className="selectTrain">
      <div className="selectTrain_header" onClick={onClickBack}>
        <div className="selectTrain_header_title">
          <FontAwesomeIcon icon={faTrain} className="icon" />
          <span>Tàu {item.trainCode}</span>
        </div>
        <div className="selectTrain_header_info">
          <div className="selectTrain_header_info_left">
            <p>Ga đi : {item.nameStartStation}</p>
            <p>
              Ngày đi :{" "}
              {new Date(item.departureTime).toLocaleDateString("vi-VN")}{" "}
              {new Date(item.departureTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="selectTrain_header_info_mid">
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </div>
          <div className="selectTrain_header_info_right">
            <p>Ga đến : {item.nameEndStation}</p>
            <p>
              Ngày đến : {new Date(item.endTime).toLocaleDateString("vi-VN")}{" "}
              {new Date(item.endTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="selectTrain_header_time">
          <span>Thời gian hành trình : {result}</span>
        </div>
      </div>
      <div className="selectTrain_wrap">
        <div className="selectTrain_wrap_left">
          <div className="selectTrain_wrap_header">Các ga trong hành trình</div>
          <table className="station-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ga đi</th>
                <th>Cự ly(Km)</th>
                <th>Ngày đi</th>
                <th>Giờ đến</th>
                <th>Giờ đi</th>
              </tr>
            </thead>
            <tbody>
              {item.trainRouteStationResponses.map((rs, index) => (
                <tr
                  key={index}
                  className={
                    rs.nameStation === item.nameStartStation ||
                    rs.nameStation === item.nameEndStation
                      ? "select"
                      : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{rs.nameStation}</td>
                  <td>{rs.distance}</td>
                  <td>
                    {new Date(rs.arrivalDuration).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    {new Date(rs.arrivalDuration).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {new Date(rs.departureDuration).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="selectTrain_wrap_right">
          <div className="selectTrain_wrap_header">Bảng giá vé</div>
          <table className="station-table2">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã</th>
                <th>Loại chỗ</th>
                <th>Giá vé (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {typeDescriptions.map((rs, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rs.description}</td>
                  <td>{rs.codeType}</td>
                  <td>{(rs.price * 1000).toLocaleString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="selectTrain_wrap_footer">
            <p>Chú ý : Giá vé đã bao gồm tiền bảo hiểm</p>
            <p>
              Giá có thể thay đổi theo 1 số điều kiện: Thời gian mua vé, đối
              tượng đi tàu, vị trí chỗ trên toa ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTrain;
