import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElement/Card";
import "../styles/SurveyItem.css";

const SurveyItem = (props) => {
  return (
    <li className="survey-item">
      <Card className="survey-item__content">
        <Link to={`/${props.id}/content`}>
          <div className="survey-item__title">
            <h2>{props.title}</h2>
          </div>
          <div className="survey-item__author">
            <h6>{props.author}</h6>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default SurveyItem;
