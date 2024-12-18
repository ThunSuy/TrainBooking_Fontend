import React from "react";
import "./SelectStation.scss";
import { useState, useEffect } from "react";

const SelectStation = ({ stations, onClickItem }) => {
  return (
    <ul className="selectStation_list">
      {stations &&
        stations.map((station) => (
          <li
            key={station.id}
            className="selectStation_item"
            onClick={() => onClickItem(station.trainName)}
          >
            {station.trainName}
          </li>
        ))}
    </ul>
  );
};

export default SelectStation;
