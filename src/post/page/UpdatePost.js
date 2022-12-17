import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";

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
  const postId = useParams().postId;
  const identifiedPost = DUMMY_POST.find((p) => p.id === postId);

  if (!identifiedPost) {
    return (
      <div className="center">
        <h2>찾을 수 없습니다.</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        lable="Title"
        validators={[]}
        errorText='입력해주세요'
        oninput={() => {}}
        value={identifiedPost.title}
        valid={true}
      />
      <Input
        id="answer"
        element="textarea"
        lable="Answer"
        validators={[]}
        errorText='입력해주세요'
        oninput={() => {}}
        value={identifiedPost.answer}
        valid={true}
      />
      <Button type='submit' disabled={true}>수정</Button>
    </form>
  );
};

export default UpdatePost;
