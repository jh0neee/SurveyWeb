import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import "./PostItem.css";

const PostItem = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={props.title}
        contentClass="post-item__modal-content"
        footerClass="post-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeModalHandler}>닫기</Button>
            <Button>제출</Button>
          </React.Fragment>
        }
      >
        <div className="post-survey">
          <h2>설문내용</h2>
        </div>
      </Modal>
      <li>
        <div className="post-view-wrapper">
          <div className="post-view-row">
            <label>제목</label>
            <label>{props.title}</label>
          </div>
          <div className="post-view-row">
            <label>작성일</label>
            <label>{props.createDate}</label>
          </div>
          <div className="post-view-row">
            <label>작성자</label>
            <label>{props.author}</label>
          </div>
          <div className="post-view-row post-content">
            <label>내용</label>
            <label>{props.content}</label>
          </div>
        </div>
        <div className="post-view-btn">
          <Button to="/survey">목록으로</Button>
          <Button inverse onClick={openModalHandler}>
            설문하기
          </Button>
          <Button to="/post/new">예시</Button>
          <Button to={`/post/${props.id}`}>수정하기</Button>
          <Button danger>삭제하기</Button>
        </div>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
