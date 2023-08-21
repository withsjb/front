import { useEffect, useState } from "react";
import Styles from "../styles/dashboard.module.css";
import axios from "axios";

// Font Awesome 아이콘을 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faGlobe,
  faComments,
  faCameraRetro,
  faFilm,
  faBook,
  faCogs,
  faMapMarker,
  faInfo,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div>
      <div className={Styles.area}></div>
      <nav className={Styles["main-menu"]}>
        <ul>
          <li>
            <a href="https://jbfarrow.com">
              <FontAwesomeIcon
                icon={faHome}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Community Dashboard</span>
            </a>
          </li>
          <li className={Styles["has-subnav"]}>
            <a href="#">
              <FontAwesomeIcon
                icon={faGlobe}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Global Surveyors</span>
            </a>
          </li>
          <li className={Styles["has-subnav"]}>
            <a href="#">
              <FontAwesomeIcon
                icon={faComments}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Group Hub Forums</span>
            </a>
          </li>
          <li className={Styles["has-subnav"]}>
            <a href="#">
              <FontAwesomeIcon
                icon={faCameraRetro}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Survey Photos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faFilm}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Surveying Tutorials</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faBook}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Surveying Jobs</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faCogs}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Tools & Resources</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faMapMarker}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Member Map</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faInfo}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Documentation</span>
            </a>
          </li>
        </ul>

        <ul className={Styles.logout}>
          <li>
            <a href="#">
              <FontAwesomeIcon
                icon={faPowerOff}
                className={`${Styles["nav-icon"]} ${Styles["fa-2x"]}`}
              />
              <span className={Styles["nav-text"]}>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
