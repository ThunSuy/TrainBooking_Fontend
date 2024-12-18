import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FindTours from "../../components/FindTicket/FindTours/FindTours";
import ResultTrip from "../../components/FindTicket/ResultTrip/ResultTrip";
import ProgressBuy from "../../components/FindTicket/ProgressBuy/ProgressBuy";
import "./FindTicket.scss";

const FindTicket = () => {
  const location = useLocation();

  return (
    <div className="findTicket">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="*" element={<FindTours />} />
            <Route path="ketqua" element={<ResultTrip />} />
            <Route path="thanhtoan/giove/" element={<ProgressBuy />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default FindTicket;
