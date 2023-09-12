import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Styles from "../../styles/Postdetail.module.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0); // 추가

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResponse = await axios.get(`/api/qnaboard/${id}`);
        const commentsResponse = await axios.get(
          `/api/qnaboard/${id}/comments`
        );
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
      await axios.post(`/api/qnaboard/${id}/like`);
      setLikes(likes + 1); // 좋아요 수 증가
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/qnaboard/${id}/comments`, {
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
    <div className={Styles.postbody}>
      <h1 className={Styles.posttitle}>게시글</h1>
      <div className={Styles.bar}></div>
      {post ? (
        <div>
          <h2 className={Styles.ptitle}>Title : {post.title}</h2>
          <p className={Styles.pcontents}>{post.content}</p>
          <div className={Styles.postinfo}>
            <span className={Styles.writer}>작성자 :{post.author}</span>
            <span className={Styles.views}>조회수 : {post.views}</span>{" "}
            {/* 조회수 표시 */}
            <span className={Styles.dates}>업로드 : {post.date}</span>{" "}
            {/* 날짜 표시*/}
          </div>
          <button className={Styles.likebtn} onClick={handleLike} type="submit">
            {" "}
            좋아요! {likes}
          </button>{" "}
          {/* 좋아요 수 표시 */}
          <h4 className={Styles.posth4}>댓글</h4>
          <form onSubmit={handleCommentSubmit}>
            <input
              className={Styles.commentform}
              type="text"
              placeholder="댓글 작성"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ul className={Styles.commentul}>
              {comments.map((comment, index) => (
                <li className={Styles.commentli} key={index}>
                  {" "}
                  {comment.text}{" "}
                </li>
              ))}
            </ul>

            <button className={Styles.commentsbtn} type="submit">
              작성
            </button>
          </form>
        </div>
      ) : (
        <p>게시글을 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default PostDetail;
