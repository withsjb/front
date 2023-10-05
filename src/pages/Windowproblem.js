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

      const response = await axios.post(
        "http://localhost:4000/Winquiz",
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
        <div>
          <label htmlFor="question"> 질문 : </label>
          <input
            type="text"
            id="question"
            value={question}
            placeholder=" 질문을 입력하세요."
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="text"> 내용 : </label>
          <input
            type="text"
            id="text"
            value={text}
            placeholder=" 내용을 입력하세요."
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <div className={Styles.num_input}>
          <div>
            <label htmlFor="option1"> 1번 : </label>
            <input
              className={Styles.numtextbox}
              type="text"
              id="option1"
              value={options[0]}
              placeholder=" 1번 정답 텍스트"
              onChange={(event) => handleOptionChange(event, 0)}
            />
          </div>
          <div>
            <label htmlFor="option2"> 2번 : </label>
            <input
              className={Styles.numtextbox}
              type="text"
              id="option2"
              value={options[1]}
              placeholder=" 2번 정답 텍스트"
              onChange={(event) => handleOptionChange(event, 1)}
            />
          </div>
          <div>
            <label htmlFor="option3"> 3번 : </label>
            <input
              className={Styles.numtextbox}
              type="text"
              id="option3"
              value={options[2]}
              placeholder=" 3번 정답 텍스트"
              onChange={(event) => handleOptionChange(event, 2)}
            />
          </div>
          <div>
            <label htmlFor="option4"> 4번 : </label>
            <input
              className={Styles.numtextbox}
              type="text"
              id="option4"
              value={options[3]}
              placeholder=" 4번 정답 텍스트"
              onChange={(event) => handleOptionChange(event, 3)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="answer">정답 : </label>
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
          <label htmlFor="photo">사진 : </label>
          <input type="file" id="photo" onChange={handleFileChange} />
        </div>

        <button className={Styles.adm_btn} type="submit">
          추가하기
        </button>
      </form>
      <WinGetquestion />
    </>
  );
};

export default WinAddQuestion;
