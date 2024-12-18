import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const bookerData = JSON.parse(localStorage.getItem("bookerData")) || null;
  const [fullName, setFullName] = useState(
    bookerData && bookerData.fullName ? bookerData.fullName : ""
  );

  const [showLogin, setShowLogin] = useState();
  const [showForm, setShowForm] = useState(false);

  const topLoginWrapRef = useRef(null);
  const topLoginRef = useRef(null);

  useEffect(() => {
    setShowLogin(bookerData ? true : false);
    setFullName(bookerData && bookerData.fullName ? bookerData.fullName : "");
  }, [bookerData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        topLoginWrapRef.current &&
        !topLoginWrapRef.current.contains(event.target) &&
        !topLoginRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleShowForm = (event) => {
    event.stopPropagation();
    setShowForm(!showForm);
  };

  const handleFormThongTin = () => {
    navigate("/thongtinnguoidung");
  };

  const handleFormLichSu = () => {
    navigate("/lichsudatve");
  };

  const handleDangXuat = () => {
    localStorage.removeItem("bookerData");
    localStorage.removeItem("reservationCode");
    localStorage.removeItem("trainTickets");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("selectedSeats1");

    setShowLogin(false);
    navigate("/dangnhap");
  };

  return (
    <div className="header">
      <div className="header_wrapper">
        <img className="header_logo" src="/src/assets/img/logo1.png" />
        <div className="topnav">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            <FontAwesomeIcon icon={faHome} />
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/timve"
          >
            Tìm vé
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/thongtindatcho"
          >
            Thông tin đặt chỗ
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/kiemtrave"
          >
            Kiểm tra vé
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/cacga-hanhtrinh"
          >
            Các ga - hành trình
          </NavLink>
        </div>
        {!showLogin && (
          <div className="topnav ">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/dangnhap"
            >
              Đăng nhập
            </NavLink>
          </div>
        )}
        {showLogin && (
          <div className="top_login" onClick={handleShowForm} ref={topLoginRef}>
            <FontAwesomeIcon icon={faUser} className="top_login_icon" />
            <span>{fullName}</span>
            {showForm && (
              <div className="top_login_wrap" ref={topLoginWrapRef}>
                <div className="top_login_wrap_body">
                  <div
                    className="top_login_wrap_body_item"
                    onClick={handleFormThongTin}
                  >
                    Thông tin
                  </div>
                  <div
                    className="top_login_wrap_body_item"
                    onClick={handleFormLichSu}
                  >
                    Lịch sử đặt vé
                  </div>
                  <div
                    className="top_login_wrap_body_item"
                    onClick={handleDangXuat}
                  >
                    Đăng xuất
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
