import React from "react";
import { useParams } from "react-router-dom";

import SurveyResult from "./SurveyResult";
import Button from "../../shared/components/FormElements/Button";
import "../styles/Mobile.css";

const MobileResult = () => {
  const postId = useParams.postId();
  return (
    <>
      <h2 className='result-title'>
        <Button to={`/${postId}/content`}>＜</Button>결과
      </h2>
      <SurveyResult />
    </>
  );
};

export default MobileResult;
