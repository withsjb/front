import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../styles/termadd.module.css";
import Navbar from "../component/Navbar";

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
    const userInput = input.toLowerCase();
    const matchingTerm = terms.find((term) =>
      userInput.includes(term.term.toLowerCase())
    );
    if (matchingTerm) {
      setHighlightedTerm(matchingTerm);
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

  return (
    <>
      <Navbar />
      <div className={Styles.tbody}>
        <h1 className={Styles.termtitle}> Term add page </h1>
        <div className={Styles.addExp}>
          <h2> - This page is to add terms and definitions. </h2>
        </div>

        <div className={Styles.addForm}>
          <h2 className={Styles.formTitle}>Add Term</h2>
          <div>
            <label className={Styles.termAdd}>Term:</label>
            <input
              type="text"
              value={term}
              placeholder=" Input a term"
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <div>
            <label className={Styles.defAdd}>Definition:</label>
            <input
              type="text"
              value={definition}
              placeholder=" Explain definition"
              onChange={(e) => setDefinition(e.target.value)}
            />
          </div>
          <button className={Styles.t_Addbtn} onClick={handleAddTerm}>
            Add Term
          </button>
        </div>

        {modalVisible && highlightedTerm && (
          <div>
            <h2>Highlighted Term</h2>
            <p className={Styles.term_w}>{highlightedTerm.term} :</p>
            <p className={Styles.def_term}>{highlightedTerm.definition}</p>
          </div>
        )}

        <ul className={Styles.t_ul}>
          <button
            className={Styles.prevButton}
            onClick={() =>
              setActiveIndex(Math.max(activeIndex - itemsPerPage, 0))
            }
            disabled={activeIndex === 0}
          >
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
                    <div>
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
            className={Styles.nextButton}
            onClick={() =>
              setActiveIndex(
                Math.min(activeIndex + itemsPerPage, terms.length - 1)
              )
            }
            disabled={activeIndex + itemsPerPage >= terms.length}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
