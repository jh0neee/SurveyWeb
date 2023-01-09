import React from "react";

import PostItem from "./PostItem";
import "../styles/PostList.css";

const PostList = ({items}) => {
  return (
    <ul className="post-list">
      {items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          createDate={post.createDate}
          author={post.author}
          content={post.content}
          creatorId={post.creator}
        />
      ))}
    </ul>
  );
};

export default PostList;
