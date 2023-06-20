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
            <img src="images/logo.png"></img>
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
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            OS
            <ul className={Styles.dropmenu}>
              <Link to="/test">
                {" "}
                <li>개념 정리</li>{" "}
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            Quiz
            <ul className={Styles.dropmenu}>
              <Link to="/quizmain">
                {" "}
                <li>문제 풀이</li>{" "}
              </Link>
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
            <li className={Styles.navli}>login</li>
          </Link>
          <button onClick={logOut}>Log out</button>
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
