import React from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import DropBox from "../../shared/components/FormElements/DropBox";
import "./NewPost.css";

const NewPost = () => {
  return (
    <div className="new-post">
      <div className="top-container">
        <DropBox />
        <Button>+ 추가</Button>
      </div>
      <form className="post-form">
        <Input element="input" type="text" label="Title" validators={[]} errorText="입력하세요!" />
      </form>
    </div>
  );
};

export default NewPost;
