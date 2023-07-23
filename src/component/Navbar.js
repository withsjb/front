import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Styles from "../styles/Header.module.css";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useCookies } from "react-cookie";
import axios from "axios";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]); //usestate로 변수 2개 설정 가능한듯
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <nav className={Styles.navbar}>
        <Link to="/">
          <h3 className={Styles.logo}>
            <img src="images/logo1.png"></img>
          </h3>
        </Link>
        <ul
          className={Mobile ? Styles.navlinksmobile : Styles.navlinks}
          onClick={() => setMobile(false)}
        >
          <li className={Styles.navli}>
            roadmap
            <ul className={Styles.dropmenu}>
              <Link to="/roadmap">
                {" "}
                <li>roadmap</li>{" "}
              </Link>
              <Link to="/roadmap">
                {" "}
                <li>batch file</li>{" "}
              </Link>
              <Link to="/select">
                <li>select</li>
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            OS
            <ul className={Styles.dropmenu}>
              <Link to="/roadmap">
                {" "}
                <li>Windows 기초</li>{" "}
              </Link>
              <Link to="/linuxstudy">
                {" "}
                <li>Linux 기초</li>
              </Link>
              <Link to="/select">
                <li>Windows</li>
              </Link>
              <Link to="/select">
                <li>Linux</li>
              </Link>
              <Link to="/select">
                <li>Testbed</li>
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            Quiz
            <ul className={Styles.dropmenu}>
              <Link to="/quizmain">
                {" "}
                <li>wargame1</li>{" "}
              </Link>
              <Link to="/page1">
                {" "}
                <li>wargame1</li>{" "}
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            community
            <ul className={Styles.dropmenu}>
              <Link to="/">
                <li>community1</li>
              </Link>
              <li>community2</li>
              <li>community3</li>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            admin
            <ul className={Styles.dropmenu}>
              <Link to="/admin">
                {" "}
                <li>문제 수정</li>{" "}
              </Link>
              <Link to="/termadd">
                {" "}
                <li>단어 주입</li>{" "}
              </Link>
              <Link to="/Linux">
                {" "}
                <li>리눅스 개념추가</li>{" "}
              </Link>
            </ul>
          </li>

          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/login">
            <li onClick={logOut}>Logout</li>
          </Link>
        </ul>
        <button
          className={Styles.mobilemenu}
          onClick={() => setMobile(!Mobile)}
        >
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};

export default Navbar;
