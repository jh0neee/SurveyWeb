import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import "../styles/Survey.css";

const SurveyItem = (props) => {
  return (
    <tr className="table-row">
      <td className="title">
        <Link to={`/${props.id}/content`}>{props.title}</Link>
      </td>
      <td>{props.author.name}</td>
      <td>{dayjs(props.createDate).format("YYYY-MM-DD")}</td>
    </tr>
  );
};

export default SurveyItem;
