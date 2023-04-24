import React, { useState } from "react";
import Styles from "../styles/Modal.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className={Styles.btn}>
        힌트보기
      </button>
      {modal && (
        <div className={Styles.modal}>
          <div className={Styles.overlay}></div>
          <div className={Styles.modalcon}>
            <h2> 흰트는 </h2>
            <p>
              그렇고 그렇게 된 문제이다 그렇고 그렇게 된 문제이다 그렇고 그렇게
              된 문제이다 그렇고 그렇게 된 문제이다 그렇고 그렇게 된 문제이다
              그렇고 그렇게 된 문제이다 그렇고 그렇게 된 문제이다 그렇고 그렇게
              된 문제이다 그렇고 그렇게 된 문제이다
            </p>
            <button>
              <Link to="/page2"> 개념 다시 보기</Link>{" "}
            </button>
            <button className={Styles.close} onClick={toggleModal}>
              창 닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
