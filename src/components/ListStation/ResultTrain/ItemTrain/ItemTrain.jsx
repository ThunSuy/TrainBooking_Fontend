import React from "react";
import "./ItemTrain.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const ItemTrain = ({ item, onClick }) => {
  const [result, setResult] = useState("");

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
    <div className="resultTrain_item" onClick={() => onClick(item)}>
      <div className="resultTrain_item_header">
        <FontAwesomeIcon icon={faTrain} className="icon" />
        <span>{item.trainCode}</span>
      </div>
      <span className="resultTrain_item_time">{result}</span>
      <div style={{ marginTop: "8px" }}>
        <p className="resultTrain_item_text">Ga đi : {item.nameStartStation}</p>
        <p className="resultTrain_item_text">
          {new Date(item.departureTime).toLocaleDateString("vi-VN")}{" "}
          {new Date(item.departureTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="resultTrain_item_text">Ga đến : {item.nameEndStation}</p>
        <p className="resultTrain_item_text">
          {new Date(item.endTime).toLocaleDateString("vi-VN")}{" "}
          {new Date(item.endTime).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ItemTrain;
