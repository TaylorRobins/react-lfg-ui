import React from "react";
import "./LFGForm.css";
import platforms from "../platforms.json";

function AddEditPostForm({
  handleCreatePost,
  handleDeletePost,
  handleUpdatePost,
  existingPost,
  handleCancelPost,
}) {
  const [platform, setPlatform] = React.useState(
    existingPost ? existingPost.platform : ""
  );
  const [game, setGame] = React.useState(existingPost ? existingPost.game : "");
  const [info, setInfo] = React.useState(existingPost ? existingPost.info : "");
  const [notes, setNotes] = React.useState(
    existingPost ? existingPost.notes : ""
  );
  React.useEffect(() => {
    setGame(existingPost ? existingPost.game : "");
    setPlatform(existingPost ? existingPost.platform : "");
    setInfo(existingPost ? existingPost.info : "");
    setNotes(existingPost ? existingPost.notes : "");
  }, [existingPost]);
  const [errors, setErrors] = React.useState({
    platform: null,
    game: null,
    info: null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const errors = { platform: null, game: null, info: null };

    if (!platform || platform === "all") {
      errors.platform = "Platform Entry Cannot be Empty nor All";
    }
    if (game.length === 0) {
      errors.game = "Game Entry Cannot be Empty";
    }
    if (info.length === 0) {
      errors.info = "Info Entry Cannot be Empty";
    }

    if (errors.platform || errors.game || errors.info) {
      setErrors(errors);
      return;
    }

    const post = {
      platform: platform,
      game: game,
      info: info,
      notes: notes,
      lastUpdated: new Date().toUTCString(),
    };

    if (existingPost) {
      post._id = existingPost._id;

      handleUpdatePost(post);
    } else {
      handleCreatePost(post);
    }
  }

  return (
    <div className="add-edit-post-form-container nes-container is-rounded is-dark">
      <h1>{existingPost ? "Edit LFG" : "Add LFG"}</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="top-form-bar">
          <label>
            Platform<span className="required">*</span>:
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className={errors.platform ? "invalid" : "nes-input"}
            >
              <option value=""></option>
              {platforms.map((platform) => {
                return (
                  <option value={platform.value} key={platform.value}>
                    {platform.label}
                  </option>
                );
              })}
            </select>
            {errors.platform ? (
              <span className="required">{errors.platform}</span>
            ) : null}
          </label>
          <label>
            Game<span className="required">*</span>:
            <input
              type="text"
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className={errors.game ? "invalid" : "nes-input"}
            />
            {errors.game ? (
              <span className="required">{errors.game}</span>
            ) : null}
          </label>
          <label>
            Invite Info<span className="required">*</span>:
            <input
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className={errors.info ? "invalid" : "nes-input"}
            />
            {errors.info ? (
              <span className="required">{errors.info}</span>
            ) : null}
          </label>
        </div>
        <div className="notes-box">
          <label>
            Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="nes-textarea"
            ></textarea>
          </label>
        </div>
        <div className="create-button-container">
          <button className="nes-btn is-primary">
            {existingPost ? "Update LFG" : "Create LFG"}
          </button>
          {existingPost ? (
            <button
              onClick={() => handleDeletePost(existingPost)}
              className="nes-btn is-error"
            >
              DELETE
            </button>
          ) : null}
          {existingPost ? (
            <button
              onClick={() => handleCancelPost(existingPost)}
              className="nes-btn is-warning"
            >
              CANCEL
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default AddEditPostForm;
