import React from "react";

const DetailHistory = ({ result }) => {
  return (
    <tr>
      <td>{result.ticketCode}</td>
      <td>{result.passengerName}</td>
      <td>{result.cccd === "" ? result.dateOfBirth : result.cccd}</td>
      <td>
        {result.passengerType === "ADULT"
          ? "Người lớn"
          : result.passengerType === "CHILD"
          ? "Trẻ em"
          : "Người cao tuổi"}
      </td>
      <td>{result.nameStartStation}</td>
      <td>{result.nameEndStation}</td>
      <td>{result.trainCode}</td>
      <td>
        Toa: {result.trainCarNumber} chỗ số: {result.trainSeatNumber} (
        {result.codeType})
      </td>
      <td>{new Date(result.timeStart).toLocaleDateString("vi-VN")}</td>
      <td>
        {new Date(result.timeStart).toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </td>
    </tr>
  );
};

export default DetailHistory;
