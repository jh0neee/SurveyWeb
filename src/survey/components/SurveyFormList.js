import React, { useState } from "react";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";

import "../styles/SurveyForm.css";

const SurveyFormList = (props) => {
  const [checkedList, setCheckedList] = useState([]); // 체크된 값 확인
  const [surveyAnswer, setSurveyAnswer] = useState({}); // 설문답변 저장

  const onCheckedItem = (key, checked, value) => {
    if (checked) {
      // 체크된 값 배열에 추가 ->  체크 
      setCheckedList([...checkedList, value]);

      if (key in surveyAnswer) {
        // 선택된 값의 key가 surveyAnswer 안에 있으면 배열에 value를 추가하고
        const new_Check = surveyAnswer[key].concat(value);
        surveyAnswer[key] = new_Check;
      } else {
        // 없으면 선택된 값의 key-value 배열을 만들어서 추가
        setSurveyAnswer({ ...surveyAnswer, [key]: [value] });
      }
    } else {
      // 체크된 값 배열에서 제거 -> 체크 해제
      setCheckedList(checkedList.filter((val) => val !== value));

      // 클릭이 취소된 경우 filter로 배열에서 걸러낸다.
      const del_Check = surveyAnswer[key].filter((elem) => elem !== value);
      surveyAnswer[key] = del_Check;
    }
  };

  const handleInputValue = (key, e) => {
    setSurveyAnswer({ ...surveyAnswer, [key]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(surveyAnswer);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {props.items.map((survey) => (
          <Card className="survey_card" key={`survey-answer-${survey.id}`}>
            <div className="survey">
              {survey.selectedOpt === "체크박스" ? (
                <>
                  <b>Q. {survey.question}</b>
                  <div className="check-box">
                    {survey.option.map((list) => (
                      <div key={`check-option-${list.id}`} className="check-options">
                        <input
                          id={survey.id}
                          type="checkbox"
                          onChange={(e) =>
                            onCheckedItem(
                              survey.id,
                              e.target.checked,
                              list.value
                            )
                          }
                          checked={
                            // checkedList에 옵션 value가 포함되어 있으면 check
                            checkedList.includes(list.value) ? true : false
                          }
                        />
                        <label htmlFor="list.id">{list.value}</label>
                      </div>
                    ))}
                  </div>
                </>
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
          </Card>
        ))}
        <div className="center survey_button">
          <Button type="submit">제출하기</Button>
        </div>
      </form>
    </>
  );
};

export default SurveyFormList;
