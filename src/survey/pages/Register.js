import React, { useState, useRef, useReducer, useCallback } from "react";

import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import Check from "../components/Check";

import "../styles/Register.css";

const initialState = {
  inputs: {
    id: "",
    selectOption: "",
    question: "",
    option: [],
  },
  questionItem: [
    {
      id: "s0",
      selectedOpt: "객관식",
      question: "안녕하세요",
    },
  ],
};
const surveyReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        questionItem: state.questionItem.map((item) =>
          item.id === action.payload ? { ...item, question: action.val } : item
        ),
      };
    case "CREATE_SURVEY":
      return {
        inputs: initialState.inputs,
        questionItem: state.questionItem.concat(action.questionItem),
      };
    case "DELETE_SURVEY":
      return {
        ...state,
        questionItem: state.questionItem.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [state, dispatch] = useReducer(surveyReducer, initialState);
  const [checkOpt, setCheckOpt] = useState([]); // 체크박스 옵션
  const shortAnswerTypeId = useRef(1); // 단답형 질문 객체 Id
  const subjectiveTypeId = useRef(1); // 주관형 질문 객체 Id

  const { questionItem } = state;
  const { question, option } = state.inputs;

  const onChangeInput = useCallback((e, id) => {
    dispatch({
      type: "CHANGE_INPUT",
      val: e.target.value,
      payload: id,
    });
  }, []);

  const addListHandler = useCallback(() => {
    if (selectedOpt !== "체크박스") {
      dispatch({
        type: "CREATE_SURVEY",
        questionItem: {
          id: "s" + shortAnswerTypeId.current,
          selectOption: selectedOpt,
          question,
        },
      });
      shortAnswerTypeId.current += 1;
    } else if (selectedOpt === "체크박스") {
      dispatch({
        type: "CREATE_SURVEY",
        questionItem: {
          id: "c" + subjectiveTypeId.current,
          selectOption: selectedOpt,
          question,
          option,
        },
      });
      subjectiveTypeId.current += 1;
    } else {
      return;
    }
  }, [selectedOpt, question]);

  const surveySubmitHandler = (e) => {
    e.preventDefault();

    // checkOpt option 배열을 checkQuestion 객체에 추가
    // checkOpt.forEach((elem) => {
    //   // checkOpt id와 동일한 id의 questionItem 객체 index를 찾는다.
    //   let findIndex = questionItem.findIndex((item) => item.id === elem.id);
    //   // 기존 배열 복사
    //   let copiedItems = [...questionItem];
    //   // 복사한 배열에 수정할 값 할당
    //   copiedItems[findIndex].option = elem[elem.id];
    //   // 수정된 배열 업데이트
    //   setQusetionItem(copiedItems);
    // });

    console.log(questionItem);
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
            {questionItem.map((item, index) => (
              <div
                key={`survey-question-${item.id}`}
                className="mid_survey-form"
              >
                <Card className="input-card">
                  <div className="delete-btn">
                    <span
                      onClick={() => {
                        dispatch({
                          type: "DELETE_SURVEY",
                          payload: item.id,
                        });
                      }}
                    >
                      ⛔
                    </span>
                  </div>
                  <div className="select-option">{item.selectOption}</div>
                  {item.selectOption === "체크박스" ? (
                    <div>
                      <input
                        placeholder="check"
                        value={item.question}
                        onChange={(e) => onChangeInput(e, item.id)}
                      />
                      <Check
                        checkQuestionId={item.id}
                        checkOpt={checkOpt}
                        setCheckOpt={setCheckOpt}
                      />
                    </div>
                  ) : item.selectOption === "객관식" ? (
                    <input
                      placeholder="single"
                      value={item.question}
                      onChange={(e) => onChangeInput(e, item.id)}
                    />
                  ) : (
                    <input
                      placeholder="subject"
                      value={item.question}
                      onChange={(e) => onChangeInput(e, item.id)}
                    />
                  )}
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
