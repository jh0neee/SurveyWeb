import React, { useState, useRef } from "react";

import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import Check from "../components/Check";

import "../styles/Register.css";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [questionItem, setQusetionItem] = useState([]); // 질문 value
  const [checkOpt, setCheckOpt] = useState([]); // 체크박스 옵션
  const shortAnswerTypeId = useRef(0); // 단답형 질문 객체 Id
  const subjectiveTypeId = useRef(0); // 주관형 질문 객체 Id

  const singleQuestion = {
    // 객관식 주관형 질문 객체
    id: "s" + subjectiveTypeId.current,
    selectedOpt,
    question: "",
  };

  const checkQuestion = {
    // 체크박스 질문 객체
    id: "c" + shortAnswerTypeId.current,
    selectedOpt,
    question: "",
    option: [],
  };

  const addListHandler = () => {
    if (selectedOpt === "체크박스") {
      setQusetionItem([...questionItem, checkQuestion]);
      shortAnswerTypeId.current += 1;
    } else if (selectedOpt === "") {
      setQusetionItem([...questionItem]);
    } else {
      setQusetionItem([...questionItem, singleQuestion]);
      subjectiveTypeId.current += 1;
    }
  };

  const onChangeInput = (e, index) => {
    if (questionItem !== undefined) {
      // 질문 배열이 비어있지 않다면
      let copiedQusetionInput = [...questionItem]; // 배열 안에 있는 질문 객체 복사
      copiedQusetionInput[index].question = e.target.value;
      setQusetionItem(copiedQusetionInput);
    }
  };
  
  const surveySubmitHandler = (e) => {
    e.preventDefault();
    
    // checkOpt option 배열을 checkQuestion 객체에 추가
    checkOpt.map(elem => {
      // checkOpt id와 동일한 id의 questionItem 객체 index를 찾는다.
      let findIndex = questionItem.findIndex(item => item.id === elem.id);
      // 기존 배열 복사
      let copiedItems = [...questionItem];
      // 복사한 배열에 수정할 값 할당
      copiedItems[findIndex].option = elem[elem.id];
      // 수정된 배열 업데이트
      setQusetionItem(copiedItems);
    })

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
              <div key={`survey-question-${item.id}`} className="mid_survey-form">
                <Card className="input-card">
                  <div className="delete-btn">
                    <span
                      onClick={() => {
                        setQusetionItem(questionItem.filter((card) => card.id !== item.id));
                      }}
                    >
                      ⛔
                    </span>
                  </div>
                  <div className="select-option">{item.selectedOpt}</div>
                  {item.selectedOpt === "체크박스" ? (
                    <div>
                      <input
                        value={item.question}
                        onChange={(e) => onChangeInput(e, index)}
                      />
                      <Check
                        checkQuestionId={item.id}
                        checkOpt={checkOpt}
                        setCheckOpt={setCheckOpt}
                      />
                    </div>
                  ) : (
                    <input
                      value={item.question}
                      onChange={(e) => onChangeInput(e, index)}
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
