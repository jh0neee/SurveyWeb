import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PostList from "../components/PostList";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { useFetch } from "../../shared/hooks/fetch-hook";

const PostView = () => {
  const { REACT_APP_URL } = process.env;
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const [loadedContents, setloadedContents] = useState();

  const postId = useParams().postId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/posts/${postId}/content`
        );

        const responseContent = responseData.post.filter((item) => {
          return item.id === postId;
        });

        setloadedContents(responseContent);
      } catch (error) {}
    };
    fetchPosts();
  }, [sendRequest, postId, REACT_APP_URL]);

  // deletePost
  const postDeletedHandler = (deletedPostId) => {
    setloadedContents((prev) =>
      prev.filter((post) => post.id !== deletedPostId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContents && (
        <PostList items={loadedContents} onDeletePost={postDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default PostView;
