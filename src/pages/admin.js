import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AiFillPlusCircle } from "react-icons/ai";
import Getquestion from "../component/admin/getquestion";

const AddQuestion = () => {
  const [id, setId] = useState(uuidv4());
  const [question, setQuestion] = useState("");
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const questionData = {
        questions: [
          {
            id: id,
            text: text,
            question: question,
            options: options,
          },
        ],
        answers: [parseInt(answer)],
      };

      const formData = new FormData();
      formData.append("questions", JSON.stringify(questionData));
      formData.append("photo", photo);

      const response = await axios.post(
        "http://localhost:4000/quiz",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      setQuestion("");
      setText("");
      setOptions(["", "", "", ""]);
      setAnswer("");
      setPhoto(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
    setAnswer(event.target.value);
  };

  const handleFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">질문:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="text">텍스트:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="option1">선택지 1:</label>
          <input
            type="text"
            id="option1"
            value={options[0]}
            onChange={(event) => handleOptionChange(event, 0)}
          />
        </div>
        <div>
          <label htmlFor="option2">선택지 2:</label>
          <input
            type="text"
            id="option2"
            value={options[1]}
            onChange={(event) => handleOptionChange(event, 1)}
          />
        </div>
        <div>
          <label htmlFor="option3">선택지 3:</label>
          <input
            type="text"
            id="option3"
            value={options[2]}
            onChange={(event) => handleOptionChange(event, 2)}
          />
        </div>
        <div>
          <label htmlFor="option4">선택지 4:</label>
          <input
            type="text"
            id="option4"
            value={options[3]}
            onChange={(event) => handleOptionChange(event, 3)}
          />
        </div>
        <div>
          <label htmlFor="answer">정답:</label>
          <select
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          >
            <option value={0}>선택지 1</option>
            <option value={1}>선택지 2</option>
            <option value={2}>선택지 3</option>
            <option value={3}>선택지 4</option>
          </select>
        </div>

        <div>
          <label htmlFor="photo">사진:</label>
          <input type="file" id="photo" onChange={handleFileChange} />
        </div>

        <button type="submit">추가하기</button>
      </form>
      <Getquestion />
    </>
  );
};

export default AddQuestion;
