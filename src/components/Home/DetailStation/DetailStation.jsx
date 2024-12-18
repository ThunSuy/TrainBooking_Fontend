import React from "react";
import "./DetailStation.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import gaHaNoi from "../../../assets/img/gaHaNoi.jpg";
import gaVinh from "../../../assets/img/gaVinh.jpg";
import gaHue from "../../../assets/img/gaHue.jpg";
import gaDaNang from "../../../assets/img/gaDaNang.jpg";
import gaQuangNgai from "../../../assets/img/gaQuangNgai.jpg";
import gaNhaTrang from "../../../assets/img/gaNhaTrang.jpg";
import gaSaiGon from "../../../assets/img/gaSaiGon.jpg";

const DetailStation = ({ station }) => {
  const stationsData = {
    "Ga Hà Nội": {
      diachi: "120 Lê Duẩn, Hoàn Kiếm, Hà Nội",
      sodt: "1900 0109",
      img: gaHaNoi,
    },
    "Ga Huế": {
      diachi: "Số 02 Bùi Thị Xuân - Thành phố Huế - Tỉnh Thừa Thiên Huế",
      sodt: "054-3822.175",
      img: gaHue,
    },
    "Ga Quảng Ngãi": {
      diachi:
        " 204 Nguyễn Chí Thanh - Phường Quảng Phú - Thị xã Quảng Ngãi - Tỉnh Quảng Ngãi",
      sodt: "055-3820.280",
      img: gaQuangNgai,
    },
    "Ga Nha Trang": {
      diachi:
        "17 Thái Nguyên - Phường Phước Tân - Thành phố Nha Trang - Tỉnh Khánh Hòa",
      sodt: "058-3822.113",
      img: gaNhaTrang,
    },
    "Ga Sài Gòn": {
      diachi: "Số 01 Nguyễn Thông - Phường 9 - Quận 3 - Thành phố Hồ Chí Minh",
      sodt: "1900 1520",
      img: gaSaiGon,
    },
  };

  return (
    <div className="stationHome_left_wrap_show">
      <div className="stationHome_left_wrap_show_info">
        <FontAwesomeIcon icon={faLocationDot} className="stationHome_icon" />
        <span className="stationHome_left_wrap_show_info-text">
          {stationsData[station].diachi}
        </span>
      </div>
      <div className="stationHome_left_wrap_show_info">
        <FontAwesomeIcon icon={faPhone} className="stationHome_icon" />
        <span>{stationsData[station].sodt}</span>
      </div>
      <img src={stationsData[station].img} />
    </div>
  );
};

export default DetailStation;
