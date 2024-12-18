import React from "react";
import "./MainHome.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import bgr1 from "../../assets/img/bgr1.webp";
import bgr2 from "../../assets/img/bgr2.jpg";
import bgr3 from "../../assets/img/bgr3.webp";
import bgr4 from "../../assets/img/bgr4.jpg";
import bgr5 from "../../assets/img/bgr5.webp";
import bgr6 from "../../assets/img/bgr6.jpg";
import bgr8 from "../../assets/img/bgr8.jpg";
import bgr9 from "../../assets/img/bgr9.jpg";
import bgr10 from "../../assets/img/bgr10.jpg";
import bgr12 from "../../assets/img/bgr12.jpeg";
import bgr13 from "../../assets/img/bgr13.jpeg";
import bgr14 from "../../assets/img/bgr14.jpeg";
import DetailStation from "./DetailStation/DetailStation";
import DetailJourney from "./DetailJourney/DetailJourney";

const MainHome = () => {
  const navigate = useNavigate();

  const [selectedSegment, setSelectedSegment] = useState("Đoạn 1");
  const [station, setStation] = useState("Ga Hà Nội");
  const [currentImage, setCurrentImage] = useState(0);

  const images = [bgr2, bgr1, bgr9, bgr10, bgr14];

  const stationNames = [
    "Ga Hà Nội",
    "Ga Quảng Ngãi",
    "Ga Huế",
    "Ga Nha Trang",
    "Ga Sài Gòn",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    loadStations();

    return () => clearInterval(intervalId);
  }, []);

  const loadStations = async () => {
    const result = await axios.get("http://localhost:8081/train-trip", {
      validateStatus: () => {
        return true;
      },
    });

    if (result.data.code === 1000) {
      localStorage.setItem("stations", JSON.stringify(result.data.result));
    }
  };

  const handleStation = (station) => {
    setStation(station);
  };

  const handleSegmentClick = (segment) => {
    setSelectedSegment(segment);
  };

  const loadFindOneWay = async (idGaDi, idGaDen, date) => {
    const result = await axios.get(
      `http://localhost:8081/train-trip/search-train-trips?departureStationId=${idGaDi}&arrivalStationId=${idGaDen}&arrivalDate=${date}`,
      {
        validateStatus: () => {
          return true;
        },
      }
    );

    if (result.data.code === 1000) {
      return result.data.result;
    }
  };

  const handleTrain = async (idGaDi, idGaDen, date) => {
    const dataFindOneWay = await loadFindOneWay(idGaDi, idGaDen, date);
    localStorage.setItem("dataFindOneWay", JSON.stringify(dataFindOneWay));
    localStorage.setItem("dataFindRound", JSON.stringify([]));
    navigate("/timve/ketqua");
  };

  return (
    <div className="mainHome">
      <div className="headerHome">
        <div className="headerHome_wrap">
          <img src={images[currentImage]} alt="erorr" />
          <div className="headerHome_wrap_fixed">
            <div className="headerHome_wrap_fixed-text1">Tổng công ty</div>
            <div className="headerHome_wrap_fixed-text2">
              Đường sắt Việt Nam
            </div>
          </div>
        </div>
        <div className="tripHome">
          <div className="tripHome_wrapper">
            <div className="tripHome_wrap">
              <div
                className="tripHome_wrap_item"
                onClick={() => handleTrain(12, 1, "2024-12-18")}
              >
                <img src={bgr13} />
                <div className="tripHome_wrap_item-name">Hà Nội - Sài Gòn</div>
                <div className="tripHome_wrap_item-price">
                  1,000,000 ~ 1,600,000
                </div>
              </div>
              <div
                className="tripHome_wrap_item"
                onClick={() => handleTrain(12, 6, "2024-12-18")}
              >
                <img src={bgr4} />
                <div className="tripHome_wrap_item-name">Hà Nội - Đà Nẵng</div>
                <div className="tripHome_wrap_item-price">
                  600,000 ~ 950,000
                </div>
              </div>
              <div
                className="tripHome_wrap_item"
                onClick={() => handleTrain(1, 7, "2024-12-26")}
              >
                <img src={bgr3} />
                <div className="tripHome_wrap_item-name">Sài Gòn - Huế</div>
                <div className="tripHome_wrap_item-price">
                  700,000 ~ 1,150,000
                </div>
              </div>
              <div
                className="tripHome_wrap_item"
                onClick={() => handleTrain(6, 5, "2024-12-19")}
              >
                <img src={bgr12} />
                <div className="tripHome_wrap_item-name">
                  Đà Nẵng - Quãng Ngãi
                </div>
                <div className="tripHome_wrap_item-price">
                  300,000 ~ 450,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stationHome">
        <div className="stationHome_con">
          <div className="stationHome_left">
            <div className="stationHome_title">
              Hệ thống ga nổi bật trên tuyến đường sắt Việt Nam
            </div>
            <div className="stationHome_left_wrap">
              <ul className="stationHome_left_wrap_list">
                {stationNames.map((station1, index) => {
                  return (
                    <li
                      key={index}
                      className={`stationHome_left_wrap_item ${
                        station === station1 ? "active" : ""
                      }`}
                      onClick={() => handleStation(station1)}
                    >
                      {station1}
                    </li>
                  );
                })}
              </ul>
              <DetailStation station={station} />
            </div>
          </div>
          <div className="stationHome_right">
            <div className="stationHome_title">
              Toàn tuyến đường sắt tốc độ cao Bắc Nam
            </div>
            <ul className="stationHome_right_list">
              {["Đoạn 1", "Đoạn 2", "Đoạn 3", "Đoạn 4"].map((segment) => (
                <li
                  key={segment}
                  className={`stationHome_right_item ${
                    selectedSegment === segment ? "active1" : ""
                  }`}
                  onClick={() => handleSegmentClick(segment)}
                >
                  {segment}
                </li>
              ))}
            </ul>
            <DetailJourney title={selectedSegment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
