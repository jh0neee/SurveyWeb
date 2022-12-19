import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
// import DropBox from "../../shared/components/FormElements/DropBox";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PostForm.css";

const NewPost = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      content: {
        value: '',
        isValid: false
      }
    }, false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); // backend 연결
  };

  return (
    <form className="post-form" onSubmit={submitHandler}>
      {/* <div className="top-container">
        <DropBox />
        <Button>+ 추가</Button>
      </div> */}
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
      <div className="top-container">
        <Button>설문 등록</Button>
        <Button type="submit" disabled={!formState.isValid}>
          글 쓰기
        </Button>
      </div>
    </form>
  );
};

export default NewPost;
