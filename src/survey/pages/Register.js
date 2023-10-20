import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { surveyAction } from "../../store/survey";
import Dropdown from "../../shared/components/FormElements/Dropdown";
import Button from "../../shared/components/FormElements/Button";
import SurveyCard from "../components/SurveyCard";
import { useFetch } from "../../shared/hooks/fetch-hook";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";

import "../styles/Register.css";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

const Register = () => {
  const [selectedOpt, setSelectedOpt] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const postId = useParams().postId;
  const dispatch = useDispatch();
  const surveyQuestion = useSelector((state) => state.survey.questionItem);

  const { REACT_APP_URL } = process.env;
  const { isLoading, error, sendRequest, clearError } = useFetch();

  const addListHandler = () => {
    if (selectedOpt === "") return;
    else if (selectedOpt === "체크박스") {
      dispatch(
        surveyAction.CREATE_SURVEY({
          id: "c" + Date.now(),
          selectOption: selectedOpt,
          question: "",
          options: [],
        })
      );
    } else {
      dispatch(
        surveyAction.CREATE_SURVEY({
          id: "s" + Date.now(),
          selectOption: selectedOpt,
          question: "",
        })
      );
    }
  };

  const surveySubmitHandler = (e) => {
    e.preventDefault();

    if (surveyQuestion.length === 0) {
      alert("질문은 1개 이상 작성해야합니다.");
      return;
    }

    try {
      sendRequest(
        REACT_APP_URL + "/survey",
        "POST",
        JSON.stringify({
          questions: surveyQuestion,
          postCreator: postId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer" + auth.token,
        }
      );

      alert("설문이 등록되었습니다😉");
      navigate(`/${postId}/content`);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className='container'>
        <div className='dropbox'>
          <Dropdown selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt} />
          <Button onClick={addListHandler}>+</Button>
        </div>
        <form onSubmit={surveySubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='survey-form'>
            {surveyQuestion.map((item) => (
              <div
                key={`survey-question-${item.id}`}
                className='mid-survey-form'>
                <SurveyCard id={item.id} selectOption={item.selectOption} />
              </div>
            ))}
          </div>
          <div className='center button-padding'>
            <Button type='submit'>등록하기</Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
