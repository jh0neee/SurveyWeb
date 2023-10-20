import React from "react";

import Button from "../../shared/components/FormElements/Button";
import SurveyItem from "./SurveyItem";
import Pagination from "../../shared/components/FormElements/Pagination";
import "../styles/Survey.css";

const SurveyList = (props) => {
  const data = props.items;
  const { currPage, setCurrPage } = props;

  return (
    <div className='survey-board'>
      <div className='board-title'>
        <div className='title-wrapper'>
          <strong>설문게시판</strong>
          <p>설문에 참여해보세요!</p>
        </div>
        <div className='btn-wrapper'>
          <Button to='/post/new'>새 글쓰기</Button>
        </div>
      </div>
      <div className='table-wrapper'>
        <table className='table'>
          <thead>
            <tr className='table-header'>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.cuttedData?.map((survey) => (
              <SurveyItem
                key={survey.id}
                id={survey.id}
                title={survey.title}
                author={survey.author}
                createDate={survey.createDate}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination data={data} currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
};

export default SurveyList;
