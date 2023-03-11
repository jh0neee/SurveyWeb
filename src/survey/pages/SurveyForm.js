import React from "react";
import SurveyFormList from "../components/SurveyFormList";

import "../styles/SurveyForm.css";

const DEMO_SURVEY = [
  {
    id: "s1",
    selectedOpt: "객관식",
    question: "이름이 무엇인가요?",
    answer: "",
  },
  {
    id: "s2",
    selectedOpt: "주관식",
    question: "오늘 무엇을 먹었나요?",
    answer: "",
  },
  {
    id: "c1",
    selectedOpt: "체크박스",
    question: "오늘 해야할 일을 선택해주세요",
    option: [
      { id: 1, value: "밥먹기" },
      { id: 2, value: "자기" },
      { id: 3, value: "공부하기" },
    ],
  },
  {
    id: "s3",
    selectedOpt: "주관식",
    question: "오늘 해야할 일을 잘 끝냈나요?",
    answer: "",
  },
  {
    id: "c2",
    selectedOpt: "체크박스",
    question: "저녁 메뉴로 무엇을 먹고싶은가요?",
    option: [
      { id: 1, value: "된장찌개" },
      { id: 2, value: "김치찌개" },
      { id: 3, value: "감자채볶음" },
      { id: 4, value: "김치볶음밥" },
      { id: 5, value: "소고기구이" },
      { id: 6, value: "고등어구이" },
    ],
  },
  {
    id: "s4",
    selectedOpt: "객관식",
    question: "답변을 성실히 끝냈나요?",
    answer: "",
  },
];

const SurveyForm = () => {
  return (
    <>
      <h2>설문하기</h2>
      <SurveyFormList items={DEMO_SURVEY} />
    </>
  );
};

export default SurveyForm;
