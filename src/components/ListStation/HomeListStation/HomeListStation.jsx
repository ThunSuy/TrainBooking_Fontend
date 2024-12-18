import React from "react";
import "./HomeListStation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import SelectListStation from "../SelectListStation/SelectListStation";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import ResultTrain from "../ResultTrain/ResultTrain";
import { faTrain } from "@fortawesome/free-solid-svg-icons";

const HomeListStation = () => {
  // Các state cho thông tin ga và tàu
  const [gaDi, setGaDi] = useState("");
  const [gaDen, setGaDen] = useState("");
  const [ngayDi, setNgayDi] = useState("");
  const [tau, setTau] = useState("");

  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");
  const [listFind, setListFind] = useState([]);

  const [selectMap, setSelectMap] = useState({
    id: 1,
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.498682681922!2d106.66821536977538!3d10.782589199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752feaf0743613%3A0xb5e108d98f32c4ca!2zR2EgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1733229441621!5m2!1svi!2s",
  });

  const listStation = JSON.parse(localStorage.getItem("stations"));

  const gaDiInputRef = useRef(null);
  const gaDenInputRef = useRef(null);
  const ngayDiInputRef = useRef(null);
  const tauInputRef = useRef(null);

  const handleSlectStationStart = (station) => {
    setGaDi(station);
    gaDenInputRef.current.focus();
    setStep(2);
  };

  const handleSlectStationEnd = (station) => {
    setGaDen(station);
    ngayDiInputRef.current.focus();
    setStep(3);
  };

  const handleSlectDateStart = async (date) => {
    let valueDate = "";
    let formattedDate1 = "";
    if (date instanceof Date) {
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
      valueDate =
        date.getFullYear().toString() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0");

      formattedDate1 = formattedDate;
      setNgayDi(formattedDate);
    } else {
      console.error("Invalid date format");
    }
    tauInputRef.current.focus();
    if (gaDi !== "" && gaDen !== "" && valueDate !== "") {
      const idGadi =
        listStation.find((station) => station.trainName === gaDi)?.id || "";
      const idGaden =
        listStation.find((station) => station.trainName === gaDen)?.id || "";
      try {
        const response = await axios.get(
          `http://localhost:8081/train-trip/search-train-trips?departureStationId=${idGadi}&arrivalStationId=${idGaden}&arrivalDate=${valueDate}`,
          {
            validateStatus: () => true,
          }
        );

        if (response.data && response.data.code === 1000) {
          setListFind(response.data.result);
          setMessage("");
        } else {
          const message1 = {
            title: response.data.message,
            gadi: gaDi,
            gaden: gaDen,
            ngaydi: formattedDate1,
          };
          setMessage(message1);
          setListFind([]);
        }
      } catch (error) {
        console.error("API call failed:", error.message);
      }
      setStep(4);
    }
  };

  const handleFocusGadi = () => {
    setStep(1);
    setGaDen("");
    setNgayDi("");
    setTau("");
  };

  const handleFocusGaden = () => {
    if (gaDi !== "") {
      setStep(2);
    }
    setNgayDi("");
    setTau("");
  };

  const handleFocusNgaydi = () => {
    if (gaDen !== "") {
      setStep(3);
    }
    setTau("");
  };

  const handleShow = () => {
    setShow(!show);
    setListFind([]);

    setSelectMap({
      id: 1,
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.498682681922!2d106.66821536977538!3d10.782589199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752feaf0743613%3A0xb5e108d98f32c4ca!2zR2EgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1733229441621!5m2!1svi!2s",
    });
    setGaDi("");
    setGaDen("");
    setNgayDi("");
    setStep(1);
  };

  const handleSelectMap = (item) => {
    const maps = [
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15677.498682681922!2d106.66821536977538!3d10.782589199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752feaf0743613%3A0xb5e108d98f32c4ca!2zR2EgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1733229441621!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15667.697623046795!2d107.99343817964605!3d10.969078527783381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174287c2a8f4f01%3A0x59048273b24b3a50!2sGa%20Binh%20Thuan!5e0!3m2!1svi!2s!4v1733229936162!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.9970295698918!2d109.18170047480989!3d12.24847993031994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31705d7fa287d14d%3A0xd77430eea6aa58da!2sGa%20Nha%20Trang!5e0!3m2!1svi!2s!4v1733230245752!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.176239385494!2d109.29512737482125!3d13.08801451231577!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fec119c260113%3A0xc3fbc6d40465c5f0!2sGa%20Tuy%20H%C3%B2a!5e0!3m2!1svi!2s!4v1733230306041!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3851.6797916951127!2d108.77891787485265!3d15.120966564125522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169ad18d1524701%3A0xd5e1e3b196eeeccf!2zR2EgUXXhuqNuZyBOZ8OjaQ!5e0!3m2!1svi!2s!4v1733230462566!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.88214201602!2d108.20443587845307!3d16.071604599710934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219fb1e7f7191%3A0x86f207e3bce38fe5!2zR0EgxJDDgCBO4bq0Tkc!5e0!3m2!1svi!2s!4v1733230494965!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.376122952142!2d107.57562992487652!3d16.45648182895508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a14aec056801%3A0xc733927e1363b8dc!2zR2EgSHXhur8!5e0!3m2!1svi!2s!4v1733230555349!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8061614385942!2d106.5949800786612!3d17.468989357753056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314756e674569d73%3A0xa2d8f53f958044d0!2zR2EgxJDhu5NuZyBI4bubaQ!5e0!3m2!1svi!2s!4v1733230592893!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.461130645661!2d105.66145937492146!3d18.688162164034033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139ce3fdc4fb15f%3A0x6f1d73c71027c0ab!2sGa%20Vinh!5e0!3m2!1svi!2s!4v1733230620685!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.6252018096584!2d105.76545107494668!3d19.8134823284076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3136f7f7add26669%3A0xbff48135e3d7560e!2sGa%20Thanh%20H%C3%B3a!5e0!3m2!1svi!2s!4v1733230658085!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.063758021709!2d106.16186477496107!3d20.4214573083606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e0ab55f66c07%3A0x208b04c9b2224c9!2zR2EgTmFtIMSQ4buLbmg!5e0!3m2!1svi!2s!4v1733230747053!5m2!1svi!2s",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.208664434157!2d105.83622237927037!3d21.0243352379925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9efb3905af%3A0x1ba6ca099f18e709!2zR2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1733230823797!5m2!1svi!2s",
    ];
    const data = {
      id: item.id,
      src: maps[item.id - 1],
    };
    setSelectMap(data);
  };

  return (
    <div className="homeListStation">
      <div className="homeListStation_title">
        <FontAwesomeIcon icon={show ? faClockFour : faTrain} />
        <p>{show ? "Thông tin hành trình" : "Danh sách các ga"}</p>
      </div>
      <div className="homeListStation_btn">
        <span onClick={handleShow}>
          {show ? "Xem danh sách các ga" : "Chọn hành trình"}
        </span>
      </div>
      {!show && (
        <div className="homeListStation_contai">
          <div className="homeListStation_contai_left">
            <div className="homeListStation_contai_header">
              Bảng danh sách ga
            </div>
            <table className="station-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên ga</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                {listStation.map((station, index) => (
                  <tr
                    key={index}
                    onClick={() => handleSelectMap(station)}
                    className={selectMap.id === station.id ? "select" : ""}
                  >
                    <td>{station.id}</td>
                    <td>{station.trainName}</td>
                    <td>{station.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="homeListStation_contai_right">
            <div className="homeListStation_contai_header">Google Maps</div>
            <div>
              <iframe
                src={selectMap.src}
                width="100%"
                height="388px"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div className="homeListStation_wrap">
          <div className="homeListStation_wrap_ip">
            <div className="homeListStation_wrap_ip_item">
              <div className="homeListStation_wrap_ip_item_left">
                <p className="homeListStation_wrap_ip_item_left_num">1</p>
                <p className="homeListStation_wrap_ip_item_left_text">Ga đi</p>
              </div>
              <input
                type="text"
                value={gaDi}
                ref={gaDiInputRef}
                onFocus={handleFocusGadi}
                placeholder={step === 1 ? "Chọn ga đi bên dưới" : ""}
              />
            </div>
            <div className="homeListStation_wrap_ip_item">
              <div className="homeListStation_wrap_ip_item_left">
                <p className="homeListStation_wrap_ip_item_left_num">2</p>
                <p className="homeListStation_wrap_ip_item_left_text">Ga đến</p>
              </div>
              <input
                type="text"
                value={gaDen}
                ref={gaDenInputRef}
                onFocus={handleFocusGaden}
                placeholder={step === 2 ? "Chọn ga đến bên dưới" : ""}
              />
            </div>
            <div className="homeListStation_wrap_ip_item">
              <div className="homeListStation_wrap_ip_item_left">
                <p className="homeListStation_wrap_ip_item_left_num">3</p>
                <p className="homeListStation_wrap_ip_item_left_text">Ngày</p>
              </div>
              <input
                type="text"
                value={ngayDi}
                ref={ngayDiInputRef}
                onFocus={handleFocusNgaydi}
                placeholder={step === 3 ? "Chọn ngày bên dưới" : ""}
              />
            </div>
            <div className="homeListStation_wrap_ip_item">
              <div className="homeListStation_wrap_ip_item_left">
                <p className="homeListStation_wrap_ip_item_left_num">4</p>
                <p className="homeListStation_wrap_ip_item_left_text">Tàu</p>
              </div>
              <input
                type="text"
                value={tau}
                ref={tauInputRef}
                disabled
                className="ip_not"
                placeholder={step === 4 ? "Chọn tàu bên dưới" : ""}
              />
            </div>
          </div>
          <div className="homeListStation_wrap_stati">
            {step === 1 && (
              <SelectListStation
                stationName={gaDi}
                onclick={handleSlectStationStart}
              />
            )}
            {step === 2 && (
              <SelectListStation
                stationName={gaDen}
                onclick={handleSlectStationEnd}
                bgr={true}
              />
            )}
            {step === 3 && (
              <div style={{ minHeight: "250px" }}>
                <DatePicker
                  selected={
                    ngayDi
                      ? new Date(ngayDi.split("/").reverse().join("-"))
                      : null
                  }
                  onChange={(date) => handleSlectDateStart(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Chọn ngày"
                  open={true}
                  customInput={<div />}
                  popperClassName="custom-calendar"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, 100],
                      },
                    },
                  ]}
                />
              </div>
            )}
            {step === 4 && (
              <ResultTrain message={message} listFind={listFind} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeListStation;
