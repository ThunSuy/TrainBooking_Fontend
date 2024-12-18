import React from "react";
import "./FormLookUp.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLookUp = ({ title, checkStar, onClick }) => {
  const navigate = useNavigate();

  const [erorrMaDatCho, setErorrMaDatCho] = useState();
  const [erorEmail, setErorrEmail] = useState();
  const [erorrSdt, setErorrSdt] = useState();

  const [maDatCho, setMaDatCho] = useState("");
  const [email, setEmail] = useState("");
  const [sodt, setSodt] = useState("");

  // const handleClick = (event) => {
  //   event.preventDefault();

  //   navigate("/quenmadatcho");
  // };

  const onChangeMaDatCho = (event) => {
    const value = event.target.value;
    setMaDatCho(value);
  };

  const onChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const onChangeSodt = (event) => {
    const value = event.target.value;
    setSodt(value);
  };

  const handleBtn = () => {
    let isValid = true;

    // Kiểm tra mã đặt chỗ
    if (!maDatCho || maDatCho.trim() === "") {
      setErorrMaDatCho("Mã đặt chỗ không được để trống");
      isValid = false;
    } else if (!maDatCho || maDatCho.trim().length < 6) {
      setErorrMaDatCho("Mã đặt chỗ không hợp lệ");
      isValid = false;
    } else {
      setErorrMaDatCho("");
    }

    if (!email || email.trim() === "") {
      setErorrEmail("Email không được để trống");
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@gmail\.com$/.test(email)) {
      setErorrEmail("Email không hợp lệ");
      isValid = false;
    } else {
      setErorrEmail("");
    }

    if (!sodt || sodt.trim() === "") {
      setErorrSdt("Số điện thoại không được để trống");
      isValid = false;
    } else if (sodt.length !== 10) {
      setErorrSdt("Số điện thoại không hợp lệ (10 số)");
      isValid = false;
    } else {
      setErorrSdt("");
    }

    if (isValid) {
      onClick(maDatCho, email, sodt);
    }
  };

  return (
    <div className="formLookUp">
      <div className="formLookUp_title">{title}</div>
      <div className="formLookUp_wrap">
        <form className="formLookUp_form">
          <div className="form_container">
            <div className="form_container_text">
              Mã đặt chỗ{checkStar && <span>*</span>}
            </div>
            <input
              type="text"
              placeholder="Mã đặt chỗ"
              value={maDatCho}
              onChange={onChangeMaDatCho}
            />
            <div className="form_container_erorr">{erorrMaDatCho}</div>
          </div>
          <div className="form_container">
            <div className="form_container_text">
              Email{checkStar && <span>*</span>}
            </div>
            <input
              type="text"
              placeholder="Địa chỉ email khi đặt vé"
              value={email}
              onChange={onChangeEmail}
            />
            <div className="form_container_erorr">{erorEmail}</div>
          </div>
          <div className="form_container">
            <div className="form_container_text">
              Số điện thoại{checkStar && <span>*</span>}
            </div>
            <input
              type="text"
              placeholder="Số điện thoại khi đặt vé"
              value={sodt}
              onChange={onChangeSodt}
            />
            <div className="form_container_erorr">{erorrSdt}</div>
          </div>
          <div className="form_container">
            <div className="form_container_text"></div>
            <div className="formLookUp_button">
              <div onClick={handleBtn} className="formLookUp_btn">
                Tra cứu
              </div>
              {/* <a className="formLookUp_forgot" onClick={handleClick}>
                Quên mã đặt chỗ?
              </a> */}
            </div>
            <div className="form_container_erorr"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLookUp;
