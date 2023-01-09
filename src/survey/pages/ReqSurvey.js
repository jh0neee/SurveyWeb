import React from 'react';
import Button from "../../shared/components/FormElements/Button";
import SurveyList from "../components/SurveyList";

const ReqSurvey = () => {
    const REQSV = [
        // 더미데이터
        {
          id: "s3",
          title: "비밀글1",
          author: "작성자",
        },
        {
          id: "s4",
          title: "비밀글2",
          author: "글쓴이",
        },
      ];

      return (
        <React.Fragment>
          <SurveyList items={REQSV} />
          <div className="center">
            <Button to="/post/new">새 글쓰기</Button>
          </div>
        </React.Fragment>
      );
};

export default ReqSurvey;