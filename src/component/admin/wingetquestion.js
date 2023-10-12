import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../../styles/admin.module.css";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Quiz = () => {
  const [quizList, setQuizList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [questionToEdit, setQuestionToEdit] = useState({
    quizId: null,
    id: null,
    question: "",
    text: "",
    options: ["", "", "", ""],
    answer: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/winquiz");
      setQuizList(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setQuestionToEdit(selectedQuestion);
  }, [selectedQuestion]);

  const getAnswer = (questionId, quiz) => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (question) {
      const index = quiz.questions.indexOf(question);
      return quiz.answers[index] ?? null;
    }
    return null;
  };

  const deleteQuestion = async (quizId, questionId) => {
    try {
      const result = await axios.delete(`/api/winquiz/${quizId}/${questionId}`);
      console.log(result.data); // 서버로부터 받은 응답 데이터 출력
      // 삭제 요청에 성공하면 quizList를 다시 불러옵니다.
      const updatedQuizList = await axios.get("/api/winquiz");
      setQuizList(updatedQuizList.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //update
  const openModal = (question) => {
    const quizId = quizList.find((quiz) =>
      quiz.questions.some((q) => q.id === question.id)
    )._id;
    setSelectedQuestion({ ...question, quizId });
    if (selectedQuestion && selectedQuestion.id === question.id) {
      setQuestionToEdit({ ...questionToEdit, quizId });
    } else {
      setQuestionToEdit({
        ...question,
        quizId,
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setQuestionToEdit({
      quizId: null,
      id: null,
      question: "",
      text: "",
      options: ["", "", "", ""],
      answer: 0,
    });
    setModalIsOpen(false);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...questionToEdit.options];
    newOptions[index] = e.target.value;
    setQuestionToEdit((prevQuestion) => ({
      ...prevQuestion,
      options: newOptions,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let parsedValue;

    if (name === "answer") {
      parsedValue = parseInt(value, 10);
    } else {
      parsedValue = value;
    }

    setQuestionToEdit((prevQuestion) => ({
      ...prevQuestion,
      [name]: parsedValue,
      options: [...prevQuestion.options], // 기존 배열을 복사하여 새로운 배열 생성
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("question", questionToEdit.question);
      formData.append("text", questionToEdit.text);
      questionToEdit.options.forEach((option) => {
        formData.append("options", option);
      });
      formData.append("answer", questionToEdit.answer);
      formData.append("photo", questionToEdit.photo);

      const result = await axios.put(
        `/api/winquiz/${selectedQuestion.quizId}/${selectedQuestion.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(result.data); // 서버로부터 받은 응답 데이터 출력
      // 수정 요청에 성공하면 quizList를 다시 불러옵니다.
      const updatedQuizList = await axios.get("/api/winquiz");
      setQuizList(updatedQuizList.data);
      closeModal();
    } catch (error) {
      console.error(error.message);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
    console.log(currentSlide);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? quizList.length - 1 : prevSlide - 1
    );
    console.log(currentSlide);
  };

  return (
    <div className={Styles.admincontainer}>
      {quizList.map((quiz) => (
        <div className={Styles.admincon} key={quiz._id}>
          <button className={Styles.buttonleft} onClick={prevSlide}>
            <TiChevronLeftOutline />
          </button>
          {/* "다음" 버튼 */}
          <button className={Styles.button} onClick={nextSlide}>
            <TiChevronRightOutline />
          </button>
          {quiz.questions.map((question, index) => (
            <div
              className={`${Styles.admindiv} ${
                index === currentSlide
                  ? Styles.currentSlide
                  : index === currentSlide - 1 || index === currentSlide - 2
                  ? Styles.previousSlide
                  : index === currentSlide + 1 || index === currentSlide + 2
                  ? Styles.nextSlide
                  : ""
              }`}
              key={question.id}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <h4 className={Styles.adminh4}> Q : {question.question}</h4>
              <p className={Styles.adminp}> 내용 : {question.text}</p>

              <ol>
                {question.options.map((option, index) => (
                  <li className={Styles.adminli} key={index}>
                    {option}
                  </li>
                ))}
              </ol>

              <p className={Styles.adminan}>
                정답: {getAnswer(question.id, quiz) + 1}
              </p>
              <button
                onClick={() => deleteQuestion(quiz._id, question.id)}
                className={Styles.adminbtndelete}
              >
                Delete
              </button>
              <button
                onClick={() => openModal(question)} // 수정 버튼 클릭 시 openModal 함수를 호출합니다.
                className={Styles.adminbtnedit}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ))}

      {selectedQuestion && (
        <div className={Styles.modal}>
          <h3>질문 수정하기</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="question">질문</label>
            <input
              type="text"
              name="question"
              id="question"
              value={questionToEdit.question}
              onChange={handleChange}
            />
            <label htmlFor="text">텍스트</label>
            <input
              type="text"
              name="text"
              id="text"
              value={questionToEdit.text}
              onChange={handleChange}
            />
            {questionToEdit.options.map((option, index) => (
              <label key={index}>
                옵션 {index + 1}:
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </label>
            ))}
            <label className={Styles.lab}>
              정답:
              <select
                name="answer"
                value={
                  questionToEdit.answer === null
                    ? ""
                    : String(questionToEdit.answer)
                }
                onChange={handleChange}
              >
                <option value="" disabled>
                  문제를 선택해주세요
                </option>
                {questionToEdit.options.map((option, index) => (
                  <option value={String(index)} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            {/* 
             <label htmlFor="photo">사진 업로드</label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={(e) =>
                setQuestionToEdit({
                  ...questionToEdit,
                  photo: e.target.files[0],
                })
              }
            />
            */}

            <button className={Styles.filesavebtn} type="submit">
              <i className={Styles.icon}>
                <FontAwesomeIcon icon={faCheck} />
              </i>{" "}
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Quiz;
