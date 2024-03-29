import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../styles/WindowQuizmain.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ } from "@fortawesome/free-solid-svg-icons";

/** Custom Hook */
import { useFetchQestion } from "../../hooks/WinFetchQuestion";
import { updateResult } from "../../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className={Styles.textlight}>isLoading</h3>;
  if (serverError)
    return (
      <h3 className={Styles.textlight}>{serverError || "Unknown Error"}</h3>
    );

  return (
    <div className={Styles.questions}>
      <h2 className={Styles.textlight}>
        {" "}
        <i className={Styles.icon}>
          <FontAwesomeIcon icon={faQ} /> .
        </i>{" "}
        {questions?.question}
      </h2>
      <h2 className={Styles.textlighta}>{questions?.text}</h2>

      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i} className={Styles.answerli}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className={Styles.textprimary} htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div className={Styles.check}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
