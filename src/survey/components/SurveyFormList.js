/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../../shared/components/UIElement/Card";
import Button from "../../shared/components/FormElements/Button";

import "../styles/SurveyForm.css";
import { useNavigate } from "react-router-dom";

const SurveyFormList = ({ items, sendRequest, postId }) => {
  const { REACT_APP_URL } = process.env;
  const navigate = useNavigate();
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

    const questionLength = items.questions.length;
    let isEmpty;

    for (const key in surveyAnswer) {
      if (surveyAnswer[key].length === 0 || surveyAnswer[key] === "") {
        isEmpty = true;
      }
      break;
    }

    if (isEmpty || Object.keys(surveyAnswer).length !== questionLength) {
      alert("모든 설문에 응답해주세요.");
      return;
    }

    try {
      sendRequest(
        REACT_APP_URL + `/survey/${items.id}/answers`,
        "POST",
        JSON.stringify({ answers: surveyAnswer }),
        {
          "Content-Type": "application/json",
        }
      );

      alert("제출 완료되었습니다😊");
      navigate(`/${postId}/content`);
    } catch (err) {}
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {items.questions.map((survey) => (
          <Card className='survey_card' key={`survey-answer-${survey.id}`}>
            <div className='survey'>
              {survey.selectOption === "체크박스" ? (
                <>
                  <b>Q. {survey.question}</b>
                  <div className='check-box'>
                    {survey.options.map((list) => (
                      <div
                        key={`check-option-${list.id}`}
                        className='check-options'>
                        <input
                          id={survey.id}
                          type='checkbox'
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
                        <label htmlFor='list.id'>{list.value}</label>
                      </div>
                    ))}
                  </div>
                </>
              ) : survey.selectOption === "단답형" ? (
                <div>
                  <b> Q. {survey.question}</b>
                  <input
                    className='text-input'
                    type='text'
                    onChange={(e) => handleInputValue(`${survey.id}`, e)}
                  />
                </div>
              ) : (
                <div>
                  <b> Q. {survey.question}</b>
                  <textarea
                    className='text-textarea'
                    rows={5}
                    type='text'
                    onChange={(e) => handleInputValue(`${survey.id}`, e)}
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
        <div className='center survey_button'>
          <Button type='submit'>제출하기</Button>
        </div>
      </form>
    </>
  );
};

export default SurveyFormList;
