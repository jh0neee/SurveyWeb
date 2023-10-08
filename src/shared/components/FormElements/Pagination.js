import React, { useState } from "react";
import styled, { css } from "styled-components";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
`;

const Button = styled.button`
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  color: #5e5f61;
  min-width: 22px;
  height: 22px;
  background: transparent;
  border: 0;
  border-radius: 4px;

  + button {
    margin-left: 4px;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #524fa1;
      color: #f9fafc;
    `}
`;

const ArrowButton = styled.button`
  margin: ${(props) => (props.flip ? "0 0 0 16px !important" : "0 16px 0 0")};
  border: 0;
  background: transparent;
  ${(
    props // 좌우반전
  ) =>
    props.flip &&
    css`
      transform: scaleX(-1);
    `}

  > svg {
    display: block;
  }
`;

const Pagination = ({ data, currPage, setCurrPage }) => {
  const [blockNum, setBlockNum] = useState(0);

  const getPageNumbers = (data) => {
    // 페이지 개수
    const resultPages = [];

    for (let i = 1; i <= Math.ceil(data?.total / 5); i++) {
      // 게시물 수를 5개씩 나누어 1페이지를 설정.
      resultPages.push(i);
    }
    return resultPages;
  };

  const maxPage = getPageNumbers(data).length; // 마지막 페이지
  const prevFirstPage = blockNum * 5; // 이전 pageBlock 마지막 페이지
  let limitArr = getPageNumbers(data).slice(prevFirstPage, prevFirstPage + 5);

  const onClickPrevPage = () => {
    if (prevFirstPage) {
      setBlockNum(blockNum - 1);
    }
    setCurrPage(limitArr[0] - 1);
  };

  const onClickNextPage = () => {
    if (prevFirstPage + 5) {
      setBlockNum(blockNum + 1);
    }
    setCurrPage(limitArr[4] + 1);
  };

  return (
    <Container>
      <ArrowButton disabled={currPage <= 5} onClick={() => onClickPrevPage()}>
        <KeyboardArrowLeftIcon />
      </ArrowButton>
      {limitArr.map((page) => {
        return (
          <Button
            key={`pagination-button-${page}`}
            active={currPage === page}
            onClick={() => setCurrPage(page)}>
            {page}
          </Button>
        );
      })}
      <ArrowButton
        flip
        disabled={limitArr.includes(maxPage) ? currPage : null}
        onClick={() => onClickNextPage()}>
        <KeyboardArrowLeftIcon />
      </ArrowButton>
    </Container>
  );
};

export default Pagination;
