import React from "react";

import Navbar from "../../component/Navbar";
import Styles from "../select/select.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function select() {
  return (
    <div>
      <Navbar />

      <div className={Styles.body}>
        <div className={Styles.overlay}></div>
        <div className={Styles.book}>
          <div className={Styles.maincover}>
            <div className={Styles.cover}></div>
            <div className={Styles.coverbot}>
              <h2>
                Problem <span>Window</span>
              </h2>
              <span className={Styles.writer}>
                Desigend By <i>Muhammad Irshad</i>
              </span>
            </div>
          </div>
        </div>
        <div className={Styles.booka}>
          <div className={Styles.maincover}>
            <div className={Styles.covera}></div>
            <div className={Styles.coverbota}>
              <h2>
                Problem <span>Linux</span>
              </h2>
              <span className={Styles.writer}>
                Desigend By <i>Muhammad Irshad</i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
