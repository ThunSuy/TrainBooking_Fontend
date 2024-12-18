import React from "react";
import "./HomeLogIn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeLogIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const handleLoginSuccess = async (response) => {
    try {
      const token = response.credential;

      // Gửi token lên backend để xác thực và xử lý người dùng
      const res = await axios.post(
        "http://localhost:8081/api/auth/login-google",
        {
          token,
        }
      );

      if (res.data) {
        localStorage.setItem(
          "bookerData",
          JSON.stringify({
            cccd: res.data.result.cccd,
            email: res.data.result.email,
            fullName: res.data.result.fullName,
            phone: res.data.result.phone,
            id: res.data.result.id,
          })
        );
        if (
          res.data.result.cccd === "123456789123" &&
          res.data.result.phone === "1234567890"
        ) {
          navigate("/thongtinnguoidung");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="homeLogIn">
      <div className="homeLogIn_wrap">
        <div className="homeLogIn_wrap_title">Đăng nhập</div>
        <div className="homeLogIn_item1">
          <FontAwesomeIcon icon={faFacebook} className="homeLogIn_item_icon" />
          <p className="homeLogIn_item_text">Đăng nhập với Facebook</p>
        </div>
        <div className="homeLogIn_item2">
          {/* <FontAwesomeIcon icon={faGoogle} className="homeLogIn_item_icon" />
          <span className="homeLogIn_item_text">Đăng nhập với Google</span> */}
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            // onFailure={handleLoginFailure}
            scope="email profile" // Yêu cầu quyền email và profile
          />
        </div>

        <div className="homeLogIn_item3">
          <FontAwesomeIcon icon={faGithub} className="homeLogIn_item_icon" />
          <p className="homeLogIn_item_text">Đăng nhập với Github</p>
        </div>
      </div>
    </div>
  );
};

export default HomeLogIn;
