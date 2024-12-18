import React from "react";
import "./RowInfoTicket.scss";
import imgDel from "../../../../../assets/img/del30.png";
import { useState, useEffect } from "react";
import SelectDate from "../SelectDate/SelectDate";
import Notification from "../../../../Notification/Notification";

const RowInfoTicket = ({
  oneWayTickets,
  onUpdateTicket,
  deleteTicket,
  handleUpPassenger,
}) => {
  const [typePerson, setTypePerson] = useState(0);
  const [salePrice, setSalePrice] = useState(333);

  const [checkSelect, setCheckSelect] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const [checkNoti, setCheckNoti] = useState(false);
  const [elderly, setElderly] = useState(false);

  const [passengerName, setPassengerName] = useState(
    oneWayTickets.passengerName
  );
  const [passengerType, setPassengerType] = useState(
    oneWayTickets.passengerType
  );
  const [date, setDate] = useState(
    oneWayTickets.cccd === "" ? oneWayTickets.dateOfBirth : oneWayTickets.cccd
  );

  const handleTypePersonChange = (event) => {
    const value = event.target.value;

    setTypePerson(value);

    let discount = 0;
    let type = "";
    let check = false;
    if (event.target.value === "0") {
      type = "Người lớn";
      setDisabled(false);
      discount = 0;
    } else if (event.target.value === "1") {
      type = "Trẻ em";
      check = true;
      setElderly(false);
      discount = 0.25;
    } else if (event.target.value === "2") {
      type = "Sinh viên";
      setDisabled(false);
      discount = 0.1;
    } else if (event.target.value === "3") {
      type = "Người cao tuổi";
      check = true;
      setElderly(true);
      setDisabled(false);
      discount = 0.15;
    }

    const newPrice = oneWayTickets.price * discount;
    setSalePrice(newPrice);
    if (onUpdateTicket) {
      onUpdateTicket({
        ...oneWayTickets,
        finalPrice: oneWayTickets.price - newPrice,
      });
    }

    setCheckSelect(check);
    handleUpPassenger({ ...oneWayTickets, passengerType: type });
  };

  useEffect(() => {
    handleUpPassenger({
      ...oneWayTickets,
      passengerType:
        oneWayTickets.passengerType === ""
          ? "Người lớn"
          : oneWayTickets.passengerType,
    });

    let discount = 0;

    if (passengerType === "Người lớn") {
      setTypePerson(0);
      discount = 0;
    } else if (passengerType === "Trẻ em") {
      setTypePerson(1);
      setDisabled(true);
      discount = 0.25;
    } else if (passengerType === "Sinh viên") {
      setTypePerson(2);
      discount = 0.1;
    } else if (passengerType === "Người cao tuổi") {
      setTypePerson(3);
      discount = 0.15;
    }

    const newPrice = oneWayTickets.price * discount;

    setSalePrice(newPrice);
  }, []);

  const handleOnchangeName = (event) => {
    const name = event.target.value;

    setPassengerName(name);
    handleUpPassenger({ ...oneWayTickets, passengerName: name });
  };

  const handleOnchangeCccd = (event) => {
    const value = event.target.value;

    setDate(value);
    if (typePerson !== "1") {
      handleUpPassenger({ ...oneWayTickets, cccd: value, dateOfBirth: "" });
    }
  };

  const handleCancel = () => {
    setCheckSelect(false);
    setTypePerson(0);
  };

  const calculateAge = (date) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let age = currentYear - date.year;

    if (
      currentMonth < date.month ||
      (currentMonth === date.month && currentDay < date.day)
    ) {
      age--;
    }

    return age;
  };

  const handleConfirm = (date) => {
    const date1 = date.day + "/" + date.month + "/" + date.year;
    setCheckSelect(false);

    const date2 = { day: date.day, month: date.month, year: date.year };
    const age = calculateAge(date2);

    if (typePerson === "1") {
      if (age < 6 || age > 10) {
        setCheckNoti(true);
        setTypePerson(0);
        setSalePrice(0);
        if (onUpdateTicket) {
          onUpdateTicket({
            ...oneWayTickets,
            finalPrice: oneWayTickets.price,
          });
        }
        handleUpPassenger({ ...oneWayTickets, passengerType: "Người lớn" });
      } else {
        setDate(date1);
        setDisabled(true);
        handleUpPassenger({ ...oneWayTickets, dateOfBirth: date1, cccd: "" });
      }
    }
    if (typePerson === "3") {
      if (age <= 60) {
        setCheckNoti(true);
        setTypePerson(0);
        setSalePrice(0);
        if (onUpdateTicket) {
          onUpdateTicket({
            ...oneWayTickets,
            finalPrice: oneWayTickets.price,
          });
        }
        handleUpPassenger({ ...oneWayTickets, passengerType: "Người lớn" });
      } else {
        setDate("");
        handleUpPassenger({ ...oneWayTickets, cccd: "" });
      }
    }
  };

  const handleCloseNoti = () => {
    setCheckNoti(false);
  };

  return (
    <>
      {checkNoti && (
        <Notification
          message={"Không đúng tuổi hưởng ưu đãi."}
          handleBtn={handleCloseNoti}
        />
      )}
      <tr className="payTicket_table_tr">
        <td className="payTicket_table_td">
          <div className="table_td_info">
            <div className="table_td_info-name">Họ tên</div>
            <input
              type="text"
              placeholder="Thông tin khách hàng"
              onChange={handleOnchangeName}
              value={passengerName}
            />
          </div>
          <div className="table_td_info">
            <div className="table_td_info-name">Đối tượng</div>
            <select value={typePerson} onChange={handleTypePersonChange}>
              <option value={0}>Người lớn</option>
              <option value={1}>Trẻ em</option>
              {/* <option value={2}>Sinh viên</option> */}
              <option value={3}>Người cao tuổi</option>
            </select>
          </div>
          <div className="table_td_info">
            <div className="table_td_info-name">Số giấy tờ</div>
            <input
              type="text"
              value={date}
              placeholder="Số CCCD / Ngày tháng năm sinh trẻ em"
              onChange={handleOnchangeCccd}
              disabled={disabled}
              className={disabled ? "ip_disabled" : ""}
            />
          </div>
        </td>
        <td className="payTicket_table_td">
          <div className="table_td-trip-text">
            {oneWayTickets.trainCode || oneWayTickets.trainCode1}{" "}
            {oneWayTickets.nameStartStation || oneWayTickets.nameStartStation1}-
            {oneWayTickets.nameEndStation || oneWayTickets.nameEndStation1}
          </div>
          <div className="table_td-trip-text">
            {new Date(
              oneWayTickets.departureTime || oneWayTickets.departureTime1
            ).toLocaleDateString("vi-VN")}{" "}
            {new Date(
              oneWayTickets.departureTime || oneWayTickets.departureTime1
            ).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="table_td-trip-text">
            Toa {oneWayTickets.trainCarNumber} chỗ {oneWayTickets.numSeat}
          </div>
          <div className="table_td-trip-text">
            Khoang {oneWayTickets.trainCarTypeCode}
          </div>
        </td>
        <td className="payTicket_table_td">
          {(oneWayTickets.price * 1000).toLocaleString("en-US")}
        </td>
        <td className="payTicket_table_td">
          {(salePrice * 1000).toLocaleString("en-US")}
        </td>
        <td className="payTicket_table_td">
          {(oneWayTickets.finalPrice * 1000).toLocaleString("en-US")}
        </td>
        <td className="payTicket_table_td payTicket_table_td_imgDel">
          <img src={imgDel} onClick={() => deleteTicket(oneWayTickets)} />
        </td>
      </tr>
      {checkSelect && (
        <SelectDate
          elderly={elderly}
          onclickCancel={handleCancel}
          onClickConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default RowInfoTicket;
