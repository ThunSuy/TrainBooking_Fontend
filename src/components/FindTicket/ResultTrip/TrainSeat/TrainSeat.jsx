import React from "react";
import "./TrainSeat.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import TypeSeat from "./TypeSeat/TypeSeat";

const TrainSeat = ({
  numCar,
  description,
  trainCarTypeCode,
  trainSeats,
  onClick,
  selectedSeats,
}) => {
  const [filteredSeats, setFilteredSeats] = useState([]);

  useEffect(() => {
    setFilteredSeats(
      selectedSeats.filter((seat) => seat.trainCarNumber === numCar)
    );
  }, [selectedSeats, numCar]);
  return (
    <div className="TrainSeat">
      <div className="TrainSeat_title">
        Toa số {numCar}: {description}
      </div>
      <div className="TrainSeat_wrap">
        <div className="TrainSeat_wrap_left">
          <FontAwesomeIcon icon={faAngleLeft} className="TrainSeat_wrap_icon" />
        </div>
        <div className="TrainSeat_wrap_mid">
          <TypeSeat
            trainCarTypeCode={trainCarTypeCode}
            trainSeats={trainSeats}
            onClick={(numSeat, id, price) => onClick(numSeat, id, price)}
            selectedSeats={filteredSeats}
          />
        </div>
        <div className="TrainSeat_wrap_right">
          <FontAwesomeIcon
            icon={faAngleRight}
            className="TrainSeat_wrap_icon"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainSeat;
