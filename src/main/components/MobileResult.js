import React from "react";
// import { useParams } from "react-router-dom";

import SurveyResult from "./SurveyResult";
// import Button from "../../shared/components/FormElements/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../styles/Mobile.css";

const MobileResult = () => {
  // const postId = useParams().postId;
  return (
    <>
      <div className='result-title'>
        <ArrowBackIosNewIcon />
        <h2>결과</h2>
      </div>
      <SurveyResult />
    </>
  );
};

export default MobileResult;
