import React from "react";
import "./ResultTrip.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TrainTrip from "./TrainTrip/TrainTrip";
import TrainCar from "./TrainCar/TrainCar";
import TrainSeat from "./TrainSeat/TrainSeat";
import CartTickets from "../CartTickets/CartTickets";
import FormFind from "../FormFind/FormFind";
import Seat from "./TrainSeat/TypeSeat/Seat/Seat";

const ResultTrip = () => {
  const getDescription = (trainCarTypeCode) => {
    const typeDescriptions = [
      { codeType: "GN28", description: "Giường nằm khoang 4 điều hòa" },
      { codeType: "GN42", description: "Giường nằm khoang 6 điều hòa" },
      { codeType: "NM56", description: "Ngồi mềm điều hoà loại 56 ghế" },
    ];

    const foundItem = typeDescriptions.find(
      (item) => item.codeType === trainCarTypeCode
    );
    return foundItem ? foundItem.description : "";
  };

  // location
  const location = useLocation();

  // thong tin find
  const dataFindOneWay = JSON.parse(localStorage.getItem("dataFindOneWay"));
  const dataFindRound = JSON.parse(localStorage.getItem("dataFindRound"));

  // Cập nhật dữ liệu trong localStorage và setState
  const [selectedSeats, setSelectedSeats] = useState(() => {
    const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    const updatedSeats = seats.map((seat) => ({
      ...seat,
      passengerName: "",
      passengerType: "",
      cccd: "",
      dateOfBirth: "",
      finalPrice: seat.price,
    }));

    // Lưu dữ liệu đã chỉnh sửa lại vào localStorage
    localStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));

    return updatedSeats;
  });

  const [selectedSeats1, setSelectedSeats1] = useState(() => {
    const seats1 = JSON.parse(localStorage.getItem("selectedSeats1")) || [];
    const updatedSeats1 = seats1.map((seat) => ({
      ...seat,
      passengerName: "",
      passengerType: "",
      cccd: "",
      dateOfBirth: "",
      finalPrice: seat.price,
    }));

    // Lưu dữ liệu đã chỉnh sửa lại vào localStorage
    localStorage.setItem("selectedSeats1", JSON.stringify(updatedSeats1));

    return updatedSeats1;
  });

  // useState chiều đi
  const [selectedTripIndex, setSelectedTripIndex] = useState(0);
  const [idTrainTrip, setIdTrainTrip] = useState(
    dataFindOneWay[selectedTripIndex].idTrainTrip
  );
  const [idRouteStartStation, setIdRouteStartStation] = useState(
    dataFindOneWay[selectedTripIndex].idRouteStartStation
  );
  const [idRouteEndStation, setIdRouteEndStation] = useState(
    dataFindOneWay[selectedTripIndex].idRouteEndStation
  );
  const [selectedTrainCar, setSelectedTrainCar] = useState(
    dataFindOneWay[selectedTripIndex].trainDetail?.trainCars.length - 1
  );
  const [trainCode, setTrainCode] = useState(
    dataFindOneWay[selectedTripIndex].trainCode
  );

  const [trainCarNumber, setTrainCarNumber] = useState(
    dataFindOneWay[selectedTripIndex].trainDetail?.trainCars[0].trainCarNumber
  );
  const [trainCarTypeCode, setTrainCarTypeCode] = useState(
    dataFindOneWay[selectedTripIndex].trainDetail?.trainCars[0].trainCarTypeCode
  );

  const [description, setDescription] = useState(
    getDescription(trainCarTypeCode)
  );

  const [trainSeats, setTrainSeats] = useState(
    dataFindOneWay[selectedTripIndex].trainDetail?.trainCars[0].trainSeats
  );
  const [filteredSeatsOneWay, setFilteredSeatsOneWay] = useState([]);

  // useState chiều về
  const [selectedTripIndex1, setSelectedTripIndex1] = useState(0);
  const [idTrainTrip1, setIdTrainTrip1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1].idTrainTrip
      : ""
  );
  const [idRouteStartStation1, setIdRouteStartStation1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1].idRouteStartStation
      : ""
  );
  const [idRouteEndStation1, setIdRouteEndStation1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1].idRouteEndStation
      : ""
  );
  const [selectedTrainCar1, setSelectedTrainCar1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars.length - 1
      : 0
  );
  const [trainCode1, setTrainCode1] = useState(
    dataFindRound.length > 0 ? dataFindRound[selectedTripIndex1]?.trainCode : ""
  );

  const [trainCarNumber1, setTrainCarNumber1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars[0]
          ?.trainCarNumber
      : ""
  );
  const [trainCarTypeCode1, setTrainCarTypeCode1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars[0]
          ?.trainCarTypeCode
      : ""
  );

  const [description1, setDescription1] = useState(
    dataFindRound.length > 0 ? getDescription(trainCarTypeCode1) : ""
  );
  const [trainSeats1, setTrainSeats1] = useState(
    dataFindRound.length > 0
      ? dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars[0]?.trainSeats
      : []
  );
  const [filteredSeatsRound, setFilteredSeatsRound] = useState([]);

  // thông tin chiều đi
  const departureTime = dataFindOneWay[0].departureTime;
  const nameStartStation = dataFindOneWay[0].nameStartStation;
  const nameEndStation = dataFindOneWay[0].nameEndStation;

  // thông tin chiều về
  const departureTime1 =
    dataFindRound.length > 0 ? dataFindRound[0].departureTime : "";
  const nameStartStation1 =
    dataFindRound.length > 0 ? dataFindRound[0].nameStartStation : "";
  const nameEndStation1 =
    dataFindRound.length > 0 ? dataFindRound[0].nameEndStation : "";

  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log(dataFindOneWay);
    // console.log(dataFindRound);
  }, []);

  const handleClickTrip = (index, code, typeTrip) => {
    if (typeTrip === "Một chiều") {
      setTrainCode(code);
      setSelectedTripIndex(index);
      // reset
      setTrainCarNumber(
        dataFindOneWay[index].trainDetail?.trainCars[0].trainCarNumber
      );
      setSelectedTrainCar(
        dataFindOneWay[index].trainDetail?.trainCars.length - 1
      );
      setTrainCarTypeCode(
        dataFindOneWay[index].trainDetail?.trainCars[0].trainCarTypeCode
      );

      setDescription(
        getDescription(
          dataFindOneWay[index].trainDetail?.trainCars[0].trainCarTypeCode
        )
      );
      setTrainSeats(dataFindOneWay[index].trainDetail?.trainCars[0].trainSeats);
      setIdTrainTrip(dataFindOneWay[index].idTrainTrip);
      setIdRouteStartStation(dataFindOneWay[index].idRouteStartStation);
      setIdRouteEndStation(dataFindOneWay[index].idRouteEndStation);
    } else if (typeTrip === "Khứ hồi") {
      setTrainCode1(code);
      setSelectedTripIndex1(index);
      // reset
      setTrainCarNumber1(
        dataFindRound[index].trainDetail?.trainCars[0].trainCarNumber
      );
      setSelectedTrainCar1(
        dataFindRound[index].trainDetail?.trainCars.length - 1
      );
      setTrainCarTypeCode1(
        dataFindRound[index].trainDetail?.trainCars[0].trainCarTypeCode
      );

      setDescription1(
        getDescription(
          dataFindRound[index].trainDetail?.trainCars[0].trainCarTypeCode
        )
      );
      setTrainSeats1(dataFindRound[index].trainDetail?.trainCars[0].trainSeats);
      setIdTrainTrip1(dataFindRound[index].idTrainTrip);
      setIdRouteStartStation1(dataFindRound[index].idRouteStartStation);
      setIdRouteEndStation1(dataFindRound[index].idRouteEndStation);
    }
  };

  const handleClickTranCar = (numCar, index, trainCarTypeCode, typeTrip) => {
    if (typeTrip === "Một chiều") {
      setTrainCarNumber(numCar);
      setSelectedTrainCar(index);
      setTrainCarTypeCode(trainCarTypeCode);
      setDescription(getDescription(trainCarTypeCode));
      setTrainSeats(
        dataFindOneWay[selectedTripIndex].trainDetail?.trainCars[
          dataFindOneWay[selectedTripIndex].trainDetail?.trainCars.length -
            index -
            1
        ].trainSeats
      );
    } else if (typeTrip === "Khứ hồi") {
      setTrainCarNumber1(numCar);
      setSelectedTrainCar1(index);
      setTrainCarTypeCode1(trainCarTypeCode);
      setDescription1(getDescription(trainCarTypeCode));
      setTrainSeats1(
        dataFindRound[selectedTripIndex1].trainDetail?.trainCars[
          dataFindRound[selectedTripIndex1].trainDetail?.trainCars.length -
            index -
            1
        ].trainSeats
      );
    }
  };

  const handleSelectSeat = (numSeat, id, price) => {
    const finalPrice = price;
    const seatInfo = {
      id: id,
      idTrainTrip,
      idRouteStartStation,
      idRouteEndStation,
      trainCode,
      nameStartStation,
      nameEndStation,
      departureTime,
      trainCarTypeCode,
      trainCarNumber,
      numSeat,
      price,
      finalPrice,
      passengerName: "",
      passengerType: "",
      cccd: "",
      dateOfBirth: "",
    };

    setSelectedSeats((prevSelectedSeats) => {
      const isExisting = prevSelectedSeats.some(
        (seat) =>
          seat.trainCode === seatInfo.trainCode &&
          seat.trainCarTypeCode === seatInfo.trainCarTypeCode &&
          seat.trainCarNumber === seatInfo.trainCarNumber &&
          seat.nameStartStation === seatInfo.nameStartStation &&
          seat.nameEndStation === seatInfo.nameEndStation &&
          seat.departureTime === seatInfo.departureTime &&
          seat.numSeat === seatInfo.numSeat
      );

      if (isExisting) {
        const updatedSeats = prevSelectedSeats.filter(
          (seat) =>
            seat.trainCode !== seatInfo.trainCode ||
            seat.trainCarTypeCode !== seatInfo.trainCarTypeCode ||
            seat.trainCarNumber !== seatInfo.trainCarNumber ||
            seat.nameStartStation !== seatInfo.nameStartStation ||
            seat.nameEndStation !== seatInfo.nameEndStation ||
            seat.departureTime !== seatInfo.departureTime ||
            seat.numSeat !== seatInfo.numSeat
        );

        localStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));

        return updatedSeats;
      } else {
        const updatedSeats = [...prevSelectedSeats, seatInfo];

        localStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));

        return updatedSeats;
      }
    });
  };

  const handleSelectSeat1 = (numSeat, id, price) => {
    const finalPrice = price;
    const trainCarTypeCode = trainCarTypeCode1;
    const trainCarNumber = trainCarNumber1;
    const seatInfo = {
      id: id,
      trainCode1,
      idTrainTrip1,
      idRouteStartStation1,
      idRouteEndStation1,
      nameStartStation1,
      nameEndStation1,
      departureTime1,
      trainCarTypeCode,
      trainCarNumber,
      numSeat,
      price,
      finalPrice,
      passengerName: "",
      passengerType: "",
      cccd: "",
      dateOfBirth: "",
    };

    setSelectedSeats1((prevSelectedSeats) => {
      const isExisting = prevSelectedSeats.some(
        (seat) =>
          seat.trainCode1 === seatInfo.trainCode1 &&
          seat.trainCarTypeCode === seatInfo.trainCarTypeCode &&
          seat.trainCarNumber === seatInfo.trainCarNumber &&
          seat.nameStartStation1 === seatInfo.nameStartStation1 &&
          seat.nameEndStation1 === seatInfo.nameEndStation1 &&
          seat.departureTime1 === seatInfo.departureTime1 &&
          seat.numSeat === seatInfo.numSeat
      );

      if (isExisting) {
        const updatedSeats = prevSelectedSeats.filter(
          (seat) =>
            seat.trainCode1 !== seatInfo.trainCode1 ||
            seat.trainCarTypeCode !== seatInfo.trainCarTypeCode ||
            seat.trainCarNumber !== seatInfo.trainCarNumber ||
            seat.nameStartStation1 !== seatInfo.nameStartStation1 ||
            seat.nameEndStation1 !== seatInfo.nameEndStation1 ||
            seat.departureTime1 !== seatInfo.departureTime1 ||
            seat.numSeat !== seatInfo.numSeat
        );

        localStorage.setItem("selectedSeats1", JSON.stringify(updatedSeats));

        return updatedSeats;
      } else {
        const updatedSeats = [...prevSelectedSeats, seatInfo];

        localStorage.setItem("selectedSeats1", JSON.stringify(updatedSeats));

        return updatedSeats;
      }
    });
  };

  const countSeats = (data, status) => {
    return data?.trainDetail?.trainCars?.reduce((count, trainCar) => {
      const falseSeats = trainCar.trainSeats?.filter(
        (seat) => seat.status === status
      );
      return count + (falseSeats ? falseSeats.length : 0);
    }, 0);
  };

  useEffect(() => {
    setFilteredSeatsOneWay(
      selectedSeats.filter(
        (seat) =>
          seat.trainCode === trainCode &&
          seat.departureTime === departureTime &&
          seat.nameStartStation === nameStartStation &&
          seat.nameEndStation === nameEndStation
      )
    );
  }, [selectedSeats, trainCode]);

  useEffect(() => {
    setFilteredSeatsRound(
      selectedSeats1.filter(
        (seat) =>
          seat.trainCode1 === trainCode1 &&
          seat.departureTime1 === departureTime1 &&
          seat.nameStartStation1 === nameStartStation1 &&
          seat.nameEndStation1 === nameEndStation1
      )
    );
  }, [selectedSeats1, trainCode1]);

  const handleTrainCarEmpty = (index, index1) => {
    const trainCar = dataFindOneWay[index]?.trainDetail?.trainCars[index1];

    const check = trainCar?.trainSeats?.some((seat) => seat.status === true);

    return check || false;
  };

  const handleTrainCarEmpty1 = (index, index1) => {
    const trainCar = dataFindRound[index]?.trainDetail?.trainCars[index1];

    const check = trainCar?.trainSeats?.some((seat) => seat.status === true);

    return check || false;
  };

  const handleDelTicket = (typeTrip1, index) => {
    if (typeTrip1 === "Một chiều") {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
      localStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
    } else {
      const updatedSeats1 = [...selectedSeats1];
      updatedSeats1.splice(index, 1);
      setSelectedSeats1(updatedSeats1);
      localStorage.setItem("selectedSeats1", JSON.stringify(updatedSeats1));
    }
  };

  return (
    <div className="resultTrip">
      <div className="resultTrip_wrapper">
        {dataFindOneWay.length > 0 && (
          <div className="resultTrip_wrapper_container">
            <span className="resultTrip_title">
              <span className="resultTrip_title-700">Chiều đi:</span> ngày{" "}
              {new Date(departureTime).toLocaleDateString("vi-VN")} từ{" "}
              {nameStartStation} đến {nameEndStation}
            </span>
            <div className="resultTrip_trip">
              {dataFindOneWay.map((trip, index) => {
                const emptyNum = countSeats(trip, true);
                const bookedNum = countSeats(trip, false);

                return (
                  <TrainTrip
                    ColorBackgr={
                      selectedTripIndex === index ? "primary" : "trip"
                    }
                    key={index}
                    trainCode={trip.trainCode}
                    departureTime={trip.departureTime}
                    endTime={trip.endTime}
                    emptyNum={emptyNum}
                    bookedNum={bookedNum}
                    onClick={() =>
                      handleClickTrip(index, trip.trainCode, "Một chiều")
                    }
                  ></TrainTrip>
                );
              })}
            </div>
            <div className="resultTrip_car">
              {dataFindOneWay[selectedTripIndex]?.trainDetail?.trainCars
                ?.slice()
                .reverse()
                .map((trainCar, index) => {
                  const isTrainCarEmpty = handleTrainCarEmpty(
                    selectedTripIndex,
                    dataFindOneWay[selectedTripIndex]?.trainDetail?.trainCars
                      .length -
                      index -
                      1
                  );

                  return (
                    <TrainCar
                      key={index}
                      BackgrColor={
                        selectedTrainCar === index
                          ? "active"
                          : isTrainCarEmpty
                          ? "seats"
                          : "full"
                      }
                      num={trainCar.trainCarNumber}
                      codeType={trainCar.trainCarTypeCode}
                      description={getDescription(trainCar.trainCarTypeCode)}
                      onClick={(numCar, trainCarTypeCode) => {
                        handleClickTranCar(
                          numCar,
                          index,
                          trainCarTypeCode,
                          "Một chiều"
                        );
                      }}
                    />
                  );
                })}
              <TrainCar typeCar="firstCar" num={trainCode} />
            </div>
            <div className="resultTrip_seats">
              <TrainSeat
                numCar={trainCarNumber}
                description={description}
                trainCarTypeCode={trainCarTypeCode}
                trainSeats={trainSeats}
                selectedSeats={filteredSeatsOneWay}
                onClick={(numSeat, id, price) =>
                  handleSelectSeat(numSeat, id, price)
                }
              />
            </div>
          </div>
        )}
        {dataFindRound.length > 0 && (
          <div className="resultTrip_wrapper_container">
            <span className="resultTrip_title">
              <span className="resultTrip_title-700">Chiều về:</span> ngày{" "}
              {new Date(departureTime1).toLocaleDateString("vi-VN")} từ{" "}
              {nameStartStation1} đến {nameEndStation1}
            </span>
            <div className="resultTrip_trip">
              {dataFindRound.map((trip, index) => {
                const emptyNum = countSeats(trip, true);
                const bookedNum = countSeats(trip, false);

                return (
                  <TrainTrip
                    ColorBackgr={
                      selectedTripIndex1 === index ? "primary" : "trip"
                    }
                    key={index}
                    trainCode={trip.trainCode}
                    departureTime={trip.departureTime}
                    endTime={trip.endTime}
                    emptyNum={emptyNum}
                    bookedNum={bookedNum}
                    onClick={() =>
                      handleClickTrip(index, trip.trainCode, "Khứ hồi")
                    }
                  ></TrainTrip>
                );
              })}
            </div>
            <div className="resultTrip_car">
              {dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars
                ?.slice()
                .reverse()
                .map((trainCar, index) => {
                  const isTrainCarEmpty = handleTrainCarEmpty1(
                    selectedTripIndex1,
                    dataFindRound[selectedTripIndex1]?.trainDetail?.trainCars
                      .length -
                      index -
                      1
                  );

                  return (
                    <TrainCar
                      key={index}
                      BackgrColor={
                        selectedTrainCar1 === index
                          ? "active"
                          : isTrainCarEmpty
                          ? "seats"
                          : "full"
                      }
                      num={trainCar.trainCarNumber}
                      codeType={trainCar.trainCarTypeCode}
                      description={getDescription(trainCar.trainCarTypeCode)}
                      onClick={(numCar, trainCarTypeCode) => {
                        handleClickTranCar(
                          numCar,
                          index,
                          trainCarTypeCode,
                          "Khứ hồi"
                        );
                      }}
                    />
                  );
                })}
              <TrainCar typeCar="firstCar" num={trainCode1} />
            </div>
            <div className="resultTrip_seats">
              <TrainSeat
                numCar={trainCarNumber1}
                description={description1}
                trainCarTypeCode={trainCarTypeCode1}
                trainSeats={trainSeats1}
                selectedSeats={filteredSeatsRound}
                onClick={(numSeat, id, price) =>
                  handleSelectSeat1(numSeat, id, price)
                }
              />
            </div>
          </div>
        )}
        <div className="resultTrip_instruct">
          <div className="instruct_top">
            <div className="instruct_top_wrap">
              <TrainCar BackgrColor="seats" />
              <span>Toa còn vé</span>
            </div>
            <div className="instruct_top_wrap">
              <TrainCar BackgrColor="active" />
              <span>Toa đang chọn</span>
            </div>
            <div className="instruct_top_wrap">
              <TrainCar BackgrColor="full" />
              <span>Toa hết vé</span>
            </div>
          </div>
          <div className="instruct_bot">
            <div className="instruct_bot_wrap">
              <div className="instruct_bot_wrap_left">
                <div className="TNM56_seat_con-left"></div>
                <Seat numSeat={0} Type="empty" />
              </div>
              <div className="instruct_bot_wrap_right">
                <Seat numSeat={0} Type="empty" />
                <div className="item_bot"></div>
              </div>
              <div className="instruct_bot_wrap_text">Chỗ trống</div>
            </div>
            <div className="instruct_bot_wrap">
              <div className="instruct_bot_wrap_left">
                <div className="TNM56_seat_con-left"></div>
                <Seat numSeat={0} Type="active" />
              </div>
              <div className="instruct_bot_wrap_right">
                <Seat numSeat={0} Type="active" />
                <div className="item_bot"></div>
              </div>
              <div className="instruct_bot_wrap_text">Chỗ đang chọn</div>
            </div>
            <div className="instruct_bot_wrap">
              <div className="instruct_bot_wrap_left">
                <div className="TNM56_seat_con-left"></div>
                <Seat numSeat={0} Type="booked" />
              </div>
              <div className="instruct_bot_wrap_right">
                <Seat numSeat={0} Type="booked" />
                <div className="item_bot"></div>
              </div>
              <div className="instruct_bot_wrap_text">
                Chỗ đã bán, không bán
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <CartTickets
          ticketOneWay={selectedSeats}
          ticketRound={selectedSeats1}
          dataFindOneWay={dataFindOneWay}
          dataFindRound={dataFindRound}
          delTicket={(typeTrip, index) => handleDelTicket(typeTrip, index)}
        />
        <FormFind />
      </div>
    </div>
  );
};

export default ResultTrip;
