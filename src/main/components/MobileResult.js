import React from "react";
import { useNavigate } from "react-router-dom";

import SurveyResult from "./SurveyResult";
import "../styles/Mobile.css";

const MobileResult = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className='result-title'>
        <span onClick={navigate(-1)}>＜</span>결과
      </h2>
      <SurveyResult />
    </>
  );
};

export default MobileResult;
