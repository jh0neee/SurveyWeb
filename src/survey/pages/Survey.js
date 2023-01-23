import React, { useEffect, useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import SurveyList from "../components/SurveyList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useFetch } from "../../shared/hooks/fetch-hook";

const Survey = () => {
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const [loadedPost, setLoadedPost] = useState();

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/posts");
  
        setLoadedPost(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPost && <SurveyList items={loadedPost} />}
      <div className="center">
        <Button to="/post/new">새 글쓰기</Button>
      </div>
    </React.Fragment>
  );
};

export default Survey;
