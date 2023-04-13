import React from "react";
import { useDispatch } from "react-redux";

import { surveyAction } from "../../store/survey";
import Card from "../../shared/components/UIElement/Card";
import Check from "./Check";

const SurveyCard = (props) => {
  const { id, selectOption, question } = props;
  const dispatch = useDispatch();

  const onChangeInput = (e, id) => {
    dispatch(surveyAction.CHANGE_INPUT({ inputValue: e.target.value, id }));
  };

  const deleteHandler = (id) => {
    dispatch(surveyAction.DELETE_SURVEY(id));
  };

  return (
    <Card className="input-card">
      <div className="delete-btn">
        <span onClick={() => deleteHandler(id)}>⛔</span>
      </div>
      <div className="select-option">{selectOption}</div>
      {selectOption === "체크박스" ? (
        <div>
          <input
            placeholder="check"
            value={question}
            onChange={(e) => onChangeInput(e, id)}
          />
          <Check checkQuestionId={id} />
        </div>
      ) : selectOption === "객관식" || selectOption === "주관식" ? (
        <input
          placeholder="single"
          value={question}
          onChange={(e) => onChangeInput(e, id)}
        />
      ) : null}
    </Card>
  );
};

export default SurveyCard;
