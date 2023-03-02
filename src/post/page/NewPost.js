import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useFetch } from "../../shared/hooks/fetch-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "../styles/PostForm.css";

const NewPost = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const [formState, inputHandler] = useForm(
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        "http://localhost:5000/api/posts",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          author: auth.userId,
          content: formState.inputs.content.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      history.push("/survey");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="post-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE]}
          errorText="입력하세요!"
          onInput={inputHandler}
        />
        <Input
          id="content"
          element="textarea"
          label="Content"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="입력하세요!"
          onInput={inputHandler}
        />
        <div className="bottom-container">
          <Button type="submit" disabled={!formState.isValid}>
            글 쓰기
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
