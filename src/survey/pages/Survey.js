import React from "react";
import SurveyList from "../components/SurveyList";


const Survey = () => {
  const DUMMYSV = [
    // 더미데이터
    {
      id: "s1",
      title: "만족도 조사",
      author: "작성자",
    },
    {
        id:"s2",
        title: "2022 NewCastle 모집자 설문조사",
        author: "지현",
    },
  ];

  return <SurveyList items={DUMMYSV} />;
};

export default Survey;
