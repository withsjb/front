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

const ArticleNavigator = () => {
  const articles = [
    {
      id: 1,
      concept: "Hello",
      content: "Article 1 content...",
      isVisible: false,
    },
    {
      id: 2,
      concept: "Hello",
      content: "Article 2 content...",
      isVisible: false,
    },
    {
      id: 3,
      concept: "Hello",
      content: "Article 3 content...",
      isVisible: false,
    },
    {
      id: 4,
      concept: "Hello",
      content: "Article 3 content...",
      isVisible: false,
    },
    {
      id: 5,
      concept: "Hello",
      content: "Article 3 content...",
      isVisible: false,
    },
    {
      id: 6,
      concept: "Hello",
      content: "Articleb 21 content...",
      isVisible: false,
    },
    {
      id: 7,
      concept: "Hello",
      content: "Articleb 22 content...",
      isVisible: false,
    },
    {
      id: 8,
      concept: "Hello",
      content: "Articleb 23 content...",
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
      concept: "Hellok",
      content: "Articleb 25 content...",
      isVisible: false,
    },
    // ... 추가적인 article 데이터
  ];

  const [articleStates, setArticleStates] = useState(articles);

  /*넘기는 버튼 */
  const handleToggleContent = (index) => {
    const newArticleStates = articleStates.map((article, idx) => ({
      ...article,
      isVisible: idx === index ? !article.isVisible : false,
    }));
    setArticleStates(newArticleStates);
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
      <div class="d-flex justify-content-center align-items-center flex-column mb-4">
        <h1 class="mb-2 text-white text-center">Infographic Roadmap</h1>
        <p class="w-75 text-white text-center">
          ES6 — Bootstrap 5.3 — FontAwesome 6.4
        </p>
        <p class="w-75 text-white text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{" "}
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

        <div className={Styles.circlea}>
          <FontAwesomeIcon className={Styles.circleicon} icon={faBook} />
          <h4>STEP 2</h4>Ready for this?
        </div>

        <div className={Styles.circleb}>
          <FontAwesomeIcon className={Styles.circleicon} icon={faFilePen} />
          <h4>STEP 2</h4>Ready for this?
        </div>

        <div className={Styles.oneroadmap}>
          {articleStates.map((article, index) => (
            <article className={Styles.article1} key={article.id}>
              <div className={Styles.icon}>
                <i>
                  {6 <= article.id && article.id < 11 ? (
                    <FontAwesomeIcon icon={faBook} />
                  ) : (
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  )}{" "}
                </i>
              </div>
              <h2
                className={Styles.title}
                onClick={() => handleToggleContent(index)}
              >
                {article.concept}
              </h2>

              {article.isVisible && (
                <p
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
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleNavigator;
