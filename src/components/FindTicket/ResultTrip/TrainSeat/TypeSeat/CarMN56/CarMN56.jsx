import React, { useState, useEffect } from "react";
import "./CarMN56.scss";
import Seat from "../Seat/Seat";

const CarMN56 = ({ trainSeats, onClick, selectedSeats }) => {
  const seats1 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 1 && seat.trainSeatNumber <= 14
  );
  const seats2 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 15 && seat.trainSeatNumber <= 28
  );
  const seats3 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 29 && seat.trainSeatNumber <= 42
  );
  const seats4 = trainSeats.filter(
    (seat) => seat.trainSeatNumber >= 43 && seat.trainSeatNumber <= 56
  );

  return (
    <div className="TypeSeat_NM56">
      <div className="TNM56_left">
        <div className="TNM56_seat_wrap">
          {seats1.map((seat) => (
            <div key={seat.id} className="TNM56_seat_con">
              <div className="TNM56_seat_con-left"></div>
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
                    : `Giá: ${(seat.price * 1000).toLocaleString("en-US")} VNĐ`
                }
                onClick={
                  seat.status
                    ? (numSeat) => {
                        onClick(numSeat, seat.id, seat.price);
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
        <div className="TNM56_seat_empty"></div>
        <div className="TNM56_seat_wrap">
          {seats2.map((seat) => (
            <div key={seat.id} className="TNM56_seat_con">
              <div className="TNM56_seat_con-left"></div>
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
                    : `Giá: ${(seat.price * 1000).toLocaleString("en-US")} VNĐ`
                }
                onClick={
                  seat.status
                    ? (numSeat) => {
                        onClick(numSeat, seat.id, seat.price);
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="TNM56_mid">
        <div className="TNM56_mid_top"></div>
        <div className="TNM56_mid_bot"></div>
      </div>
      <div className="TNM56_right">
        <div className="TNM56_seat_wrap">
          {seats3.map((seat) => (
            <div key={seat.id} className="TNM56_seat_con">
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
                    : `Giá: ${(seat.price * 1000).toLocaleString("en-US")} VNĐ`
                }
                onClick={
                  seat.status
                    ? (numSeat) => {
                        onClick(numSeat, seat.id, seat.price);
                      }
                    : undefined
                }
              />
              <div className="TNM56_seat_con-left"></div>
            </div>
          ))}
        </div>
        <div className="TNM56_seat_empty"></div>
        <div className="TNM56_seat_wrap">
          {seats4.map((seat) => (
            <div key={seat.id} className="TNM56_seat_con">
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
                    : `Giá: ${(seat.price * 1000).toLocaleString("en-US")} VNĐ`
                }
                onClick={
                  seat.status
                    ? (numSeat) => {
                        onClick(numSeat, seat.id, seat.price);
                      }
                    : undefined
                }
              />
              <div className="TNM56_seat_con-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarMN56;
