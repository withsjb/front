import Styles from "../styles/Slidermain.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className={Styles.main}>
        <section className={Styles.slideshow}>
          <div className={Styles.slide}>
            <figure>
              <Link to="/WinStudy">
                <img src="images/os/window.jpg"></img>
              </Link>
              <p className={Styles.textb}>Window</p>
            </figure>
            <figure>
              <Link to="/LinStudy">
                <img src="images/os/linux.png"></img>
              </Link>
              <p className={Styles.textb}>linux</p>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/term.JPG"></img>
                <p className={Styles.textb}>Word Search</p>
              </Link>
            </figure>
            <figure>
              <Link to="/WindowsQuizmain">
                <img src="images/windowquiz.JPG"></img>
                <p className={Styles.textb}>Window Quiz</p>
              </Link>
            </figure>
            <figure>
              <Link to="/LinuxQuizmain">
                <img src="images/linuxquiz.JPG"></img>
                <p className={Styles.textb}>linux Quiz</p>
              </Link>
            </figure>
            <figure>
              <Link to="/roadmap">
                <img src="images/roadmapcap.JPG"></img>
                <p className={Styles.textb}>RoadMap</p>
              </Link>
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
}
