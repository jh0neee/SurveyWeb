import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import DropBox from "../../shared/components/FormElements/DropBox";
import Modal from "../../shared/components/UIElement/Modal";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useFetch } from "../../shared/hooks/fetch-hook";
import "../styles/PostItem.css";

const PostItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);

      history.push("/survey");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
          <DropBox />
          <h2>설문내용</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="게시글 삭제"
        footerClass="post-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>삭제하시겠습니까? 삭제 후에는 취소할 수 없습니다.</p>
      </Modal>
      <li>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="post-top-view-btn">
          <Button to="/survey"> ◀ 목록 </Button>
          {auth.isLoggedIn && <Button>설문등록</Button>}
        </div>
        <div className="post-view-wrapper">
          <div className="post-view">
            <div className="post-title">
              <label>{props.title}</label>
            </div>
            <div className="post-info">
                <label>작성자</label>
                <p>{props.author}</p>
                <label>작성일</label>
                <p>{props.createDate}</p>
            </div>
            <div className="post-content">
              <label>{props.content}</label>
            </div>
          </div>
          <div className="post-btn-wrap">
            <Button inverse to={'/post/survey'}>
              설문하기
            </Button>
            <Button onClick={openModalHandler}>결과</Button>
            {auth.userId === props.author && (
              <Button to={`/${props.id}/update`}>수정하기</Button>
            )}
            {auth.userId === props.author && (
              <Button danger onClick={showDeleteWarningHandler}>
                삭제하기
              </Button>
            )}
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
