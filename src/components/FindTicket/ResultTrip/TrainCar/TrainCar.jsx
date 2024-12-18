import React from "react";
import "./TrainCar.scss";

const TrainCar = ({
  BackgrColor,
  typeCar,
  num,
  onClick,
  codeType,
  description,
}) => {
  const handleClick = () => {
    onClick(num, codeType);
  };

  return (
    <div
      className="TrainCar"
      onClick={typeCar !== "firstCar" ? handleClick : undefined}
    >
      <div className={`TrainCar_image TrainCar_${BackgrColor}`}>
        <img
          src={
            typeCar === "firstCar"
              ? "/src/assets/img/train2.png"
              : "/src/assets/img/trainCar2.png"
          }
          className="TrainCar_img"
          alt="Train Car"
        />
      </div>
      <div className="TrainCar_num">{num}</div>
      {typeCar !== "firstCar" && (
        <div className="TrainCar_title">
          {description} ({codeType})
        </div>
      )}
    </div>
  );
};

export default TrainCar;
