import React from "react";
import "./FindTours.scss";

import { useEffect, useState } from "react";
import FormFind from "../FormFind/FormFind";
import CartTickets from "../CartTickets/CartTickets";

const FindTours = () => {
  useEffect(() => {}, []);

  const [ticketOneWay, setTicketOneWay] = useState(
    JSON.parse(localStorage.getItem("selectedSeats")) || []
  );
  const [ticketRound, setTicketRound] = useState(
    JSON.parse(localStorage.getItem("selectedSeats1")) || []
  );

  return (
    <div className="findTours">
      <div>
        <FormFind />
      </div>
      <div className="findTours_wrap_mid">
        <img src="/src/assets/img/2_1.jpg" />
      </div>
      <div>
        <CartTickets ticketOneWay={ticketOneWay} ticketRound={ticketRound} />
      </div>
    </div>
  );
};

export default FindTours;
