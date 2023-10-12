import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import Styles from "../styles/WindowsQuizmain.module.css";
import Navbar from "../component/Navbar";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <>
      <Navbar />
      <div className={Styles.Qbackground}>
        <div className={Styles.container}>
          <h1 className={Styles.title}>Windows Quiz</h1>
          <img className={Styles.Questionimg} src="images/Q12.png"></img>

          <img className={Styles.Questionimg2} src="images/Q22.jpg"></img>
          <div className={Styles.subtitle}>
            <li> 5 문항이 출제되며 문제당 10점씩 입니다.</li>
            <li>OX퀴즈와 객관식(4지선다)형 문제가 출제됩니다.</li>
            <li> 답안 제출시 점수와 합격, 불합격 여부를 보여줍니다.</li>
          </div>

          <form className={Styles.userform} id="form">
            <input
              ref={inputRef}
              className={Styles.userid}
              type="text"
              placeholder="Username*"
            />
          </form>

          <div className={Styles.start}>
            <Link
              className={Styles.startbtn}
              to={"/WinQuiz"}
              onClick={startQuiz}
            >
              Start !!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
