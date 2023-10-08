import React, { useEffect, useState } from "react";

import SurveyList from "../components/SurveyList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useFetch } from "../../shared/hooks/fetch-hook";
import "../styles/Survey.css";

const Survey = () => {
  const { REACT_APP_URL } = process.env;
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const [loadedPost, setLoadedPost] = useState();

  const [start, setStart] = useState(0); // 페이지 당 시작 post index
  const [currPage, setCurrPage] = useState(1); // 현재 페이지

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/posts?offset=${start}&limit=5`
        );
        setStart((currPage - 1) * 5); // 페이지가 바뀔 때마다 post idx을 새롭게 불러온다.
        setLoadedPost(responseData);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest, start, currPage, REACT_APP_URL]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPost && (
        <SurveyList
          items={loadedPost}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      )}
    </React.Fragment>
  );
};

export default Survey;
