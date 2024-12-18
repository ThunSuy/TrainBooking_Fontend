import React from "react";
import "./TrainTrip.scss";

const TrainTrip = ({
  trainCode,
  departureTime,
  endTime,
  emptyNum,
  bookedNum,
  ColorBackgr,
  onClick,
}) => {
  return (
    <div className={"TrainTrip"} onClick={onClick}>
      <div className={`TrainTrip_wrap TrainTrip_bgColor-${ColorBackgr}`}>
        <div className="TrainTrip_name">{trainCode}</div>
        <div className="TrainTrip_info">
          <div className="TrainTrip_time">
            <span className="TrainTrip_time_name">TG đi</span>
            <span className="TrainTrip_text">
              {new Date(departureTime).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              {new Date(departureTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {/* <span className="TrainTrip_text">06/11 15:30</span> */}
          </div>
          <div className="TrainTrip_time">
            <span className="TrainTrip_time_name">TG đến</span>
            <span className="TrainTrip_text">
              {new Date(endTime).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
              })}{" "}
              {new Date(endTime).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {/* <span className="TrainTrip_text">08/11 05:30</span> */}
          </div>
          <div className="TrainTrip_slot">
            <div className="TrainTrip_slot_num1">
              <div className="TrainTrip_text">SL chỗ đặt</div>
              <div className="TrainTrip_slot_num_sl1">{bookedNum}</div>
            </div>
            <div className="TrainTrip_slot_num2">
              <div className="TrainTrip_text">SL chỗ trống</div>
              <div className="TrainTrip_slot_num_sl2">{emptyNum}</div>
            </div>
          </div>
        </div>
        <div className="TrainTrip_circle">
          <div className="TrainTrip_circle_draw"></div>
          <div className="TrainTrip_circle_draw"></div>
        </div>
      </div>
      <div className="TrainTrip_footer"></div>
      <div className="TrainTrip_footer-2"></div>
      <div className="TrainTrip_footer-3"></div>
      <div className="TrainTrip_footer-4"></div>
      <div className="TrainTrip_footer-5"></div>
    </div>
  );
};

export default TrainTrip;
