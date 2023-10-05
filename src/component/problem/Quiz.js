import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import Styles from "../../styles/WindowsQuizmain.module.css";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/FetchQuestion";
import { PushAnswer } from "../../hooks/setResult";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

/** redux store import */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  /** next button event handler */
  function onNext() {
    if (trace < queue.length) {
      /** increase the trace value by one using MoveNextAction */
      dispatch(MoveNextQuestion());

      /** insert a new result in the array.  */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    /** reset the value of the checked variable */
    setChecked(undefined);
  }

  /** Prev button event handler */
  function onPrev() {
    if (trace > 0) {
      /** decrease the trace value by one using MovePrevQuestion */
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
    console.log(check);
  }

  /** finished exam after the last question */
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <>
      <Navbar />
      <div className={Styles.container}>
        <h1 className={Styles.title}> Windows 시험</h1>

        {/* display questions */}
        <Questions onChecked={onChecked} />
        <div className={Styles.grid}>
          {trace > 0 ? (
            <button className={Styles.prevbtn} onClick={onPrev}>
              <i className={Styles.icon}>
                <FontAwesomeIcon icon={faCaretLeft} />
              </i>{" "}
              Prev
            </button>
          ) : (
            <div></div>
          )}
          <button className={Styles.nextbtn} onClick={onNext}>
            Next <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>
      </div>
    </>
  );
}
