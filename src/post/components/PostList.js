import React from "react";

import PostItem from "./PostItem";
import "./PostList.css";

const PostList = (props) => {
  return (
    <ul className="post-list">
      {props.items.map((post) => (
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
