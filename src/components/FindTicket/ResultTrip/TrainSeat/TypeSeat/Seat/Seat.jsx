import React from "react";
import "./Seat.scss";

const Seat = ({ numSeat, Type, onClick, status, price }) => {
  // console.log(onClick);
  return (
    //   {/* NM56_seat_booked và NM56_seat_empty và NM56_seat_active */}
    <div
      className={`TNM56_seat_con-seat seat_${Type}`}
      onClick={onClick ? () => onClick(numSeat) : undefined}
    >
      <span className="TNM56_seat_con-num">{numSeat}</span>
      <div className="seat_hover">
        <div className="seat_hover-text">{status}</div>
        <div className="seat_hover-price">{price}</div>
      </div>
    </div>
  );
};

export default Seat;
