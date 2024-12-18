import React, { useState, useEffect, useRef } from "react";
import "./HomeCheckTicket.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SelectStation from "../../SelectStation/SelectStation";

const HomeCheckTicket = () => {
  const [maVe, setMaVe] = useState("");
  const [macTau, setMacTau] = useState("");
  const [gaDi, setGaDi] = useState("");
  const [gaDen, setGaDen] = useState("");
  const [dateNgayDi, setDateNgayDi] = useState("");
  const [hoTen, setHoTen] = useState("");

  // State cho lỗi
  const [maVeError, setMaVeError] = useState("");
  const [macTauError, setMacTauError] = useState("");
  const [gaDiError, setGaDiError] = useState("");
  const [gaDenError, setGaDenError] = useState("");
  const [dateNgayDiError, setDateNgayDiError] = useState("");
  const [hoTenError, setHoTenError] = useState("");

  const stations = JSON.parse(localStorage.getItem("stations"));

  const [showGadi, setShowGadi] = useState(true);
  const [showGaden, setShowGaden] = useState(false);
  const [findGadi, setFindGadi] = useState([]);
  const [findGaden, setFindGaden] = useState([]);

  const [checkAll, setCheckAll] = useState(true);
  const [resultHas, setResultHas] = useState("");
  const [resultNoHas, setResultNoHas] = useState("");

  const pickerMotChieuReF = useRef(null);

  useEffect(() => {
    const removeDiacritics = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filtered = stations.filter((station) =>
      removeDiacritics(station.trainName.toLowerCase()).includes(
        removeDiacritics(gaDi.toLowerCase())
      )
    );

    const filtered1 = stations.filter((station) =>
      removeDiacritics(station.trainName.toLowerCase()).includes(
        removeDiacritics(gaDen.toLowerCase())
      )
    );

    setFindGadi(filtered);
    setFindGaden(filtered1);
  }, [gaDi, gaDen]);

  const onChangeInputMaVe = (event) => {
    setMaVe(event.target.value);
  };

  const onChangeInputMacTau = (event) => {
    setMacTau(event.target.value);
  };

  const onChangeInputHoTen = (event) => {
    setHoTen(event.target.value);
  };

  const onChangeInputGadi = (event) => {
    setGaDi(event.target.value);

    if (event.target.value !== "") {
      setShowGadi(true);
    } else {
      setShowGadi(false);
    }
  };

  const onChangeInputGaden = (event) => {
    setGaDen(event.target.value);

    if (event.target.value !== "") {
      setShowGaden(true);
    } else {
      setShowGaden(false);
    }
  };

  const handleSelectGadi = (value) => {
    setGaDi(value);
    setShowGadi(false);
    // inputGadi.current.focus();
  };

  const handleSelectGaden = (value) => {
    setGaDen(value);
    setShowGaden(false);
    // inputGaden.current.focus();
  };

  const handleDateNgayDi = (date) => {
    setDateNgayDi(date);
  };

  const openDateNgayDi = (event) => {
    event.preventDefault();
    pickerMotChieuReF.current.setFocus();
  };

  const handleCheckTicket = async (event) => {
    let isValid = true;

    if (!maVe.trim()) {
      setMaVeError("Mã vé không được để trống");
      isValid = false;
    } else {
      setMaVeError("");
    }

    if (!macTau.trim()) {
      setMacTauError("Mã tàu không được để trống");
      isValid = false;
    } else {
      setMacTauError("");
    }

    if (!gaDi.trim()) {
      setGaDiError("Ga đi không được để trống");
      isValid = false;
    } else {
      setGaDiError("");
    }

    if (!gaDen.trim()) {
      setGaDenError("Ga đến không được để trống");
      isValid = false;
    } else {
      setGaDenError("");
    }

    // if (!dateNgayDi) {
    //   setDateNgayDiError("Ngày đi không được để trống");
    //   isValid = false;
    // } else {
    //   setDateNgayDiError("");
    // }

    if (!hoTen.trim()) {
      setHoTenError("Họ tên không được để trống");
      isValid = false;
    } else {
      setHoTenError("");
    }

    setCheckAll(isValid);
    if (isValid) {
      const requestData = {
        codeTicket: maVe,
        trainCode: macTau,
        nameStartStation: gaDi,
        nameEndStation: gaDen,
        timeStart: dateNgayDi,
        passengerName: hoTen,
      };

      try {
        const response = await axios.post(
          "http://localhost:8081/ticket/exists",
          requestData
        );
        const { result, message } = response.data;

        if (result) {
          setResultNoHas("");
          setResultHas(message);
        } else {
          setResultHas("");
          setResultNoHas(message);
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra vé:", error);
      }
    }
  };

  return (
    <div className="homeCheckTicket">
      <div className="homeCheckTicket_title">Kiểm tra vé</div>
      <div className="homeCheckTicket_noti">
        <p>
          Theo quy định của Tổng công ty Đường sắt Việt Nam, hành khách có thông
          tin giấy tờ tùy thân trùng với thông tin trên vé điện tử mới đủ điều
          kiện vào ga lên tàu.
        </p>
        <p>
          Để đảm bảo quyền lợi cho hành khách, tránh mua phải vé giả, hoặc vé
          không đúng với quy định, quý khách có thể kiểm tra lại vé điện tử của
          mình bằng cách điền đầy đủ các thông tin dưới đây.
        </p>
      </div>
      {!checkAll && (
        <div className="homeCheckTicket_formErorr">
          Thông tin quý khách nhập chưa chính xác, vui lòng kiểm tra các mục lỗi
          màu đỏ bên dưới.
        </div>
      )}
      <form className="form">
        <div className="form_list">
          <div className="form_item">
            <div className="form_item_text">Mã vé</div>
            <div className="form_item_ip">
              <input
                type="text"
                placeholder="Nhập mã vé gồm 8 ký tự số"
                value={maVe}
                onChange={onChangeInputMaVe}
              />
              {maVeError && <p>{maVeError}</p>}
            </div>
          </div>
          <div className="form_item">
            <div className="form_item_text">Mác tàu</div>
            <div className="form_item_ip">
              <input
                type="text"
                placeholder="Ví dụ SE1, TN1, SE2, SE6 ..."
                value={macTau}
                onChange={onChangeInputMacTau}
              />
              {macTauError && <p>{macTauError}</p>}
            </div>
          </div>
          <div className="form_item formFind_form_gadi">
            <div className="form_item_text">Ga đi</div>
            <div className="form_item_ip">
              <input
                type="text"
                placeholder="Nhập ga đi tại đây"
                value={gaDi}
                onChange={onChangeInputGadi}
              />
              {gaDiError && <p>{gaDiError}</p>}
            </div>
            {showGadi && gaDi !== "" && findGadi.length > 0 && (
              <div className="selectStation_gadi">
                <SelectStation
                  stations={findGadi}
                  onClickItem={handleSelectGadi}
                />
              </div>
            )}
          </div>
          <div className="form_item formFind_form_gaden">
            <div className="form_item_text">Ga đến</div>
            <div className="form_item_ip">
              <input
                type="text"
                placeholder="Nhập ga đến tại đây"
                value={gaDen}
                onChange={onChangeInputGaden}
              />
              {gaDenError && <p>{gaDenError}</p>}
            </div>
            {showGaden && gaDen !== "" && findGaden.length > 0 && (
              <div className="selectStation_gaden">
                <SelectStation
                  stations={findGaden}
                  onClickItem={handleSelectGaden}
                />
              </div>
            )}
          </div>
          {/* <div className="form_item">
            <div className="form_item_text">Ngày đi</div>
            <div className="form_item_ip1 formFind_ngaydi">
              <div className="formFind_ngaydi_select">
                <DatePicker
                  ref={pickerMotChieuReF}
                  selected={dateNgayDi}
                  onChange={(date) => handleDateNgayDi(date)}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                  onKeyDown={(e) => e.preventDefault()}
                />
                <button className="form_item-button" onClick={openDateNgayDi}>
                  <FontAwesomeIcon icon={faCalendarDays} className="icon" />
                </button>
              </div>
              {dateNgayDiError && <p>{dateNgayDiError}</p>}
            </div>
          </div> */}
          <div className="form_item">
            <div className="form_item_text">Họ tên</div>
            <div className="form_item_ip">
              <input
                type="text"
                placeholder="Nhập họ tên ghi trên vé"
                value={hoTen}
                onChange={onChangeInputHoTen}
              />
              {hoTenError && <p>{hoTenError}</p>}
            </div>
          </div>
        </div>
        <span className="form_btn" onClick={handleCheckTicket}>
          Kiểm tra vé
        </span>
      </form>
      <div className="homeCheckTicket_result">
        {resultHas && (
          <div className="homeCheckTicket_result_text">Vé hợp lệ</div>
        )}
        {resultNoHas && (
          <div className="homeCheckTicket_result_text1">Vé không hợp lệ</div>
        )}
      </div>
    </div>
  );
};

export default HomeCheckTicket;
