import React, { useState, useEffect, useRef } from "react";
import "./FormFind.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../Button/Button";
import SelectStation from "../../SelectStation/SelectStation";
import Notification from "../../Notification/Notification";

const FormFind = () => {
  // useNavigate
  const navigate = useNavigate();

  // useRef
  const inputGadi = useRef(null);
  const inputGaden = useRef(null);
  const pickerMotChieuReF = useRef(null);
  const pickerKhuHoiRef = useRef(null);

  // useState
  const [stations, setStations] = useState([]);
  // const [dataFindOneWay, setDataFindOneWay] = useState([]);
  // const [dataFindRound, setDataFindRound] = useState([]);
  const [showGadi, setShowGadi] = useState(false);
  const [showGaden, setShowGaden] = useState(false);
  const [findGadi, setFindGadi] = useState([]);
  const [findGaden, setFindGaden] = useState([]);
  const [showDateBtnKhuHoi, setShowDateBtnKhuHoi] = useState(false);

  // xử lý thông báo
  const [showNoti, setShowNoti] = useState(false);
  const [notiMessage, setNotiMessage] = useState("");

  // useState & data FormFind
  const [gadi, setGadi] = useState("");
  const [gaden, setGaden] = useState("");
  const [typeTrip, setTypeTrip] = useState("Một chiều");
  const [dateMotChieu, setDateMotChieu] = useState(null);
  const [dateKhuHoi, setDateKhuHoi] = useState(null);

  // useState && erorr
  const [errorGaDi, setErrorGaDi] = useState("");
  const [errorGaDen, setErrorGaDen] = useState("");
  const [errorNgayDi, setErrorNgayDi] = useState("");
  const [errorNgayVe, setErrorNgayVe] = useState("");

  const bookerData = JSON.parse(localStorage.getItem("bookerData"));

  useEffect(() => {
    loadDataStations();

    const removeDiacritics = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtered = stations.filter((station) =>
      removeDiacritics(station.trainName.toLowerCase()).includes(
        removeDiacritics(gadi.toLowerCase())
      )
    );

    const filtered1 = stations.filter((station) =>
      removeDiacritics(station.trainName.toLowerCase()).includes(
        removeDiacritics(gaden.toLowerCase())
      )
    );

    setFindGadi(filtered);
    setFindGaden(filtered1);
  }, [gadi, gaden]);

  useEffect(() => {
    setShowDateBtnKhuHoi(typeTrip !== "Khứ hồi");
  }, [typeTrip]);

  const loadDataStations = () => {
    const savedStations = localStorage.getItem("stations");

    if (savedStations) {
      setStations(JSON.parse(savedStations));
    }
  };

  const onChangeInputGadi = (event) => {
    setGadi(event.target.value);

    if (event.target.value !== "") {
      setShowGadi(true);
    } else {
      setShowGadi(false);
    }
  };

  const onChangeInputGaden = (event) => {
    setGaden(event.target.value);

    if (event.target.value !== "") {
      setShowGaden(true);
    } else {
      setShowGaden(false);
    }
  };

  const handleSelectGadi = (value) => {
    setGadi(value);
    setShowGadi(false);
    inputGadi.current.focus();
  };

  const handleSelectGaden = (value) => {
    setGaden(value);
    setShowGaden(false);
    inputGaden.current.focus();
  };

  const handleRadioChange = (event) => {
    setTypeTrip(event.target.value);
    if (event.target.value === "Một chiều") {
      setShowDateBtnKhuHoi(true);
    } else {
      setShowDateBtnKhuHoi(false);
    }
  };

  const handleDateMotChieu = (date) => {
    setDateMotChieu(date);
  };

  const handleDateKhuHoi = (date) => {
    setDateKhuHoi(date);
  };

  const openDateMotChieu = (event) => {
    event.preventDefault();
    pickerMotChieuReF.current.setFocus();
  };

  const openDateKhuHoi = () => {
    event.preventDefault();
    pickerKhuHoiRef.current.setFocus();
  };

  const getIdByTrainName = (trainName) => {
    const station = stations.find((station) => station.trainName === trainName);
    return station ? station.id : null;
  };

  const loadFindOneWay = async (idGaDi, idGaDen, date) => {
    const result = await axios.get(
      `http://localhost:8081/train-trip/search-train-trips?departureStationId=${idGaDi}&arrivalStationId=${idGaDen}&arrivalDate=${date}`,
      {
        validateStatus: () => {
          return true;
        },
      }
    );

    if (result.data.code === 1000) {
      return result.data.result;
    } else {
      setShowNoti(true);
      setNotiMessage(result.data.message);
    }
  };

  const loadFindRound = async (idGaDi, idGaDen, date) => {
    const result = await axios.get(
      `http://localhost:8081/train-trip/search-train-trips?departureStationId=${idGaDen}&arrivalStationId=${idGaDi}&arrivalDate=${date}`,
      {
        validateStatus: () => {
          return true;
        },
      }
    );

    if (result.data.code === 1000) {
      return result.data.result;
    } else {
      setShowNoti(true);
      setNotiMessage(result.data.message);
    }
  };

  const handleCloseNoti = () => {
    setNotiMessage("");
    setShowNoti(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    var isValid = true;

    const idGaDi = getIdByTrainName(gadi);
    const idGaDen = getIdByTrainName(gaden);

    if (!gadi || gadi.trim() === "" || idGaDi === null) {
      setErrorGaDi("Ga đi không hợp lệ");
      isValid = false;
    } else {
      setErrorGaDi("");
    }

    if (!gaden || gaden.trim() === "" || idGaDen === null) {
      setErrorGaDen("Ga đến không hợp lệ");
      isValid = false;
    } else {
      setErrorGaDen("");
    }

    if (!dateMotChieu) {
      setErrorNgayDi("Ngày đi không hợp lệ");
      isValid = false;
    } else {
      setErrorNgayDi("");
    }

    if (typeTrip === "Khứ hồi") {
      if (!dateKhuHoi) {
        setErrorNgayVe("Ngày về không hợp lệ");
        isValid = false;
      } else {
        setErrorNgayVe("");
      }
    } else {
      setErrorNgayVe("");
    }

    if (isValid) {
      if (
        bookerData &&
        bookerData.phone !== "1234567890" &&
        bookerData.cccd !== "123456789123"
      ) {
        const year = dateMotChieu.getFullYear();
        const month = String(dateMotChieu.getMonth() + 1).padStart(2, "0");
        const day = String(dateMotChieu.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        let formattedDate1 = "";
        if (typeTrip === "Khứ hồi") {
          const year1 = dateKhuHoi.getFullYear();
          const month1 = String(dateKhuHoi.getMonth() + 1).padStart(2, "0");
          const day1 = String(dateKhuHoi.getDate()).padStart(2, "0");
          formattedDate1 = `${year1}-${month1}-${day1}`;
        }

        const dataFindOneWay = await loadFindOneWay(
          idGaDi,
          idGaDen,
          formattedDate
        );
        const dataFindRound =
          typeTrip === "Khứ hồi"
            ? await loadFindRound(idGaDi, idGaDen, formattedDate1)
            : [];

        // loadFindOneWay(idGaDi, idGaDen, formattedDate);
        // loadFindRound(idGaDi, idGaDen, formattedDate1);

        if (dataFindOneWay.length > 0 && notiMessage === "") {
          localStorage.setItem(
            "dataFindOneWay",
            JSON.stringify(dataFindOneWay)
          );
          localStorage.setItem("dataFindRound", JSON.stringify(dataFindRound));
          navigate("/timve/ketqua");
        }
      } else if (
        bookerData &&
        bookerData.length !== 0 &&
        bookerData.phone === "1234567890" &&
        bookerData.cccd === "123456789123"
      ) {
        alert("Vui lòng cập nhật đầy đủ thông tin");
        navigate("/thongtinnguoidung");
      } else {
        alert("Vui lòng đăng nhập trước khi tìm vé");
        navigate("/dangnhap");
      }
    }
  };

  return (
    <>
      {showNoti && (
        <Notification message={notiMessage} handleBtn={handleCloseNoti} />
      )}
      <div className="formFind">
        <div className="formFind_title">
          <FontAwesomeIcon icon={faBars} className="formFind_title-icon" />
          <span className="formFind_title-name">Thông tin hành trình</span>
        </div>
        <form className="formFind_form">
          <div className="formFind_form-fromto formFind_form_gadi">
            <div className="formFind_form-text">Ga đi</div>
            <div className="formFind_form-erorr">{errorGaDi}</div>
            <input
              type="text"
              placeholder="Ga đi"
              ref={inputGadi}
              value={gadi}
              onChange={onChangeInputGadi}
              onFocus={() => setShowGadi(true)}
              onBlur={() => setTimeout(() => setShowGadi(false), 200)}
            />
            {showGadi && gadi !== "" && findGadi.length > 0 && (
              <div className="selectStation_gadi">
                <SelectStation
                  stations={findGadi}
                  onClickItem={handleSelectGadi}
                />
              </div>
            )}
          </div>
          <div className="formFind_form-fromto formFind_form_gaden">
            <div className="formFind_form-text">Ga đến</div>
            <div className="formFind_form-erorr">{errorGaDen}</div>
            <input
              type="text"
              placeholder="Ga đến"
              ref={inputGaden}
              value={gaden}
              onChange={onChangeInputGaden}
              onFocus={() => setShowGaden(true)}
              onBlur={() => setTimeout(() => setShowGaden(false), 200)}
            />
            {showGaden && gaden !== "" && findGaden.length > 0 && (
              <div className="selectStation_gaden">
                <SelectStation
                  stations={findGaden}
                  onClickItem={handleSelectGaden}
                />
              </div>
            )}
          </div>
          <div className="formFind_form-trip">
            <input
              name="typeTrip"
              id="radioOne"
              type="radio"
              value="Một chiều"
              checked={typeTrip === "Một chiều"}
              onChange={handleRadioChange}
            />
            <span className="formFind_form-trip-text">Một chiều</span>
            <input
              name="typeTrip"
              id="radioTwo"
              type="radio"
              value="Khứ hồi"
              checked={typeTrip === "Khứ hồi"}
              onChange={handleRadioChange}
            />
            <span className="formFind_form-trip-text">Khứ hồi</span>
          </div>
          <div className="formFind_form-dayFromTo formFind_ngaydi">
            <div className="formFind_form-text">Ngày đi</div>
            <div className="formFind_form-erorr">{errorNgayDi}</div>
            <div className="formFind_form-dayFromTo-btn">
              <DatePicker
                ref={pickerMotChieuReF}
                selected={dateMotChieu}
                onChange={(date) => handleDateMotChieu(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                onKeyDown={(e) => e.preventDefault()}
              />
              <button
                onClick={openDateMotChieu}
                className="formFind_form-dayFromTo-button"
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="formFind_form-dayFromTo-icon"
                />
              </button>
            </div>
          </div>
          <div className="formFind_form-dayFromTo formFind_ngayve">
            <div className="formFind_form-text">Ngày về</div>
            <div className="formFind_form-erorr">{errorNgayVe}</div>
            <div className="formFind_form-dayFromTo-btn">
              <DatePicker
                ref={pickerKhuHoiRef}
                selected={dateKhuHoi}
                onChange={(date) => handleDateKhuHoi(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showMonthDropdown
                showYearDropdown
                scrollableYearDropdown
                disabled={showDateBtnKhuHoi}
                onKeyDown={(e) => e.preventDefault()}
              />
              <button
                onClick={openDateKhuHoi}
                className="formFind_form-dayFromTo-button"
                disabled={showDateBtnKhuHoi}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="formFind_form-dayFromTo-icon"
                />
              </button>
            </div>
          </div>
          <Button name="Tìm kiếm" onClick={handleSearch} />
        </form>
      </div>
    </>
  );
};

export default FormFind;
