import React, { useState, useRef } from "react";

import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import Check from "../components/Check";

import "../styles/Register.css";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [array, setArray] = useState([]); // 질문 value
  const [checkbox, setCheckBox] = useState([]); // 체크박스 옵션
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
      // 추가로 checkbox에 배열을 넣는다
      setArray([...array, checkQuestion]);
      shortAnswerTypeId.current += 1;
    } else if (selectedOpt === "") {
      setArray([...array]);
    } else {
      setArray([...array, singleQuestion]);
      subjectiveTypeId.current += 1;
    }
  };

  const onChangeInput = (e, index) => {
    if (array !== undefined) {
      // 질문 배열이 비어있지 않다면
      let new_input = [...array]; // 배열 안에 있는 질문 객체 복사
      new_input[index].question = e.target.value;
      setArray(new_input);
    }
  };

  const surveySubmitHandler = (e) => {
    e.preventDefault();

    console.log(array);
    console.log(checkbox);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="dropbox">
          <Dropdown selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt} />
          <Button onClick={addListHandler}>+</Button>
        </div>
        <form onSubmit={surveySubmitHandler}>
          <div className="postttt">
            {array.map((item, index) => (
              <div key={item.id} className="tableeee">
                <Card className="cardddd">
                  <div className="delete">
                    <span
                      onClick={() => {
                        setArray(array.filter((card) => card.id !== item.id));
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
                        checkbox={checkbox}
                        setCheckBox={setCheckBox}
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
