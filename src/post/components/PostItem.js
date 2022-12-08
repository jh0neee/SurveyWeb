import React from 'react';

import './PostItem.css';

const PostItem = (props) => {
    return (
        <li>
            <h2 align="center">게시글 상세정보</h2>
            <div className='post-view-wrapper'>
                <div className='post-view-row'>
                    <label>제목</label>
                    <label>{props.title}</label>
                </div>
                <div className='post-view-row'>
                    <label>작성일</label>
                    <label>{props.createDate}</label>
                </div>
                <div className='post-view-row'>
                    <label>작성자</label>
                    <label>{props.author}</label>
                </div>
                <div className='post-view-row'>
                    <label>내용</label>
                    <label>{props.content}</label>
                </div>
            </div>
            <div>
                <button>수정하기</button>
                <button>삭제하기</button>
                <button>목록으로</button>
            </div>
        </li>
    )
};

export default PostItem;