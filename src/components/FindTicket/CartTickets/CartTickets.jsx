import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./CartTickets.scss";
import Button from "../../Button/Button";

const CartTickets = ({ ticketOneWay, ticketRound, delTicket }) => {
  const navigate = useNavigate();

  const handleBuy = (event) => {
    event.preventDefault();
    navigate("/timve/thanhtoan/giove", {
      state: {
        ticketOneWay,
        ticketRound,
      },
    });
  };

  return (
    <div className="cartTickets">
      <div className="cartTickets_title">
        <FontAwesomeIcon icon={faBars} className="cartTickets_title-icon" />
        <span className="cartTickets_title-name">Giỏ vé</span>
      </div>
      {ticketOneWay.length === 0 && ticketRound.length === 0 && (
        <div className="cartTickets_noCart">Chưa có vé</div>
      )}

      <div className="cartTickets_wrap">
        {ticketOneWay.length > 0 && (
          <div className="cartTickets_wrap_go">
            <div className="cartTickets_wrap-text">Chiều đi</div>
            {ticketOneWay.map((ticket, index) => (
              <div className="TicketInCart" key={index}>
                <div className="TicketInCart_info">
                  <div className="TicketInCart_info-text">
                    {ticket.trainCode} {ticket.nameStartStation}-
                    {ticket.nameEndStation}
                  </div>
                  <div className="TicketInCart_info-text">
                    {new Date(ticket.departureTime).toLocaleDateString("vi-VN")}{" "}
                    {new Date(ticket.departureTime).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                  <div className="TicketInCart_info-text">
                    {ticket.trainCarTypeCode} toa {ticket.trainCarNumber} chỗ{" "}
                    {ticket.numSeat}
                  </div>
                </div>
                <a
                  className="TicketInCart_icon"
                  onClick={delTicket && (() => delTicket("Một chiều", index))}
                ></a>
              </div>
            ))}
          </div>
        )}
        {ticketRound.length > 0 && (
          <div className="cartTickets_wrap_about">
            <div className="cartTickets_wrap-text">Chiều về</div>
            {ticketRound.map((ticket, index) => (
              <div className="TicketInCart" key={index}>
                <div className="TicketInCart_info">
                  <div className="TicketInCart_info-text">
                    {ticket.trainCode1} {ticket.nameStartStation1}-
                    {ticket.nameEndStation1}
                  </div>
                  <div className="TicketInCart_info-text">
                    {new Date(ticket.departureTime1).toLocaleDateString(
                      "vi-VN"
                    )}{" "}
                    {new Date(ticket.departureTime1).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                  <div className="TicketInCart_info-text">
                    {ticket.trainCarTypeCode} toa {ticket.trainCarNumber} chỗ{" "}
                    {ticket.numSeat}
                  </div>
                </div>
                <a
                  className="TicketInCart_icon"
                  onClick={delTicket && (() => delTicket("Khứ hồi", index))}
                ></a>
              </div>
            ))}
          </div>
        )}
        {(ticketOneWay.length > 0 || ticketRound.length > 0) && (
          <Button name="Mua vé" onClick={handleBuy} />
        )}
      </div>
    </div>
  );
};

export default CartTickets;
