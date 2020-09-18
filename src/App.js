import React from "react";
import "./App.css";
import AddEditPostForm from "./components/LFGForm";
import { getPosts, createPost, updatePost, deletePost } from "./LFGService";
import PostGrid from "./components/PostGrid";
import PingPong from "./components/PingPong";

function App() {
  const [currentPost, setCurrentPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [originalPosts, setOriginalPosts] = React.useState([]);
  const [posts, setPosts] = React.useState(() => {
    fetchPosts();

    return [];
  });

  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    if (!searchQuery) {
      setPosts(originalPosts);
      return;
    }

    const filteredPosts = originalPosts.filter((post) => {
      const searchQueryLowerCase = searchQuery.toLowerCase();
      const postNameLowerCase = post.game.toLowerCase();

      if (
        postNameLowerCase.startsWith(searchQueryLowerCase) ||
        postNameLowerCase.includes(searchQueryLowerCase)
      ) {
        return true;
      }
    });
    setPosts(filteredPosts);
  }, [searchQuery]);

  function fetchPosts() {
    setIsLoading(true);
    getPosts()
      .then((response) => {
        setOriginalPosts(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        debugger;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCreatePost(post) {
    createPost(post)
      .then((response) => {
        alert("SUCCESSFULLY CREATED NEW POST");
        fetchPosts();
        setCurrentPost(null);
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleUpdatePost(post) {
    updatePost(post._id, post)
      .then((response) => {
        alert("SUCCESSFULLY UPDATED POST");
        fetchPosts();
        setCurrentPost(null);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleDeletePost(post) {
    deletePost(post._id)
      .then((response) => {
        alert("SUCCESSFULLY DELETED POST");
        fetchPosts();
        setCurrentPost(null);
      })
      .catch((error) => {
        alert(error);
      });
  }
  function handleEditPost(post) {
    setCurrentPost(post);
  }

  function handleCancelPost(post) {
    setCurrentPost(null);
  }

  return (
    <div className="App">
      <h1 className="web-app-title nes-container is-rounded is-dark">LFG</h1>
      <AddEditPostForm
        existingPost={currentPost}
        handleCancelPost={handleCancelPost}
        handleCreatePost={handleCreatePost}
        handleUpdatePost={handleUpdatePost}
        handleDeletePost={handleDeletePost}
      />
      <label>
        Search By Game:
        <input
          type="text"
          className="nes-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </label>

      {isLoading ? <PingPong /> : null}
      <PostGrid posts={posts} handleEditPost={handleEditPost} />
      {!isLoading && posts.length === 0 ? <h3>No Results Found</h3> : null}
    </div>
  );
}

export default App;
