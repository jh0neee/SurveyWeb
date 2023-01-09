import React from 'react';
import { useParams } from 'react-router-dom';

import PostList from '../components/PostList';

const DUMMY_POST = [
  {
    id: 'p1',
    title: '만족도 조사',
    createDate: '2022.10.11',
    author: '작성자',
    content: '만족도 조사를 실시합니다.',
    creator: 's1'
  },
  {
    id: 'p2',
    title: '아파트 투표',
    createDate: '2022.10.11',
    author: '지현',
    content: '살사람 골라',
    creator: 's2'
  },
  {
    id: 'p3',
    title: 'A학교 교직원 석식여부 조사',
    createDate: '2022.10.11',
    author: '박문자',
    content: '뭐 먹을지 투표',
    creator: 's3'
  },
  {
    id: 'p4',
    title: 'V기업 출퇴근시간 조정 여부 조사',
    createDate: '2022.10.11',
    author: '김말영',
    content: '몇시 출근하고 퇴근하고 싶은지 선택',
    creator: 's4'
  },
];

const PostView = () => {
    const userId = useParams().userId;
    const loadedContents = DUMMY_POST.filter(post => post.creator === userId)
    return <PostList items={loadedContents} />
};

export default PostView;