import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }:{postId:string}) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event:React.SyntheticEvent) => {
    event.preventDefault();

    await axios.post(`http://posts.com:32739/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
