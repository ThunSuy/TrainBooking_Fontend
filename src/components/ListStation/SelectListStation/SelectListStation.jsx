import React, { useState } from "react";
import "./SelectListStation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain } from "@fortawesome/free-solid-svg-icons";

const SelectListStation = ({ onclick, stationName, bgr }) => {
  const listStatiton = JSON.parse(localStorage.getItem("stations"));
  //   console.log(listStatiton);

  const handleSelectStation = (stationName) => {
    onclick(stationName);
  };

  return (
    <div className={`selectListStation  ${bgr ? "bgr1" : "bgr2"}`}>
      {listStatiton.map((station, index) => (
        <div
          key={index}
          className={`selectListStation_item ${
            stationName === station.trainName
              ? bgr
                ? "active1"
                : "active"
              : ""
          }`}
          onClick={() => handleSelectStation(station.trainName)}
        >
          <FontAwesomeIcon
            icon={faTrain}
            className="selectListStation_item_icon"
          />
          <p>{station.trainName}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectListStation;
