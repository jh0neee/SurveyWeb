import React, { useState, useRef } from "react";

import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElement/Card";
import Check from "../components/Check";

import "../styles/Register.css";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const [array, setArray] = useState([]); // 질문 value
  const surveyId = useRef(0); // 질문 객체 Id. 추후 변경

  const singleQuestion = {
    // 객관식 주관형 질문 객체
    id: surveyId.current,
    selectedOpt,
    question: "",
  };

  const checkQuestion = {
    // 체크박스 질문 객체
    id: surveyId.current,
    selectedOpt,
    question: "",
  };

  // checkedList 배열에 옵션추가 누르면 배열에 객체 추가되게

  const onChangeInput = (e, index) => {
    if (array !== undefined) {
      // 질문 배열이 비어있지 않다면
      let new_input = [...array]; // 배열 안에 있는 질문 객체 복사
      new_input[index].question = e.target.value;
      setArray(new_input);
    }
  };

  const addListHandler = () => {
    if (selectedOpt === "체크박스") {
      setArray([...array, checkQuestion]);
      surveyId.current += 1;
      // 추가로 checkbox에 객체를 넣는다
    } else if (selectedOpt === "") {
      setArray([...array]);
    } else {
      setArray([...array, singleQuestion]);
      surveyId.current += 1;
    }
  };

  const surveySubmitHandler = (e) => {
    e.preventDefault();
    console.log(array);
    // submit 버튼 누르면 배열에 작은 input카드들이 등록되는..?
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
                        setArray(
                          array.filter((card) => card.id !== item.id)
                        );
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
                      <Check />
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
