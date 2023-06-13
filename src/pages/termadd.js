import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Add Term</h2>
      <div>
        <label>Term:</label>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div>
        <label>Definition:</label>
        <input
          type="text"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
      </div>
      <button onClick={handleAddTerm}>Add Term</button>

      {modalVisible && highlightedTerm && (
        <div>
          <h2>Highlighted Term</h2>
          <p>
            {highlightedTerm.term}: {highlightedTerm.definition}
          </p>
        </div>
      )}

      <h2>Terms with Highlighted Word</h2>
      <ul>
        {terms.map((term) => (
          <li
            key={term._id}
            onMouseEnter={() => handleHighlightTerm(term)}
            onMouseLeave={() => {
              setHighlightedTerm(null);
              setModalVisible(false);
            }}
          >
            {term.term}: {term.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
