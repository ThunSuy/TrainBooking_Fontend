import React from "react";
import "./InfoTicket.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faWarning } from "@fortawesome/free-solid-svg-icons";
import RowInfoTicket from "./RowInfoTicket/RowInfoTicket";
import PaymentMethod from "../../../PaymentMethod/PaymentMethod";
import FormInfo from "../FormInfo/FormInfo";
import Header from "../Header/Header";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import ButtonPayTicket from "../ButtonPayTicket/ButtonPayTicket";
import Notification from "../../ProgressBuy/InfoTicket/Notification/Notification";
import RowRoundTrip from "./RowRoundTrip/RowRoundTrip";

const InfoTicket = ({ goToNextStep, methodPay }) => {
  const [showNoti, setShowNoti] = useState(false);
  const navigate = useNavigate();

  const [oneWayTickets, setOneWayTickets] = useState(
    JSON.parse(localStorage.getItem("selectedSeats"))
  );
  const [roundTickets, setRoundTripTickets] = useState(
    JSON.parse(localStorage.getItem("selectedSeats1"))
  );

  const [total, setTotal] = useState(0);

  // checkall
  const [checkAll, setCheckAll] = useState(true);

  // erorr passenger
  const [checkErorrPassenger, setCheckErorrPassenger] = useState(false);
  const [erorrassenger, setErorrassenger] = useState("");

  // erorr Pay
  const [checkErorrPay, setCheckErorrPay] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(
    methodPay === "" ? "" : methodPay
  );
  const [erorrPay, setErorrPay] = useState("");

  const bookerData = JSON.parse(localStorage.getItem("bookerData"));

  const [bookerRequest, setBookerRequest] = useState({
    fullName: bookerData.fullName,
    email: bookerData.email,
    phone: bookerData.phone,
    cccd: bookerData.cccd,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const newTotal = [...oneWayTickets, ...roundTickets].reduce(
      (sum, ticket) => sum + (ticket.finalPrice || 0),
      0
    );
    setTotal(newTotal);
  }, [oneWayTickets, roundTickets]);

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/timve/ketqua");
  };

  const handleOnClickRight = () => {
    let localCheckAll = true;

    if (selectedMethod === "") {
      setCheckErorrPay(true);
      setErorrPay("* Vui lòng chọn phương thức thanh toán");
      localCheckAll = false;
    } else {
      setCheckErorrPay(false);
      setErorrPay("");
      setCheckAll(true);
    }

    // --------------
    let checkCccd = true;
    let checkOneWay = true;
    oneWayTickets.map((ticket) => {
      if (ticket.passengerName === "" || ticket.passengerType === "") {
        checkOneWay = false;
      } else if (ticket.dateOfBirth === "" && ticket.cccd === "") {
        checkOneWay = false;
      } else if (ticket.cccd.length < 12 && ticket.dateOfBirth === "") {
        checkCccd = false;
      } else {
        checkOneWay = true;
      }
    });
    let checkRound = true;
    roundTickets.map((ticket) => {
      if (ticket.passengerName === "" || ticket.passengerType === "") {
        checkRound = false;
      } else if (ticket.dateOfBirth === "" && ticket.cccd === "") {
        checkRound = false;
      } else if (ticket.cccd.length < 12 && ticket.dateOfBirth === "") {
        checkCccd = false;
      } else {
        checkRound = true;
      }
    });

    if (checkOneWay && checkRound) {
      setCheckAll(checkOneWay);
      setCheckErorrPassenger(false);
      setErorrassenger("");
      setCheckAll(true);
    } else {
      setCheckErorrPassenger(true);
      setErorrassenger("* Hãy điền đầy đủ thông tin hành khách");
      localCheckAll = false;
    }

    if (!checkCccd) {
      setCheckErorrPassenger(true);
      setErorrassenger("* Số giấy tờ bao gồm 12 số");
      localCheckAll = false;
    }

    setCheckAll(localCheckAll);

    if (localCheckAll) {
      setShowNoti(true);
    }
  };

  const handleOpenNoti = () => {
    setShowNoti(false);
  };

  const handleCloseNoti = () => {
    setShowNoti(false);
    goToNextStep(selectedMethod, total);
  };

  const handleUpdateTicket = (updatedTicket) => {
    setOneWayTickets((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket) => {
        if (
          ticket.trainCode === updatedTicket.trainCode &&
          ticket.trainCarTypeCode === updatedTicket.trainCarTypeCode &&
          ticket.trainCarNumber === updatedTicket.trainCarNumber &&
          ticket.nameStartStation === updatedTicket.nameStartStation &&
          ticket.nameEndStation === updatedTicket.nameEndStation &&
          ticket.departureTime === updatedTicket.departureTime &&
          ticket.numSeat === updatedTicket.numSeat &&
          ticket.price === updatedTicket.price
        ) {
          return { ...ticket, finalPrice: updatedTicket.finalPrice };
        }
        return ticket;
      });

      localStorage.setItem("selectedSeats", JSON.stringify(updatedTickets));

      return updatedTickets;
    });

    setRoundTripTickets((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket) => {
        if (
          ticket.trainCode1 === updatedTicket.trainCode1 &&
          ticket.trainCarTypeCode === updatedTicket.trainCarTypeCode &&
          ticket.trainCarNumber === updatedTicket.trainCarNumber &&
          ticket.nameStartStation1 === updatedTicket.nameStartStation1 &&
          ticket.nameEndStation1 === updatedTicket.nameEndStation1 &&
          ticket.departureTime1 === updatedTicket.departureTime1 &&
          ticket.numSeat === updatedTicket.numSeat &&
          ticket.price === updatedTicket.price
        ) {
          return { ...ticket, finalPrice: updatedTicket.finalPrice };
        }
        return ticket;
      });

      localStorage.setItem("selectedSeats1", JSON.stringify(updatedTickets));

      return updatedTickets;
    });
  };

  const handleDeleteTicket = (delTicket) => {
    const isConfirmed = window.confirm("Bạn thực sự muốn bỏ vé này?");
    if (!isConfirmed) return;

    setOneWayTickets((prevTickets) => {
      const updatedTickets = prevTickets.filter(
        (ticket) =>
          !(
            ticket.trainCode === delTicket.trainCode &&
            ticket.trainCarTypeCode === delTicket.trainCarTypeCode &&
            ticket.trainCarNumber === delTicket.trainCarNumber &&
            ticket.nameStartStation === delTicket.nameStartStation &&
            ticket.nameEndStation === delTicket.nameEndStation &&
            ticket.departureTime === delTicket.departureTime &&
            ticket.numSeat === delTicket.numSeat &&
            ticket.price === delTicket.price &&
            ticket.finalPrice === delTicket.finalPrice
          )
      );

      localStorage.setItem("selectedSeats", JSON.stringify(updatedTickets));
      return updatedTickets;
    });

    setRoundTripTickets((prevTickets) => {
      const updatedTickets = prevTickets.filter(
        (ticket) =>
          !(
            ticket.trainCode1 === delTicket.trainCode1 &&
            ticket.trainCarTypeCode === delTicket.trainCarTypeCode &&
            ticket.trainCarNumber === delTicket.trainCarNumber &&
            ticket.nameStartStation1 === delTicket.nameStartStation1 &&
            ticket.nameEndStation1 === delTicket.nameEndStation1 &&
            ticket.departureTime1 === delTicket.departureTime1 &&
            ticket.numSeat === delTicket.numSeat &&
            ticket.price === delTicket.price &&
            ticket.finalPrice === delTicket.finalPrice
          )
      );

      localStorage.setItem("selectedSeats1", JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  const handleDelAllTicket = () => {
    const isConfirmed = window.confirm("Bạn thực sự muốn bỏ tất cả các vé?");
    if (!isConfirmed) return;

    setOneWayTickets([]);
    setRoundTripTickets([]);

    localStorage.setItem("selectedSeats", JSON.stringify([]));
    localStorage.setItem("selectedSeats1", JSON.stringify([]));
  };

  const handleUpPassenger = (updatedTicket) => {
    setOneWayTickets((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket) => {
        if (
          ticket.trainCode === updatedTicket.trainCode &&
          ticket.trainCarTypeCode === updatedTicket.trainCarTypeCode &&
          ticket.trainCarNumber === updatedTicket.trainCarNumber &&
          ticket.nameStartStation === updatedTicket.nameStartStation &&
          ticket.nameEndStation === updatedTicket.nameEndStation &&
          ticket.departureTime === updatedTicket.departureTime &&
          ticket.numSeat === updatedTicket.numSeat &&
          ticket.price === updatedTicket.price
        ) {
          return {
            ...ticket,
            passengerName: updatedTicket.passengerName,
            passengerType: updatedTicket.passengerType,
            cccd: updatedTicket.cccd,
            dateOfBirth: updatedTicket.dateOfBirth,
          };
        }
        return ticket;
      });

      localStorage.setItem("selectedSeats", JSON.stringify(updatedTickets));
      return updatedTickets;
    });

    setRoundTripTickets((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket) => {
        if (
          ticket.trainCode1 === updatedTicket.trainCode1 &&
          ticket.trainCarTypeCode === updatedTicket.trainCarTypeCode &&
          ticket.trainCarNumber === updatedTicket.trainCarNumber &&
          ticket.nameStartStation1 === updatedTicket.nameStartStation1 &&
          ticket.nameEndStation1 === updatedTicket.nameEndStation1 &&
          ticket.departureTime1 === updatedTicket.departureTime1 &&
          ticket.numSeat === updatedTicket.numSeat &&
          ticket.price === updatedTicket.price
        ) {
          return {
            ...ticket,
            passengerName: updatedTicket.passengerName,
            passengerType: updatedTicket.passengerType,
            cccd: updatedTicket.cccd,
            dateOfBirth: updatedTicket.dateOfBirth,
          };
        }
        return ticket;
      });

      localStorage.setItem("selectedSeats1", JSON.stringify(updatedTickets));
      return updatedTickets;
    });
  };

  const handleSelectMethod = (value) => {
    setSelectedMethod(value);
  };

  useEffect(() => {
    if (oneWayTickets.length === 0 && roundTickets.length === 0) {
      const timeout = setTimeout(() => {
        navigate("/timve/ketqua", {
          state: {
            dataFindOneWay,
            dataFindRound,
          },
        });
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [oneWayTickets, roundTickets]);

  return (
    <>
      <Header activeStep={0} />
      <div className="payTicket_wrap">
        <span className="payTicket_wrap_info">Thông tin giỏ vé</span>
        <div className="payTicket_con">
          <table className="payTicket_table">
            <thead>
              <tr>
                <th className="payTicket_table_th">Họ tên</th>
                <th className="payTicket_table_th">Thông tin chỗ</th>
                <th className="payTicket_table_th">Giá vé</th>
                <th className="payTicket_table_th">Giảm đối tượng</th>
                <th className="payTicket_table_th">Thành tiền (VNĐ)</th>
                <th className="payTicket_table_th"></th>
              </tr>
            </thead>
            <tbody>
              {oneWayTickets.length > 0 && roundTickets.length > 0 && (
                <tr>
                  <th className="payTicket_table_title" colSpan="6">
                    Khứ hồi
                  </th>
                </tr>
              )}
              {Math.min(oneWayTickets.length, roundTickets.length) > 0 &&
                [
                  ...Array(Math.min(oneWayTickets.length, roundTickets.length)),
                ].map((_, index) => (
                  <RowRoundTrip
                    key={index}
                    oneWayTickets={oneWayTickets[index]}
                    roundTickets={roundTickets[index]}
                    onUpdateTicket={handleUpdateTicket}
                    deleteTicket={handleDeleteTicket}
                    handleUpPassenger={handleUpPassenger}
                  />
                ))}

              {oneWayTickets.length > roundTickets.length && (
                <tr>
                  <td colSpan={6} className="payTicket_table_title">
                    Chiều đi
                  </td>
                </tr>
              )}
              {oneWayTickets.length > roundTickets.length && (
                <>
                  {oneWayTickets
                    .slice(roundTickets.length)
                    .map((ticket, index) => (
                      <RowInfoTicket
                        key={`one-way-${index}`}
                        oneWayTickets={ticket}
                        onUpdateTicket={handleUpdateTicket}
                        deleteTicket={handleDeleteTicket}
                        handleUpPassenger={handleUpPassenger}
                      />
                    ))}
                </>
              )}
              {oneWayTickets.length < roundTickets.length && (
                <tr>
                  <td colSpan={6} className="payTicket_table_title">
                    Chiều về
                  </td>
                </tr>
              )}
              {oneWayTickets.length < roundTickets.length && (
                <>
                  {roundTickets
                    .slice(oneWayTickets.length)
                    .map((ticket, index) => (
                      <RowInfoTicket
                        key={`round-${index}`}
                        oneWayTickets={ticket}
                        onUpdateTicket={handleUpdateTicket}
                        deleteTicket={handleDeleteTicket}
                        handleUpPassenger={handleUpPassenger}
                      />
                    ))}
                </>
              )}
            </tbody>
          </table>
          <div className="payTicket_table_footer">
            <button
              className="payTicket_table_footer-btn"
              onClick={handleDelAllTicket}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className="payTicket_table_footer-btn-icon"
              />
              Xoá tất cả các vé
            </button>
            <div className="payTicket_table_footer-text">
              Tổng tiền : {(total * 1000).toLocaleString("en-US")} VNĐ
            </div>
          </div>
        </div>
      </div>
      <div className="formInfoPeople">
        <FormInfo bookerRequest={bookerRequest} />
        <PaymentMethod
          showCheckBox={true}
          erorr={checkErorrPay}
          handleSelectMethod={handleSelectMethod}
          selectedMethod={selectedMethod}
        />
        {!checkAll && (
          <div className="formInfoPeople_erorr">
            <div className="formInfoPeople_erorr_title">
              <FontAwesomeIcon
                icon={faWarning}
                className="formInfoPeople_erorr_icon"
              />
              <span>Thông tin nhập vào chưa chính xác</span>
            </div>
            {checkErorrPassenger && (
              <div className="formInfoPeople_erorr_text">{erorrassenger}</div>
            )}
            {checkErorrPay && (
              <div className="formInfoPeople_erorr_text">{erorrPay}</div>
            )}
          </div>
        )}
        <ButtonPayTicket
          iconLeft={faAnglesLeft}
          nameLeft="Quay lại"
          onClickLeft={handleBack}
          iconRight={faAnglesRight}
          nameRight="Tiếp theo"
          onClickRight={handleOnClickRight}
        />
      </div>

      <Notification
        showNoti={showNoti}
        handleOpenNoti={handleOpenNoti}
        handleCloseNoti={handleCloseNoti}
      />
    </>
  );
};

export default InfoTicket;
