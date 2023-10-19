import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import SurveyResult from "../components/SurveyResult";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../styles/Mobile.css";

const MobileResult = () => {
  const postId = useParams().postId;
  const navigate = useNavigate();
  return (
    <>
      <div className='result-title'>
        <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
        <h2>결과</h2>
      </div>
      <SurveyResult postId={postId} />
    </>
  );
};

export default MobileResult;
