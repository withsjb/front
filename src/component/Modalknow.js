import React, { useState } from "react";
import Styles from "../styles/Modalknow.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Book from "./Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className={Styles.btn}>
        공부하러가기
      </button>
      {modal && (
        <div className={Styles.modal}>
          <div className={Styles.overlay}></div>
          <div className={Styles.modalcon}>
            <Book />

            <button className={Styles.close} onClick={toggleModal}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
