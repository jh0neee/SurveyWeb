import React from "react";

import SurveyItem from "./SurveyItem";

import "./SurveyList.css";

const SurveyList = (props) => {
  return (
    <ul className="serveys-list">
      {props.items.map((survey) => (
        <SurveyItem
          key={survey.id}
          id={survey.id}
          title={survey.title}
          author={survey.author}
        />
      ))}
    </ul>
  );
};

export default SurveyList;
