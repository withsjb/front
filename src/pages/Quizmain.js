import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import Styles from "../styles/Quizmain.module.css";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Quiz Application</h1>

      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points is awarded for the correct answer.</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and change answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form className={Styles.form} id="form">
        <input
          ref={inputRef}
          className={Styles.userid}
          type="text"
          placeholder="Username*"
        />
      </form>

      <div className={Styles.start}>
        <Link className={Styles.btn} to={"/quiz"} onClick={startQuiz}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
