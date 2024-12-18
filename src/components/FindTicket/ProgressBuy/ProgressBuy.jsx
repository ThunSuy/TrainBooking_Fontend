import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfoTicket from "./InfoTicket/InfoTicket";
import ConfirmInfo from "./ConfirmInfo/ConfirmInfo";

const ProgressBuy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [currentStep, setCurrentStep] = useState(0);

  const [methodPay, setMethodPay] = useState("");
  const [total, setTotal] = useState(0);

  const goToNextStep = (method, total) => {
    setMethodPay(method);
    setTotal(total);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="progressBuy">
      {currentStep === 0 && (
        <InfoTicket goToNextStep={goToNextStep} methodPay={methodPay} />
      )}
      {currentStep === 1 && (
        <ConfirmInfo
          goToPreviousStep={goToPreviousStep}
          goToNextStep={goToNextStep}
          methodPay={methodPay}
          total={total}
        />
      )}
    </div>
  );
};

export default ProgressBuy;
