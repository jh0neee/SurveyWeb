import React, { useCallback, useReducer } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import DropBox from "../../shared/components/FormElements/DropBox";
import "./NewPost.css";

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
      title: {
        value: "",
        isValid: false,
      },
      answer: {
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

  return (
    <form className="post-form">
      <div className="top-container">
        <DropBox />
        <Button>+ 추가</Button>
      </div>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[]}
        errorText="입력하세요!"
        onInput={inputHandler}
      />
      <Input
        id="answer"
        element="textarea"
        label="Answer"
        validators={[]}
        errorText="입력하세요!"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        제출
      </Button>
    </form>
  );
};

export default NewPost;
