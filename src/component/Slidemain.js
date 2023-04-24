import Styles from "../styles/Slidermain.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className={Styles.main}>
        <section className={Styles.slideshow}>
          <div className={Styles.slide}>
            <figure>
              <Link to="/">
                <img src="images/os/window.jpg"></img>
              </Link>
              <p className={Styles.textb}>Window</p>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/os/linux.png"></img>
              </Link>
              <p className={Styles.textb}>linux</p>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/os/unix.jpg"></img>
                <p className={Styles.textb}>unix</p>
              </Link>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/road.png"></img>
                <p className={Styles.textb}>문제1</p>
              </Link>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/road.png"></img>
                <p className={Styles.textb}>문제2</p>
              </Link>
            </figure>
            <figure>
              <Link to="/">
                <img src="images/road.png"></img>
                <p className={Styles.textb}>NextShop</p>
              </Link>
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
}
