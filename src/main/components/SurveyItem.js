import React from "react";
import { Link } from "react-router-dom";

import "../styles/Survey.css";

const SurveyItem = (props) => {
  return (
    <tr className="table-row">
      <td className="title">
        <Link to={`/${props.id}/content`}>{props.title}</Link>
      </td>
      <td>{props.author}</td>
      <td>{props.createDate}</td>
    </tr>
  );
};

export default SurveyItem;
