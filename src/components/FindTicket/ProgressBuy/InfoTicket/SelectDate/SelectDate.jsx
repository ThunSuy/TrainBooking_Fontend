import React, { useState, useEffect } from "react";
import "./SelectDate.scss";

const SelectDate = ({ elderly, onclickCancel, onClickConfirm }) => {
  const currentYear = new Date().getFullYear();

  // State cho ngày, tháng, năm
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(currentYear);

  // Gán giá trị mặc định cho ngày, tháng, năm
  useEffect(() => {
    setDay(1);
    setMonth(1);
    setYear(currentYear);
  }, []);

  return (
    <div className="selectDate" onClick={onclickCancel}>
      <div className="selectDate_wrap" onClick={(e) => e.stopPropagation()}>
        <div className="selectDate_wrap_title">Ngày tháng năm sinh</div>
        <div className="selectDate_wrap_info">
          {elderly ? (
            <span>
              Người cao tuổi (người từ 60 tuổi trở lên) được hưởng chính sách
              giảm giá theo quy định của Tổng công ty Đường sắt Việt Nam.
            </span>
          ) : (
            <>
              <span>Trẻ em dưới 6 tuổi không cần phải mua vé </span>
              <br />
              <span>Trẻ em từ 6 tuổi đến 10 tuổi được mua vé trẻ em </span>
            </>
          )}
        </div>
        <div className="selectDate_wrap_date">
          <select value={day} onChange={(e) => setDay(Number(e.target.value))}>
            {[...Array(31).keys()].map((d) => (
              <option key={d + 1} value={d + 1}>
                {d + 1}
              </option>
            ))}
          </select>
          <span>-</span>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          >
            {[...Array(12).keys()].map((m) => (
              <option key={m + 1} value={m + 1}>
                {m + 1}
              </option>
            ))}
          </select>
          <span>-</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {[...Array(100).keys()]
              .map((offset) => currentYear - offset)
              .map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
          </select>
        </div>
        <div className="selectDate_wrap_button">
          <button onClick={onclickCancel}>Huỷ</button>
          <button
            onClick={() =>
              onClickConfirm && onClickConfirm({ day, month, year })
            }
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectDate;
