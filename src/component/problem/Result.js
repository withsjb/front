import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Styles from "../../styles/result.module.css";
import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../../helper/helper";

/** import actions  */
import { resetAllAction } from "../../redux/question_reducer";
import { resetResultAction } from "../../redux/result_reducer";
import { usePublishResult } from "../../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  /** store user result */
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed" : "Failed",
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Quiz Application</h1>

      <div className={Styles.flexcenter}>
        <div className={Styles.flex}>
          <span>Username</span>
          <span className={Styles.bold}>{userId || ""}</span>
        </div>
        <div className={Styles.flex}>
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className={Styles.flex}>
          <span>Total Questions : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className={Styles.flex}>
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className={Styles.flex}>
          <span>Total Earn Points : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className={Styles.flex}>
          <span>Quiz Result</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className={Styles.bold}
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className={Styles.start}>
        <Link className={Styles.btn} to={"/quizmain"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      <div className={Styles.container}>
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
