import React from "react";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SelectTicket from "../../components/RefundTicket/SelectTicket/SelectTicket";
import Confirm from "../../components/RefundTicket/Confirm/Confirm";
import Refund from "../../components/RefundTicket/Refund/Refund";
import Complete from "../../components/RefundTicket/Complete/Complete";

const RefundTicket = () => {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("step"));
  const [step, setStep] = useState(id);
  const navigate = useNavigate();

  const handleGoNext = () => {
    navigate(`/trave?step=${step + 1}`);
  };

  return (
    <div className="refundTicket">
      {step === 1 && (
        <SelectTicket activeStep={step - 1} handleGoNext={handleGoNext} />
      )}
      {step === 2 && (
        <Confirm activeStep={step - 1} handleComfirm={handleGoNext} />
      )}
      {step === 3 && (
        <Refund activeStep={step - 1} handleRefund={handleGoNext} />
      )}
      {step === 4 && <Complete activeStep={step - 1} />}
    </div>
  );
};

export default RefundTicket;
