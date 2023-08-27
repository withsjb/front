import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Board() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // useNavigate hook 추가

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("/api/board");
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>게시판</h1>
      <Link to="/add-post">게시글 추가</Link>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <button onClick={() => navigate(`/postdetail/${post._id}`)}>
              {post.title}
            </button>{" "}
            <h2>{post.date}</h2>
            <h2>{post.views}</h2>
            <h2>{post.likes}</h2>
            {/* navigate 함수 사용 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
