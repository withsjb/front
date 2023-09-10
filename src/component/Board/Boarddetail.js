import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용
import Styles from "../../styles/Boarddetail.module.css";
import Navbar from "../Navbar";

function BoardDetail() {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "", // 여기에 사용자 이메일을 저장할 것입니다.
  });
  const navigate = useNavigate();

  // 사용자 정보를 가져오는 useEffect 추가
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          "/api",
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.status) {
          // 사용자 정보가 있는 경우 author 필드에 이메일을 설정
          setNewPost({ ...newPost, author: response.data.user });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []); // 컴포넌트가 처음 로드될 때만 호출

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
    <div className={Styles.bbody}>
      <h2 className={Styles.btitle}>
        게시글 작성
        <span className={Styles.btitle2}>매너있는 글쓰기 부탁드려요!</span>
      </h2>
      <div className={Styles.bar}></div>
      <form onSubmit={handlePostSubmit}>
        <div className={Styles.titletxt1}>제목 : </div>
        <input
          className={Styles.titleform}
          type="text"
          placeholder="제목을 입력해주세요."
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <br></br>
        <div className={Styles.titletxt2}>내용 : </div>
        <textarea
          className={Styles.textform}
          placeholder="내용을 입력해주세요."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />{" "}
        <br></br>
        <div className={Styles.titletxt3}>작성자 : </div>
        <input
          className={Styles.writerform}
          type="text"
          placeholder="작성자"
          value={newPost.author}
          onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
          disabled
        />{" "}
        <br></br>
        <button className={Styles.postuploadbtn} type="submit">
          작성
        </button>
        <Link className={Styles.canclebtn} to="/Board">
          취소
        </Link>
      </form>
    </div>
  );
}

export default BoardDetail;
