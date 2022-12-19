import React from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PostForm.css";

const DUMMY_POST = [
  {
    id: "p1",
    title: "만족도 조사",
    createDate: "2022.10.11",
    author: "작성자",
    content: "만족도 조사를 실시합니다.",
    creator: "s1",
  },
  {
    id: "p2",
    title: "아파트 투표",
    createDate: "2022.10.11",
    author: "지현",
    content: "살사람 골라",
    creator: "s2",
  },
  {
    id: "p3",
    title: "식사 투표",
    createDate: "2022.10.11",
    author: "안영",
    content: "뭐 먹을지 투표",
    creator: "s3",
  },
];

const UpdatePost = () => {
  const contentId = useParams().contentId;

  const identifiedPost = DUMMY_POST.find((post) => post.id === contentId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedPost.title,
        isValid: true,
      },
      content: {
        value: identifiedPost.content,
        isValid: true,
      },
    },
    true
  );

  const postUpdateSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPost) {
    return (
      <div className="center">
        <h2>찾을 수 없습니다.</h2>
      </div>
    );
  }

  return (
    <form className="post-form" onSubmit={postUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        lable="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="입력해주세요"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="content"
        element="textarea"
        lable="Content"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="입력해주세요"
        onInput={inputHandler}
        initialValue={formState.inputs.content.value}
        initialValid={formState.inputs.content.isValid}
      />
      <div className="top-container">
        <Button>설문 수정</Button>
        <Button type="submit" disabled={!formState.isValid}>
          수정
        </Button>
      </div>
    </form>
  );
};

export default UpdatePost;
