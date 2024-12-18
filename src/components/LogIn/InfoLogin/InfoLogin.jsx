import React, { useState } from "react";
import { useEffect } from "react";
import "./InfoLogin.scss";
import axios from "axios";

const InfoLogin = () => {
  const [bookerData, setBookerData] = useState(
    JSON.parse(localStorage.getItem("bookerData"))
  );

  const [theFirst, setTheFirst] = useState(false);
  const [checkSave, setCheckSave] = useState(false);

  useEffect(() => {
    if (
      bookerData.cccd === "123456789123" &&
      bookerData.phone === "1234567890"
    ) {
      setTheFirst(true);
      setCheckSave(true);
    } else {
      setTheFirst(false);
      setCheckSave(false);
    }
  }, []);

  const [fullName, setFullName] = useState(bookerData.fullName);
  const [cccd, setCccd] = useState(
    bookerData.cccd === "123456789123" ? "" : bookerData.cccd
  );
  const [phone, setPhone] = useState(
    bookerData.phone === "1234567890" ? "" : bookerData.phone
  );
  const [email, setEmail] = useState(bookerData.email);

  // States for error messages
  const [fullNameError, setFullNameError] = useState("");
  const [cccdError, setCccdError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const updateBooker = async (id, bookerUpdate) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/booker/${id}`,
        bookerUpdate,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error.response?.data || error.message);
    }
  };

  const handleSave = () => {
    // Validate dữ liệu trước khi lưu
    let isValid = true;

    // Reset lỗi
    setFullNameError("");
    setCccdError("");
    setPhoneError("");

    if (fullName.trim() === "") {
      setFullNameError("Họ và tên không được để trống.");
      isValid = false;
    }
    if (cccd.trim() === "") {
      setCccdError("CCCD/Hộ chiếu không được để trống.");
      isValid = false;
    } else if (!/^\d{12}$/.test(cccd)) {
      setCccdError("CCCD/Hộ chiếu phải có 12 chữ số.");
      isValid = false;
    }
    if (phone.trim() === "") {
      setPhoneError("Số điện thoại không được để trống.");
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      setPhoneError("Số điện thoại phải có đúng 10 chữ số.");
      isValid = false;
    }

    if (isValid) {
      const confirmSave = window.confirm(
        "Bạn có muốn thay đổi thông tin người dùng không?"
      );

      if (confirmSave) {
        if (cccd === "123456789123" && phone === "1234567890") {
          alert(
            "Vui lòng thay đổi thông tin của Số điện thoại hoặc Số CCCD/Hộ chiếu"
          );
        } else {
          const bookerUpdate = {
            fullName: fullName,
            phone: phone,
            cccd: cccd,
          };

          updateBooker(bookerData.id, bookerUpdate);

          const data = { fullName, cccd, phone, email, id: bookerData.id };
          localStorage.setItem("bookerData", JSON.stringify(data));
          setBookerData(data);
          setCheckSave(false);

          alert("Cập nhật thành công!");
          window.location.reload(); // Reload lại trang
        }
      }
    }
  };

  const handleUpdate = () => {
    setCheckSave(true);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    <div className="infoLogin">
      <div className="infoLogin_wrap">
        <div className="infoLogin_wrap_title">Thông tin người dùng</div>
        {checkSave && (
          <div className="infoLogin_wrap_noti">
            <p>
              Vui lòng điền đầy đủ và chính xác tất cả các thông tin cá nhân cần
              thiết, bao gồm họ tên, email, số điện thoại, và số CCCD/Hộ chiếu.
            </p>
            <p>
              Việc cung cấp thông tin chính xác không chỉ giúp đảm bảo quyền lợi
              của bạn mà còn tránh các rủi ro như mua phải vé giả, vé không đúng
              quy định, hoặc gặp khó khăn trong quá trình xác nhận thông tin khi
              sử dụng dịch vụ.
            </p>
          </div>
        )}

        {theFirst && (
          <div className="infoLogin_wrap_noti1">
            <p>
              Chào mừng bạn đã đăng nhập! Để đảm bảo quyền lợi và trải nghiệm
              tốt nhất, vui lòng cập nhật đầy đủ thông tin cá nhân ngay lần đầu
              sử dụng.
            </p>
          </div>
        )}
        <div className="infoLogin_wrap_content">
          <div className="infoLogin_wrap_content_item">
            <span>Họ và tên</span>
            <input
              type="text"
              placeholder="Nhập chính xác họ và tên"
              disabled={!checkSave}
              className={!checkSave ? "not_allowed" : ""}
              value={fullName}
              onChange={handleInputChange(setFullName)}
            />
            <p>{fullNameError}</p>
          </div>
          <div className="infoLogin_wrap_content_item">
            <span>Email</span>
            <input
              type="text"
              placeholder="Nhập chính xác email"
              disabled
              className="not_allowed"
              value={email}
            />
            <p></p>
          </div>
          <div className="infoLogin_wrap_content_item">
            <span>Số điện thoại</span>
            <input
              type="text"
              placeholder="Nhập chính xác số điện thoại"
              disabled={!checkSave}
              className={!checkSave ? "not_allowed" : ""}
              value={phone}
              onChange={handleInputChange(setPhone)}
            />
            <p>{phoneError}</p>
          </div>
          <div className="infoLogin_wrap_content_item">
            <span>Số CCCD/Hộ chiếu</span>
            <input
              type="text"
              placeholder="Nhập chính xác số CCCD/Hộ chiếu"
              disabled={!checkSave}
              className={!checkSave ? "not_allowed" : ""}
              value={cccd}
              onChange={handleInputChange(setCccd)}
            />
            <p>{cccdError}</p>
          </div>
        </div>
        <div className="infoLogin_wrap_button">
          {checkSave && (
            <span className="infoLogin_wrap_button-btn1" onClick={handleSave}>
              Lưu thông tin
            </span>
          )}
          {!checkSave && (
            <span className="infoLogin_wrap_button-btn2" onClick={handleUpdate}>
              Cập nhật
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoLogin;
