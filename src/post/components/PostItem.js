import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElement/Modal";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import SurveyResult from "../../main/components/SurveyResult";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useFetch } from "../../shared/hooks/fetch-hook";
import "../styles/PostItem.css";

const PostItem = ({
  id,
  title,
  createDate,
  author,
  content,
  survey,
  onDelete,
}) => {
  const { REACT_APP_URL } = process.env;
  const { isLoading, error, sendRequest, clearError } = useFetch();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hasSurvey = survey.length !== 0;

  const openModalHandler = () => {
    const noneAnswer = survey && survey[0]?.answers.length === 0;

    if (!hasSurvey || (hasSurvey && noneAnswer)) {
      alert("설문 결과 업데이트 중입니다. 잠시만 기다려주세요.");
      return;
    }

    if (windowWidth <= 480) {
      navigate(`/${id}/result`);
    } else {
      setShowModal(true);
    }
  };
  const closeModalHandler = () => setShowModal(false);

  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(REACT_APP_URL + `/posts/${id}`, "DELETE", null, {
        Authorization: "Bearer " + auth.token,
      });
      onDelete(id);

      navigate("/survey");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        onCancel={closeModalHandler}
        header={title}
        className='post-item__modal'
        contentClass='post-item__modal-content'
        footerClass='post-item__modal-actions'
        footer={<Button onClick={closeModalHandler}>닫기</Button>}>
        <div className='post-survey'>
          <h2>결과</h2>
          <SurveyResult postId={id} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='게시글 삭제'
        footerClass='post-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }>
        <p>삭제하시겠습니까? 삭제 후에는 취소할 수 없습니다.</p>
      </Modal>
      <li>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className='post-top-view-btn'>
          <Button to='/survey'> ◀ 목록 </Button>
        </div>
        <div className='post-view-wrapper'>
          <div className='post-view'>
            <div className='post-title'>
              <label>{title}</label>
            </div>
            <div className='post-info'>
              <label>작성자</label>
              <p>{author.name}</p>
              <label>작성일</label>
              <p>{dayjs(createDate).format("YYYY-MM-DD")}</p>
            </div>
            <div className='post-content'>
              <label className='content'>{content}</label>
            </div>
          </div>
          <div className='post-btn-wrapper'>
            {auth.userId === author.id ? (
              <Button
                inverse
                to={!hasSurvey ? `/${id}/register` : undefined}
                onClick={() => {
                  if (hasSurvey) {
                    alert("이미 설문지가 등록되었습니다.");
                  }
                }}>
                설문등록
              </Button>
            ) : (
              <Button
                inverse
                to={hasSurvey ? `/${id}/survey` : undefined}
                onClick={() => {
                  if (!hasSurvey) {
                    alert("설문지가 등록되지 않았습니다.");
                  }
                }}>
                설문하기
              </Button>
            )}
            <Button onClick={openModalHandler}>결과</Button>
            {auth.userId === author.id && (
              <Button to={`/${id}/update`}>수정하기</Button>
            )}
            {auth.userId === author.id && (
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
