import React from "react";
import Post from "./Post";
import "./PostGrid.css";

function PostGrid({ posts, handleEditPost }) {
  return (
    <div className="post-grid-container">
      <link
        href="https://fonts.googleapis.com/css?family=Press+Start+2P"
        rel="stylesheet"
      />
      <link
        href="https://unpkg.com/nes.css@latest/css/nes.min.css"
        rel="stylesheet"
      />
      {posts && posts.length
        ? posts.map((post) => {
            return (
              <Post
                post={post}
                key={post._id}
                handleEditPost={handleEditPost}
              />
            );
          })
        : null}
    </div>
  );
}

export default PostGrid;
