import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../styles/termadd.module.css";
import Navbar from "../component/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [highlightedTerm, setHighlightedTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await axios.get("/api/terms");
      setTerms(response.data);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  const handleAddTerm = async () => {
    try {
      const response = await axios.post("/api/terms", {
        term,
        definition,
      });
      setTerms([...terms, response.data]);
      setTerm("");
      setDefinition("");
    } catch (error) {
      console.error("Error adding term:", error);
    }
  };

  const handleHighlightTerm = (term) => {
    setHighlightedTerm(term);
  };

  const handleUserInput = (input) => {
    const userInput = input.toLowerCase(); // 검색어를 소문자로 변환

    const matchingTerms = terms.filter((term) =>
      term.term.toLowerCase().includes(userInput)
    );

    if (matchingTerms.length > 0) {
      setHighlightedTerm(matchingTerms[0]); // 첫 번째 부분 일치 항목을 선택
      // 검색 결과로 인덱스 설정
      const matchingIndex = terms.findIndex(
        (term) => term === matchingTerms[0]
      );
      setActiveIndex(matchingIndex);
      setModalVisible(true);
    } else {
      setHighlightedTerm(null);
      setModalVisible(false);
    }
  };

  const handleWordClick = (index) => {
    setActiveIndex(index);
  };

  const itemsPerPage = 3;

  const handleSearch = () => {
    handleUserInput(term); // 검색어 입력 처리 함수 호출
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (term.trim() === "") {
        // 검색어가 비어있을 때, 이전 상태로 돌아가기
        setActiveIndex(1);
      } else {
        // 검색어가 입력되었을 때, 검색 실행
        handleSearch();
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={Styles.tbody}>
        <div className={Styles.tcontainer}>
          <h1 className={Styles.termtitle}>
            <i className={Styles.icon}>
              <FontAwesomeIcon icon={faBookBookmark} />
            </i>{" "}
            취약점 단어장
            <span className={Styles.tsubtitle}>
              {" "}
              Vulnerability Vocabulary Note.
            </span>
          </h1>

          <div className={Styles.searchContainer}>
            <input
              className={Styles.searchInput}
              type="text"
              value={term}
              placeholder="검색어를 입력한 후 엔터키를 눌러주세요"
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={handleKeyPress} // 엔터 키 처리
            />
          </div>

          <ul className={Styles.t_ul}>
            <button
              className={Styles.prevbtn}
              onClick={() =>
                setActiveIndex(Math.max(activeIndex - itemsPerPage, 0))
              }
              disabled={activeIndex === 0}
            >
              <i className={Styles.ticon}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </i>{" "}
              이전
            </button>
            {terms.map((term, index) => {
              if (
                index >= activeIndex - Math.floor(itemsPerPage / 2) &&
                index < activeIndex + Math.ceil(itemsPerPage / 2) &&
                index < terms.length // 항목이 리스트의 끝을 벗어나지 않도록 확인
              ) {
                return (
                  <li
                    className={`${Styles.t_li} ${
                      index === activeIndex ? Styles.active : ""
                    }`}
                    key={term._id}
                    onClick={() => handleWordClick(index)}
                  >
                    <div className={Styles.menu}>
                      {" "}
                      <div className={Styles.termcont}>
                        <span className={Styles.activelight}></span>
                        <h2 className={Styles.menuh2}> {term.term}</h2>
                      </div>
                    </div>
                    <div className={Styles.definitionroom}>
                      <ul className={Styles.nacc}>
                        <li
                          className={`${Styles.behindli} ${
                            index === activeIndex ? Styles.activeli : ""
                          }`}
                        >
                          {term.definition}
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          {/* 이전 버튼과 다음 버튼 추가 */}
          <div className={Styles.carouselButtons}>
            <button
              className={Styles.nextbtn}
              onClick={() =>
                setActiveIndex(
                  Math.min(activeIndex + itemsPerPage, terms.length - 1)
                )
              }
              disabled={activeIndex + itemsPerPage >= terms.length}
            >
              다음{" "}
              <i className={Styles.ticon}>
                <FontAwesomeIcon icon={faChevronRight} />
              </i>
            </button>
          </div>
          <div className={Styles.addForm}>
            <h2 className={Styles.formTitle}>
              {" "}
              Add New Term{" "}
              <i className={Styles.icon}>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </i>
            </h2>
            <div>
              <label className={Styles.termAdd}> Term:</label>
              <input
                className={Styles.inputterm}
                type="text"
                value={term}
                placeholder=" Input a term"
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <div>
              <label className={Styles.defAdd}> Def:</label>
              <input
                className={Styles.inputdef}
                type="text"
                value={definition}
                placeholder=" Explain definition"
                onChange={(e) => setDefinition(e.target.value)}
              />
            </div>
            <button className={Styles.t_Addbtn} onClick={handleAddTerm}>
              <i className={Styles.plusicon}>
                <FontAwesomeIcon icon={faPlus} />
              </i>{" "}
              Add Term
            </button>
          </div>
        </div>{" "}
        {/*tcontainer div */}
      </div>
    </>
  );
};

export default App;
