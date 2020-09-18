import React from "react";
import "./Post.css";
import platforms from "../platforms.json";

function Post({ post, handleEditPost }) {
  const [platformLabel, setPlatformLabel] = React.useState("");
  React.useEffect(() => {
    const platform = platforms.find((p) => {
      return p.value === post.platform;
    });

    if (platform) {
      setPlatformLabel(platform.label);
    } else {
      setPlatformLabel(post.platform);
    }
  }, [post]);
  return (
    <div className="post-container nes-container is-rounded is-dark">
      <div>{platformLabel}</div>
      <div>{post.game}</div>
      <div>{post.info}</div>
      <div>{post.notes}</div>
      <div>Updated: {post.lastUpdated}</div>
      <button onClick={() => handleEditPost(post)}>EDIT</button>
    </div>
  );
}

export default Post;
