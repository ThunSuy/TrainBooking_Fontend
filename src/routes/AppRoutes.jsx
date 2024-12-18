import React from "react";
import "./AppRoutes.scss";
import { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "../pages/Home/Home";
import FindTicket from "../pages/FindTicket/FindTicket";
import RefundTicket from "../pages/RefundTicket/RefundTicket";
import CheckTicket from "../pages/CheckTicket/CheckTicket";
import ForgotBooking from "../pages/ForgotBooking/ForgotBooking";
import BookingInfo from "../pages/BookingInfor/BookingInfor";
import ListStation from "../pages/ListStation/ListStation";
import LogIn from "../pages/LogIn/LogIn";
import BuySuccessTicket from "../components/FindTicket/ProgressBuy/BuySuccessTicket/BuySuccessTicket";
import InfoLogin from "../components/LogIn/InfoLogin/InfoLogin";
import HistoryTicket from "../components/LogIn/HistoryTicket/HistoryTicket";

const AppRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/timve/*" element={<FindTicket />} />
          <Route path="/thongtindatcho" element={<BookingInfo />} />
          <Route path="/trave" element={<RefundTicket />} />
          <Route path="/kiemtrave" element={<CheckTicket />} />
          {/* <Route path="/quenmadatcho" element={<ForgotBooking />} /> */}
          <Route path="/cacga-hanhtrinh" element={<ListStation />} />
          <Route path="/dangnhap" element={<LogIn />} />
          <Route path="/thongtinnguoidung" element={<InfoLogin />} />
          <Route path="/lichsudatve" element={<HistoryTicket />} />
          <Route
            path="/vnpay-callback"
            element={<BuySuccessTicket activeStep={2} checkFail={false} />}
          />
          <Route
            path="/payment-success"
            element={<BuySuccessTicket activeStep={3} checkFail={false} />}
          />
          <Route
            path="/payment-failed"
            element={<BuySuccessTicket activeStep={2} checkFail={true} />}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AppRoutes;
