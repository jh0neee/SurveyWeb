import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useFetch } from "../../shared/hooks/fetch-hook";
import { useForm } from "../../shared/hooks/form-hook";
import "../styles/PostForm.css";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePost = () => {
  const { REACT_APP_URL } = process.env;
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const [loadedPost, setLoadedPost] = useState();
  const postId = useParams().postId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          REACT_APP_URL + `/posts/${postId}/content`
        );

        const contentById = responseData.post.find(
          (item) => item.id === postId
        );

        setLoadedPost(contentById);

        setFormData(
          {
            title: {
              value: contentById.title,
              isValid: true,
            },
            content: {
              value: contentById.content,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPosts();
  }, [sendRequest, postId, setFormData, REACT_APP_URL]);

  const postUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        REACT_APP_URL + `/posts/${postId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate(`/${postId}/content`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPost && !error) {
    return (
      <div className='center'>
        <h2>찾을 수 없습니다.</h2>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPost && (
        <form className='post-form' onSubmit={postUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='입력해주세요'
            onInput={inputHandler}
            initialValue={loadedPost.title}
            initialValid={true}
          />
          <Input
            id='content'
            element='textarea'
            label='Content'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='입력해주세요'
            onInput={inputHandler}
            initialValue={loadedPost.content}
            initialValid={true}
          />
          <div className='bottom-container'>
            <Button type='submit' disabled={!formState.isValid}>
              수정
            </Button>
          </div>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePost;
