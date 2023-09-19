import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../styles/Board.module.css";
import Navbar from "../component/Navbar";

function Board() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 추가
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `/api/board?page=${page}&pageSize=${pageSize}`
        );
        setPosts(response.data.posts);
        setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, [page, pageSize]);

  // 페이지 번호 목록 생성
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <div>
        <Navbar />
        <h1 className={Styles.bh1}>
          자유게시판
          <span className={Styles.bh2}>자유로운 소통을 위한 공간입니다.</span>
        </h1>
        <div className={Styles.bar}></div>
        <div className={Styles.exbar}>
          {" "}
          제목
          <span className={Styles.exview}> | 조회수 |</span>
          <span className={Styles.exlike}> 좋아요</span>
        </div>
        <Link className={Styles.linkbtn} to="/Boarddetail">
          글쓰기
        </Link>
        {posts.map((post) => (
          <div className={Styles.postbtndiv} key={post._id}>
            <button
              className={Styles.postbtn}
              onClick={() => navigate(`/postdetail/${post._id}`)}
            >
              {post.title}
              <span className={Styles.views}>
                {" "}
                {post.views} |{" "}
                <span className={Styles.likes}> {post.likes} </span>
              </span>
            </button>{" "}
            {/* navigate 함수 사용 */}
          </div>
        ))}
      </div>
      <div className={Styles.pgbody}>
        <button
          className={Styles.pgback}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          이전
        </button>
        {/* 페이지 번호 목록 렌더링 */}
        {pageNumbers.map((pageNumber) => (
          <button
            className={Styles.pgselect}
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className={Styles.pgnext}
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Board;
