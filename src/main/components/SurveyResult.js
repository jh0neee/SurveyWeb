import React, { useEffect, useState } from "react";
import { useFetch } from "../../shared/hooks/fetch-hook";

import "../styles/Result.css";

const SurveyResult = ({ postId }) => {
  const { REACT_APP_URL } = process.env;
  const { sendRequest } = useFetch();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/survey/${postId}`
        );
        const responseContent = responseData.surveys.find((item) => {
          return item.postCreator === postId;
        });

        setQuestion(responseContent.questions);
        setAnswers(responseContent.answers);
      } catch (err) {}
    };

    fetchResults();
  }, [sendRequest, postId, REACT_APP_URL]);

  const countResponsesByValue = (responses, value) => {
    return responses.filter((response) => response === value).length;
  };

  const renderSurveyResult = () => {
    return question.map((question) => {
      const correspondingAnswer = answers.find(
        (answer) => answer.questionId === question.id
      );

      return (
        <div key={question.id} className='question'>
          <div className='question_title'>
            <h3>Q. {question.question}</h3>
            {question.selectOption !== "체크박스" && (
              <p className='question_title_sub'>
                (응답 {correspondingAnswer.responses.length}개)
              </p>
            )}
          </div>
          {correspondingAnswer && (
            <ul>
              {question.selectOption === "체크박스"
                ? question.options.map((opt) => (
                    <li key={opt.id}>
                      {opt.value}:
                      {countResponsesByValue(
                        correspondingAnswer.responses,
                        opt.value
                      )}
                      개
                    </li>
                  ))
                : correspondingAnswer.responses.map((response, idx) => (
                    <li key={idx} className='answer-list'>
                      • {response}
                    </li>
                  ))}
            </ul>
          )}
        </div>
      );
    });
  };

  return <div className='result'>{renderSurveyResult()}</div>;
};

export default SurveyResult;
