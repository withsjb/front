import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AiFillPlusCircle } from "react-icons/ai";
import WinGetquestion from "../component/admin/wingetquestion";
import Styles from "../styles/admin.module.css";
import Navbar from "../component/Navbar";

const WinAddQuestion = () => {
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
      formData.append("photo", photo || null);

      const response = await axios.post("/api/Winquiz", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    } else {
      setPhoto(null);
    }
  };

  return (
    <>
      <Navbar />
      <form className={Styles.inputform} onSubmit={handleSubmit}>
        <div className={Styles.proform}>
          <h2>문제를 작성해주세요</h2>
          <label className={Styles.prolabel} htmlFor="question">
            {" "}
            질문 입력 :{" "}
          </label>
          <input
            className={Styles.blank}
            type="text"
            id="question"
            value={question}
            placeholder=" 질문을 입력하세요."
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div className={Styles.proform}>
          <label className={Styles.prolabel} htmlFor="text">
            {" "}
            내용 입력 :{" "}
          </label>
          <input
            className={Styles.blank}
            type="text"
            id="text"
            value={text}
            placeholder=" 내용을 입력하세요."
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div>
          <div className={Styles.proform}>
            <label className={Styles.prolabel} htmlFor="option1">
              선택지 1 :{" "}
            </label>
            <input
              className={Styles.blank}
              type="text"
              id="option1"
              value={options[0]}
              placeholder=" 1번 정답"
              onChange={(event) => handleOptionChange(event, 0)}
            />
          </div>
          <div className={Styles.proform}>
            <label className={Styles.prolabel} htmlFor="option2">
              선택지 2 :{" "}
            </label>
            <input
              className={Styles.blank}
              type="text"
              id="option2"
              value={options[1]}
              placeholder=" 2번 정답"
              onChange={(event) => handleOptionChange(event, 1)}
            />
          </div>
          <div className={Styles.proform}>
            <label className={Styles.prolabel} htmlFor="option3">
              선택지 3 :{" "}
            </label>
            <input
              className={Styles.blank}
              type="text"
              id="option3"
              value={options[2]}
              placeholder=" 3번 정답"
              onChange={(event) => handleOptionChange(event, 2)}
            />
          </div>
          <div className={Styles.proform}>
            <label className={Styles.prolabel} htmlFor="option4">
              선택지 4 :{" "}
            </label>
            <input
              className={Styles.blank}
              type="text"
              id="option4"
              value={options[3]}
              placeholder=" 4번 정답"
              onChange={(event) => handleOptionChange(event, 3)}
            />
          </div>
        </div>
        <div className={Styles.proform}>
          <label className={Styles.prolabel} htmlFor="answer">
            정답 :{" "}
          </label>
          <select
            className={Styles.select}
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
        {/*
        <div className={Styles.proform}>
          <label className={Styles.inputfile} htmlFor="photo">
            사진 :{" "}
          </label>
          <input
            className={Styles.filedisplay}
            type="file"
            id="photo"
            onChange={handleFileChange}
          />
        </div>
  */}
        <button className={Styles.adm_btn} type="submit">
          추가하기
        </button>
      </form>
      <WinGetquestion />
    </>
  );
};

export default WinAddQuestion;
