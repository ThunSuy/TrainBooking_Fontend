import React from "react";
import "./ResultTrain.scss";
import ItemTrain from "./ItemTrain/ItemTrain";
import SelectTrain from "./SelectTrain/SelectTrain";
import { useState } from "react";

const ResultTrain = ({ message, listFind }) => {
  const [selectTrain, setSelectTrain] = useState();
  const [showTrain, setShowTrain] = useState(false);

  const handleSelectItem = (item) => {
    setSelectTrain(item);
    setShowTrain(true);
  };

  const handleBack = () => {
    setShowTrain(false);
  };

  return (
    <div className="resultTrain">
      {message.title ===
        "Không tìm thấy chuyến tàu nào theo tiêu chí đã chỉ định." && (
        <div className="resultTrain_empty">
          Không có tàu nào đi từ <span>{message.gadi}</span> đến ga{" "}
          <span>{message.gaden}</span> trong ngày <span>{message.ngaydi}</span>
        </div>
      )}
      {showTrain === false && listFind.length !== 0 && (
        <div className="resultTrain_list">
          {listFind.map((item, index) => (
            <ItemTrain
              key={index}
              item={item}
              onClick={(item) => handleSelectItem(item)}
            />
          ))}
        </div>
      )}

      {showTrain && selectTrain && (
        <div className="resultTrain_wrap">
          {<SelectTrain onClickBack={handleBack} item={selectTrain} />}
        </div>
      )}
    </div>
  );
};

export default ResultTrain;
