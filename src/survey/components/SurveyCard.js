import React from "react";
import { useDispatch } from "react-redux";

import { surveyAction } from "../../store/survey";
import Card from "../../shared/components/UIElement/Card";
import Check from "./Check";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

const SurveyCard = (props) => {
  const { id, selectOption, inputHandler } = props;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(surveyAction.DELETE_SURVEY(id));
  };

  return (
    <Card className="input-card">
      <div className="delete-btn">
        <span onClick={() => deleteHandler(id)}>⛔</span>
      </div>
      {selectOption === "체크박스" ? (
        <>
          <Input
            id="question"
            element="input"
            label="Q."
            validators={[VALIDATOR_REQUIRE()]}
            errorText="설문 내용을 입력해주세요."
            onInput={inputHandler}
          />
          <Check checkQuestionId={id} />
        </>
      ) : selectOption === "단답형" || selectOption === "장문형" ? (
        <>
          <Input
            id="question"
            element="input"
            label="Q."
            validators={[VALIDATOR_REQUIRE()]}
            errorText="설문 내용을 입력해주세요."
            onInput={inputHandler}
          />
        </>
      ) : null}
    </Card>
  );
};

export default SurveyCard;
