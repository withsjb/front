import React, { useState } from "react";
import Styles from "../styles/Roadmap.module.css";
import Navbar from "../component/Navbar";
import { FaBook, FaMeteor } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBook,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const ArticleNavigator = () => {
  const articles = [
    {
      id: 1,
      concept: "서론",
      content: "순서대로 따라가보세요!",
      isVisible: false,
    },
    {
      id: 2,
      concept: "리눅스 구조",
      content: <Link to="/linux/user/649050c0d224bc4b21cdd17c">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 3,
      concept: "설치가이드 페이지",
      content: <Link to="/linux/user/65286499a03da16836bc5b3a">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 4,
      concept: " 로그 기본 설정",
      content: <Link to="/linux/user/652618ebd55a4e8632033802">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 5,
      concept: "Shell script 기초",
      content: <Link to="/window/user/651f7ab84e8ce931808e6211">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 6,
      concept: "hello",
      content: "11",
      isVisible: false,
    },
    {
      id: 7,
      concept: "Windows 기초",
      content: <Link to="/WinStudy">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 8,
      concept: "Linux 기초",
      content: <Link to="/LinStudy">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 9,
      concept: "Hello",
      content: "Articleb 24 content...",
      isVisible: false,
    },
    {
      id: 10,
      concept: "Hello",
      content: "Articleb 25 content...",
      isVisible: false,
    },
    {
      id: 11,
      concept: "Testbed",
      content: <Link to="/linux/user/64907713d224bc4b21cdd442">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 12,
      concept: "test bed",
      content: <Link to="/linux/user/64907713d224bc4b21cdd442">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 13,
      concept: "Windows 문제",
      content: <Link to="/WindowsQuizmain">Go Page</Link>,
      isVisible: false,
    },
    {
      id: 14,
      concept: "Linux 문제",
      content: <Link to="/LinuxQuizmain">Go Page</Link>,
      isVisible: false,
    },
    // ... 추가적인 article 데이터
  ];

  const [articleStates, setArticleStates] = useState(articles);
  const [isId1To5Visible, setIsId1To5Visible] = useState(false);
  const [isId1To10Visible, setIsId1To10Visible] = useState(false);

  /*넘기는 버튼 */
  const handleToggleContent = (index) => {
    const newArticleStates = articleStates.map((article, idx) => ({
      ...article,
      isVisible: idx === index ? !article.isVisible : false,
    }));

    // 확인: ID 1-5 중 하나라도 isVisible이 true인지?
    const isAnyId1To5Visible = newArticleStates.some(
      (article) => article.isVisible && article.id >= 1 && article.id <= 5
    );

    const isAnyId1To10Visible = newArticleStates.some(
      (article) => article.isVisible && article.id >= 1 && article.id <= 10
    );

    // 상태 업데이트
    setArticleStates(newArticleStates);
    setIsId1To5Visible(isAnyId1To5Visible);
    setIsId1To10Visible(isAnyId1To10Visible);
  };

  const handleNext = () => {
    const currentIndex = articleStates.findIndex(
      (article) => article.isVisible
    );
    if (currentIndex < articleStates.length - 1) {
      handleToggleContent(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    const currentIndex = articleStates.findIndex(
      (article) => article.isVisible
    );
    if (currentIndex > 0) {
      handleToggleContent(currentIndex - 1);
    }
  };

  /*버튼 끝 */

  return (
    <div className={Styles.body}>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1 className={Styles.h1}>추천 루트를 소개합니다!</h1>

        <p className="w-75 text-white text-center">
          처음 오신 분들을 위해 저희가 준비한 가이드라인입니다. 입문하시는
          분들께서는 처음부터 진행하시면 도움이 되실 겁니다.{" "}
        </p>
      </div>
      <div className={Styles.one}>
        <div className={Styles.circle}>
          <FontAwesomeIcon
            className={Styles.circleicon}
            icon={faMagnifyingGlass}
          />
          <h4>STEP 1</h4>Ready for this?
        </div>

        <div
          className={`${Styles.circlea} ${
            isId1To5Visible ? Styles.circleaWithMargin : ""
          }`}
        >
          <FontAwesomeIcon className={Styles.circleicon} icon={faBook} />
          <h4>STEP 2</h4>Ready for this?
        </div>

        <div
          className={`${Styles.circleb} ${
            isId1To10Visible ? Styles.circlebWithMargin : ""
          }`}
        >
          <FontAwesomeIcon className={Styles.circleicon} icon={faFilePen} />
          <h4>STEP 3</h4>Ready for this?
        </div>

        <div className={Styles.oneroadmap}>
          {articleStates.map((article, index) => (
            <article className={Styles.article1} key={article.id}>
              <div className={Styles.icon}>
                <i>
                  {article.id < 6 ? (
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  ) : article.id < 11 ? (
                    <FontAwesomeIcon icon={faBook} />
                  ) : (
                    <FontAwesomeIcon icon={faFilePen} />
                  )}
                </i>
              </div>
              <h2
                className={Styles.title}
                onClick={() => handleToggleContent(index)}
              >
                {article.concept}
              </h2>

              {article.isVisible && (
                <div
                  className={`${Styles.p} ${
                    article.isVisible ? Styles.visible : ""
                  }`}
                >
                  {article.content}
                  <nav>
                    <button
                      className={Styles.btu}
                      onClick={handlePrev}
                      disabled={articleStates[0].isVisible}
                    >
                      Prev
                    </button>
                    <button
                      className={Styles.btu}
                      onClick={handleNext}
                      disabled={
                        articleStates[articleStates.length - 1].isVisible
                      }
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleNavigator;
