import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { surveyAction } from "../../store/survey";
import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import SurveyCard from "../components/SurveyCard";

import "../styles/Register.css";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const dispatch = useDispatch();
  const surveyQuestion = useSelector((state) => state.survey.questionItem);

  const addListHandler = () => {
    if (selectedOpt === "") return;
    else if (selectedOpt === "체크박스") {
      dispatch(
        surveyAction.CREATE_SURVEY({
          id: "c" + Date.now(),
          selectOption: selectedOpt,
          question: "",
          option: [],
        })
      );
    } else {
      dispatch(
        surveyAction.CREATE_SURVEY({
          id: "s" + Date.now(),
          selectOption: selectedOpt,
          question: "",
        })
      );
    }
  };

  const surveySubmitHandler = (e) => {
    e.preventDefault();

    console.log(surveyQuestion);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="dropbox">
          <Dropdown selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt} />
          <Button onClick={addListHandler}>+</Button>
        </div>
        <form onSubmit={surveySubmitHandler}>
          <div className="survey-form">
            {surveyQuestion.map((item) => (
              <div
                key={`survey-question-${item.id}`}
                className="mid_survey-form"
              >
                <SurveyCard id={item.id} selectOption={item.selectOption} />
              </div>
            ))}
          </div>
          <div className="center button-padding">
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
