import React, { useState } from "react";
import axios from "axios";

function ChangeProblem({ problem, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(problem.title);
  const [description, setDescription] = useState(problem.description);
  const [difficulty, setDifficulty] = useState(problem.difficulty);

  const handleDelete = async () => {
    await axios.delete(`/api/problems/${problem._id}`);
    onDelete(problem._id);
  };

  const handleUpdate = async () => {
    const updatedProblem = { _id: problem._id, title, description, difficulty };
    const response = await axios.put(
      `/api/problems/${problem._id}`,
      updatedProblem
    );
    onUpdate(response.data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit">Save</button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <p>Difficulty: {problem.difficulty}</p>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default ChangeProblem;
