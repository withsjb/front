import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../styles/termadd.module.css";

const App = () => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [highlightedTerm, setHighlightedTerm] = useState("");
  const [terms, setTerms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <div className={Styles.tbody}>
      <h1 className={Styles.page_name}> Term add page </h1>
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
        {terms.map((term) => (
          <li className={Styles.t_li} key={term._id}>
            <h2>{term.term}</h2>: {term.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
