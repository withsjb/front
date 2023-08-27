import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0); // 추가

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResponse = await axios.get(`/api/board/${id}`);
        const commentsResponse = await axios.get(`/api/board/${id}/comments`);
        setPost(postResponse.data);
        setComments(commentsResponse.data);
        setLikes(postResponse.data.likes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostAndComments();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`/api/board/${id}/like`);
      setLikes(likes + 1); // 좋아요 수 증가
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/board/${id}/comments`, {
        text: comment,
      });
      setComment("");
      const updatedComments = [...comments, { text: comment }];
      setComments(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>게시글 상세 보기</h2>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>작성자: {post.author}</p>
          <p>조회수: {post.views}</p> {/* 조회수 표시 */}
          <p>좋아요: {likes}</p> {/* 좋아요 수 표시 */}
          <button onClick={handleLike}>좋아요</button>
          <h4>댓글</h4>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="댓글 작성"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">댓글 작성</button>
          </form>
        </div>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default PostDetail;
