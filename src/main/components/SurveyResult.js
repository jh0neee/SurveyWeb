import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../shared/hooks/fetch-hook";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "../styles/Result.css";

const SurveyResult = ({ postId }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const id = useParams().postId;
  const { REACT_APP_URL } = process.env;
  const { sendRequest } = useFetch();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let selectedPostId;
  if (windowWidth <= 480) {
    selectedPostId = id;
  } else {
    selectedPostId = postId;
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/survey/${selectedPostId}`
        );
        const responseContent = responseData.surveys.find((item) => {
          return item.postCreator === selectedPostId;
        });

        setQuestion(responseContent.questions);
        setAnswers((prevAnswer) => [...prevAnswer, ...responseContent.answers]);
      } catch (err) {}
    };

    fetchResults();
  }, [sendRequest, selectedPostId, REACT_APP_URL]);

  const countResponsesByValue = (responses, value) => {
    return responses.filter((response) => response === value).length;
  };

  const renderSurveyResult = () => {
    const questionLastCount = question.length;

    return question.map((question, idx) => {
      // 현재 질문에 해당하는 응답 데이터
      const correspondingAnswer = answers.find(
        (answer) => answer.questionId === question.id
      );

      // 단답형 응답 데이터에서 각 응답값 횟수 파악
      const moreResponse =
        question.selectOption === "단답형" && correspondingAnswer.responses;

      const uniqueResponse = question.selectOption === "단답형" && [
        ...new Set(correspondingAnswer.responses),
      ];

      let moreCount = {};
      if (Array.isArray(moreResponse)) {
        uniqueResponse.forEach((response) => {
          const responseCount = moreResponse.filter(
            (res) => res === response
          ).length;
          moreCount[response] = responseCount;
        });
      }

      // 마지막 요소 true or false
      const isLastItem = idx === questionLastCount;

      // 객관식 차트
      const checkOptionData = question.options.map((opt) => {
        return opt.value;
      });

      const checkOptionCount = question.options.map((opt) => {
        return countResponsesByValue(correspondingAnswer.responses, opt.value);
      });

      const chartData = {
        labels: checkOptionData, // 차트의 레이블
        datasets: [
          {
            label: "답변 수",
            data: checkOptionCount, // 차트의 데이터
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };

      return (
        <>
          <div key={question.id} className='question'>
            <div className='question-title-box'>
              <h3
                className={
                  question.selectOption !== "체크박스" ? "title_main" : "title"
                }>
                Q. {question.question}
              </h3>
              {question.selectOption !== "체크박스" && (
                <p className='question-title-sub'>
                  (응답 {correspondingAnswer.responses.length}개)
                </p>
              )}
            </div>
            {correspondingAnswer && (
              <ul>
                {question.selectOption === "체크박스" ? (
                  <div className='canvas-container'>
                    <Doughnut
                      type='doughnut'
                      className='survey-canvas'
                      data={chartData}
                    />
                  </div>
                ) : moreResponse.length > 1 ? (
                  uniqueResponse.map((response, idx) => (
                    <li key={idx} className='answer-list'>
                      • {response} <span>{moreCount[response]}</span>
                    </li>
                  ))
                ) : (
                  correspondingAnswer.responses.map((response, idx) => (
                    <li key={idx} className='answer-list'>
                      • {response}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          {isLastItem ? <hr className='no-line' /> : <hr className='line' />}
        </>
      );
    });
  };

  return <div className='result'>{renderSurveyResult()}</div>;
};

export default SurveyResult;
