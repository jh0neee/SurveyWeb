import React, { useState } from "react";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";

import "../styles/SurveyForm.css";

const SurveyFormList = (props) => {
  const [checkedList, setCheckedList] = useState([]); // 체크박스 상태관리 위한 배열
  const [surveyInfo, setSurveyInfo] = useState();

  // input 값을 id인 key의 value 값으로 넘겨준다. key 값은 props객체의 id 값으로.
  // 새로운 객체 key-value를 만들 수 있다.
  const handleInputValue = (key, e) => {
    setSurveyInfo({ ...surveyInfo, [key]: e.target.value });
  };

  const onCheckedItem = (checked, value) => {
    if (checked) {
      setCheckedList((prev) => [...prev, value]);
    } else {
      // 클릭이 취소된 경우 filter로 배열에서 걸러낸다.
      setCheckedList(checkedList.filter((val) => val !== value));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(surveyInfo);
    console.log(checkedList);
  };

  return (
    <form onSubmit={onSubmit}>
      {props.items.map((survey) => (
        <Card className="survey_card" key={survey.id}>
          <div className="survey">
            <div>
              {survey.selectedOpt === "체크박스" ? (
                <div>
                  <b>Q. {survey.question}</b>
                  <div className="check-box">
                    {survey.option.map((list) => (
                      <div key={list.id} className="check-options">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedItem(
                              `${survey.id}`,
                              e.target.checked,
                              list.value
                            )
                          } // onCheckedItem 함수에 체크된 값과 그 옵션을 전달
                          checked={
                            checkedList.includes(list.value) ? true : false
                          } // checkedList에 옵션이 포함되어 있으면 check
                        />
                        <label htmlFor="list.id">{list.value}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <b> Q. {survey.question}</b>
                  <input
                    className="text-input"
                    type="text"
                    onChange={(e) => handleInputValue(`${survey.id}`, e)}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
      <div className="center survey_button">
        <Button type="submit">제출하기</Button>
      </div>
    </form>
  );
};

export default SurveyFormList;
