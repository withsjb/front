import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Test.module.css";
import axios from "axios";

import AddProblem from "../component/problem/AddProblem";

export default function Problem() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/problems");
      setProblems(response.data);
    }
    fetchData();
  }, []);

  const handleAddProblem = (problem) => {
    setProblems([...problems, problem]);
  };

  return (
    <div className={Styles.main}>
      <Navbar />
      <h1>Problems</h1>
      <AddProblem onAdd={handleAddProblem} />
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <p>Difficulty: {problem.difficulty}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
