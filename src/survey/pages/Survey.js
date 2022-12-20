import React from "react";
import Button from "../../shared/components/FormElements/Button";
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
      id: "s2",
      title: "2022 NewCastle 모집자 설문조사",
      author: "지현",
    },
  ];

  return (
    <React.Fragment>
      <SurveyList items={DUMMYSV} />
      <div className="center">
        <Button to="/post/new">새 글쓰기</Button>
      </div>
    </React.Fragment>
  );
};

export default Survey;
