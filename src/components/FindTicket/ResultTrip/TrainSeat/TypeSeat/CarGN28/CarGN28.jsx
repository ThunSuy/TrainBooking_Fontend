import React, { useState } from "react";
import Seat from "../Seat/Seat";
import "./CarGN28.scss";

const CarGN28 = ({ trainSeats, onClick, selectedSeats }) => {
  const seats1 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 1 && seat.trainSeatNumber <= 14
  );
  const seats2 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 15 && seat.trainSeatNumber <= 28
  );
  return (
    <div className="TypeSeat_GN28">
      <div className="TypeSeat_GN28_wrap">
        <div className="GN28_title">
          <div className="GN28_title-text">khoang 1</div>
          <div className="GN28_title-text">khoang 2</div>
          <div className="GN28_title-text">khoang 3</div>
          <div className="GN28_title-text">khoang 4</div>
          <div className="GN28_title-text">khoang 5</div>
          <div className="GN28_title-text">khoang 6</div>
          <div className="GN28_title-text">khoang 7</div>
        </div>
        <div className="GN28_container">
          <div className="GN28_container_left">
            <div className="GN28_container_left-text">T2</div>
            <div className="GN28_container_left-text">T1</div>
          </div>
          <div className="GN28_container_right">
            <ul className="GN28_container_right_list">
              {seats1.map((seat, index) => (
                <li key={index} className="GN28_container_right_item">
                  <Seat
                    numSeat={seat.trainSeatNumber}
                    Type={
                      selectedSeats.some(
                        (selectedSeat) =>
                          selectedSeat.numSeat === seat.trainSeatNumber
                      )
                        ? "active"
                        : !seat.status
                        ? "booked"
                        : "empty"
                    }
                    status={!seat.status ? "Chỗ đã bán" : "Chỗ trống"}
                    price={
                      !seat.status
                        ? "Chỗ đã bán"
                        : `Giá: ${(seat.price * 1000).toLocaleString(
                            "en-US"
                          )} VNĐ`
                    }
                    onClick={
                      seat.status
                        ? (numSeat) => {
                            onClick(numSeat, seat.id, seat.price);
                          }
                        : undefined
                    }
                  />
                  <div className="item_bot"></div>
                </li>
              ))}
            </ul>
            <ul className="GN28_container_right_list">
              {seats2.map((seat, index) => (
                <li key={index} className="GN28_container_right_item">
                  <Seat
                    numSeat={seat.trainSeatNumber}
                    Type={
                      selectedSeats.some(
                        (selectedSeat) =>
                          selectedSeat.numSeat === seat.trainSeatNumber
                      )
                        ? "active"
                        : !seat.status
                        ? "booked"
                        : "empty"
                    }
                    status={!seat.status ? "Chỗ đã bán" : "Chỗ trống"}
                    price={
                      !seat.status
                        ? "Chỗ đã bán"
                        : `Giá: ${(seat.price * 1000).toLocaleString(
                            "en-US"
                          )} VNĐ`
                    }
                    onClick={
                      seat.status
                        ? (numSeat) => {
                            onClick(numSeat, seat.id, seat.price);
                          }
                        : undefined
                    }
                  />
                  <div className="item_bot"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarGN28;
