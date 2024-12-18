import React from "react";
import "./DetailJourney.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRightToBracket,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

const DetailJourney = ({ title }) => {
  const data = {
    "Đoạn 1": {
      gaDi: "Hà Nội",
      gaDen: "Vinh",
      soKm: 282,
      mota: [
        "Điểm đầu từ ga Hà Nội hoặc ga Ngọc Hồi, cơ bản song song với đường sắt hiện tại, qua khu vực Phú Xuyên, vượt qua quốc lộ 1A, cao tốc Pháp Vân – Cầu Giẽ và đi về phía Đông đường bộ cao tốc, tuyến tiếp cận ga Phủ Lý. Sau đó, tuyến vượt đường sắt hiện tại, vượt đường Nam Định – Phủ Lý và tiếp cận ga Nam Định. Tuyến đường sắt mới đi song song đường sắt hiện tại, vượt sông Đáy và tiếp cận ga Ninh Bình dự kiến đặt tại khu vực Mai Sơn (TP Ninh Bình).",
        "Từ ga Ninh Bình, tuyến đi về phía nam, xuyên qua dãy núi Tam Điệp vào Thanh Hóa. Ga Thanh Hóa dự kiến đặt tại phường Đông Sơn, cách trung tâm thành phố khoảng 3-4km. Tuyến đi song song quốc lộ 1A, xuyên qua núi Thần Vũ, tiếp cận ga Vinh dự kiến tại phía Tây thành phố Vinh.",
      ],
    },
    "Đoạn 2": {
      gaDi: "Vinh",
      gaDen: "Đà Nẵng",
      soKm: 432,
      mota: [
        "Từ ga Vinh, tuyến đường sắt tốc độ cao vượt sông Lam vào Hà Tĩnh, chạy song song về phía Tây quốc lộ 1A và đến ga Hà Tĩnh ở phía Tây thành phố.",
        "Từ ga Vũng Áng, tuyến đi về phía Đông của đường bộ cao tốc, xuyên qua đèo Ngang tỉnh Quảng Bình, vượt sông Gianh, đến ga Đồng Hới . Sau đó, tuyến vượt sông Nhật Lệ theo hướng đường sắt hiện tại, đến ga Đông Hà.",
        "Tuyến đi về phía Nam theo hướng song song đường sắt hiện tại, tiếp cận thành phố Huế ở phía Tây. Ga Huế tại phường Thủy Xuân. Từ ga Huế, tuyến đi song song với đường sắt hiện tại, vượt đầm Cầu Hai, qua khu kinh tế Chân Mây, và xuyên qua đèo Hải Vân đến ga Đà Nẵng dự kiến tại phường Hòa Khánh Nam, quận Liên Chiểu, cách sân bay Đà Nẵng khoảng 4km.",
      ],
    },
    "Đoạn 3": {
      gaDi: "Đà Nẵng",
      gaDen: "Nha Trang",
      soKm: 472,
      mota: [
        "Từ ga Đà Nẵng, đường sắt tốc độ cao đi song song đường sắt hiện tại và đến ga Tam Kỳ dự kiến đặt tại phía Tây thành phố Tam Kỳ (tỉnh Quảng Nam). Tuyến vượt sông Trà Khúc và đến ga Quảng Ngãi,,chạy về phía nam đến tỉnh Bình Định và tiếp cận thị trấn Phù Mỹ, đến ga Diêu Trì dự kiến để kết nối với thành phố Quy Nhơn.",
        "Từ ga Diêu Trì, tuyến đi xuyên qua đèo Cù Mông sang tỉnh Phú Yên, vượt sông Đà Rằng và đến ga Tuy Hòa dự kiến đặt cách trung tâm thành phố khoảng 8km, cách sân bay Tuy Hòa khoảng 2,2km.",
        "Tuyến tiếp tục đi xuyên qua Đèo Cả sang tỉnh Khánh Hòa, song song đường sắt hiện tại, tiếp cận ga Nha Trang dự kiến đặt tại xã Vĩnh Thạnh, cách trung tâm thành phố khoảng 4,5km.",
      ],
    },
    "Đoạn 4": {
      gaDi: "Nha Trang",
      gaDen: "TP HCM",
      soKm: 363,
      mota: [
        "Từ ga Nha Trang, tuyến đi cơ bản song song với đường sắt hiện tại và đến ga Tháp Chàm dự kiến đặt tại phường Đô Vinh, cách TP Phan Rang khoảng 5km về phía Tây. Sau đó, tuyến đi về phía Đông núi Vĩnh Tân, đến ga Tuy Phong dự kiến đặt tại xã Hòa Minh, huyện Tuy Phong, tỉnh Bình Thuận.",
        "Từ ga Tuy Phong, đường sắt tốc độ cao vượt quốc lộ 1A đến ga Phan Thiết dự kiến đặt tại xã Phong Nẫm, TP Phan Thiết. Sau đó, tuyến đi về phía tỉnh Đồng Nai, tiếp cận ga Long Thành tại trung tâm sân bay quốc tế Long Thành. Qua sân bay Long Thành, tuyến cơ bản đi cùng hướng tuyến đường bộ cao tốc TP HCM – Long Thành – Dầu Giây về ga Thủ Thiêm đặt tại quận 2, TP HCM.",
      ],
    },
  };

  return (
    <div className="stationHome_right_detail">
      <div className="stationHome_right_detail_title">
        <FontAwesomeIcon
          icon={faTrain}
          className="stationHome_right_detail_icon"
        />
        <span>{data[title].gaDi}</span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="stationHome_right_detail_icon-to"
        />
        <FontAwesomeIcon
          icon={faTrain}
          className="stationHome_right_detail_icon"
        />
        <span>{data[title].gaDen}</span>
      </div>
      <div className="stationHome_right_detail_name">
        <FontAwesomeIcon
          icon={faRightToBracket}
          className="stationHome_right_detail_name_icon"
        />
        <span>{data[title].soKm} Km</span>
      </div>

      <ul className="stationHome_right_detail_wrap">
        {data[title].mota.map((item, index) => (
          <li key={index} className="stationHome_right_detail_text">
            - {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailJourney;
