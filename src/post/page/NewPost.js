import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
// import DropBox from "../../shared/components/FormElements/DropBox";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PostForm.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const NewPost = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      // 개별 입력값이 유효한지
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch(
      { type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id },
      [dispatch]
    );
  }, []);

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
