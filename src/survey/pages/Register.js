import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import Check from "../components/Check";
import { surveyAction } from "../../store/survey";

import "../styles/Register.css";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [checkOpt, setCheckOpt] = useState([]); // 체크박스 옵션

  const dispatch = useDispatch();
  const surveyquestion = useSelector((state) => state.survey.questionItem);

  const onChangeInput = () => {};

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

  const deleteHandler = (id) => {
    dispatch(surveyAction.DELETE_SURVEY(id));
  };

  const surveySubmitHandler = (e) => {
    e.preventDefault();
    console.log(surveyquestion);
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
            {surveyquestion.map((item) => (
              <div
                key={`survey-question-${item.id}`}
                className="mid_survey-form"
              >
                <Card className="input-card">
                  <div className="delete-btn">
                    <span onClick={() => deleteHandler(item.id)}>⛔</span>
                  </div>
                  <div className="select-option">{item.selectOption}</div>
                  {item.selectOption === "체크박스" ? (
                    <div>
                      <input
                        placeholder="check"
                        value={item.question}
                        onChange={() => onChangeInput()}
                      />
                      <Check
                        checkQuestionId={item.id}
                        checkOpt={checkOpt}
                        setCheckOpt={setCheckOpt}
                      />
                    </div>
                  ) : item.selectOption === "객관식" ||
                    item.selectOption === "주관식" ? (
                    <input
                      placeholder="single"
                      value={item.question}
                      onChange={() => onChangeInput()}
                    />
                  ) : null}
                </Card>
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
