import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용

function BoardDetail() {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/board", newPost);
      setNewPost({ title: "", content: "", author: "" });
      navigate("/board");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="내용"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="작성자"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
        />
        <button type="submit">게시글 작성</button>
      </form>
    </div>
  );
}

export default BoardDetail;
