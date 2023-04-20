import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../shared/hooks/fetch-hook";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import SurveyFormList from "../components/SurveyFormList";

import "../styles/SurveyForm.css";

const SurveyForm = () => {
  const [loadedSurveys, setLoadedSurveys] = useState();
  const { REACT_APP_URL } = process.env;
  const { isLoading, error, sendRequest, clearError } = useFetch();

  const postId = useParams().postId;

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/survey/${postId}`
        );

        const responseContent = responseData.surveys.find((item) => {
          return item.postCreator === postId;
        });

        setLoadedSurveys(responseContent);
      } catch (error) {}
    };
    fetchSurveys();
  }, [sendRequest, postId, REACT_APP_URL]);

  console.log(loadedSurveys);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedSurveys && (
        <>
          <h2>설문하기</h2>
          <SurveyFormList items={loadedSurveys} />
        </>
      )}
    </React.Fragment>
  );
};

export default SurveyForm;
