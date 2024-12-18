import React, { useEffect } from "react";
import "./TypeSeat.scss";
import CarMN56 from "./CarMN56/CarMN56";
import CarGN42 from "./CarGN42/CarGN42";
import CarGN28 from "./CarGN28/CarGN28";

const TypeSeat = ({ trainCarTypeCode, trainSeats, onClick, selectedSeats }) => {
  const filteredSeats = selectedSeats.filter(
    (seat) => seat.trainCarTypeCode === trainCarTypeCode
  );

  return (
    <div className="TypeSeat">
      {trainCarTypeCode === "NM56" && (
        <CarMN56
          trainSeats={trainSeats}
          onClick={(numSeat, id, price) => onClick(numSeat, id, price)}
          selectedSeats={filteredSeats}
        />
      )}
      {trainCarTypeCode === "GN42" && (
        <CarGN42
          trainSeats={trainSeats}
          onClick={(numSeat, id, price) => onClick(numSeat, id, price)}
          selectedSeats={filteredSeats}
        />
      )}
      {trainCarTypeCode === "GN28" && (
        <CarGN28
          trainSeats={trainSeats}
          onClick={(numSeat, id, price) => onClick(numSeat, id, price)}
          selectedSeats={filteredSeats}
        />
      )}
    </div>
  );
};

export default TypeSeat;
