import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Styles from "../styles/Navbar.module.css";
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
  const [userEmail, setUserEmail] = useState();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (cookies.jwt) {
        try {
          const { data } = await axios.post(
            "http://localhost:4000",
            {},
            {
              withCredentials: true,
            }
          );
          if (data.status) {
            setUserEmail(data.user);
            setRole(data.role);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserEmail();
  }, [cookies]);

  return (
    <>
      <nav className={Styles.navbar}>
        <Link to="/">
          <h3 className={Styles.logo}>
            <img src="../../images/logo1.png"></img>
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
            Studying
            <ul className={Styles.dropmenu}>
              <Link to="/WinStudy">
                {" "}
                <li>Windows 기초</li>{" "}
              </Link>
              <Link to="/LinStudy">
                {" "}
                <li>Linux 기초</li>
              </Link>

              <Link to="/testbed">
                <li>Testbed</li>
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            Quiz
            <ul className={Styles.dropmenu}>
              <Link to="/WindowsQuizmain">
                {" "}
                <li>Windows quiz</li>{" "}
              </Link>
              <Link to="/LinuxQuizmain">
                {" "}
                <li>Linux quiz</li>{" "}
              </Link>
            </ul>{" "}
          </li>

          <li className={Styles.navli}>
            community
            <ul className={Styles.dropmenu}>
              <Link to="/board">
                <li>자유게시판</li>
              </Link>
              <Link to="/QnAboard">
                <li>Q&A</li>
              </Link>
            </ul>{" "}
          </li>
          {role === "admin" && (
            <li className={Styles.navli}>
              admin
              <ul className={Styles.dropmenu}>
                <Link to="/windowproblem">
                  {" "}
                  <li>윈도우 문제 수정</li>{" "}
                </Link>
                <Link to="/linuxproblem">
                  {" "}
                  <li>리눅스 문제 수정</li>{" "}
                </Link>
                <Link to="/termadd">
                  {" "}
                  <li>단어 주입</li>{" "}
                </Link>
                <Link to="/window">
                  {" "}
                  <li>윈도우 개념추가</li>{" "}
                </Link>
                <Link to="/Linux">
                  {" "}
                  <li>리눅스 개념추가</li>{" "}
                </Link>
                <Link to="/testbed">
                  {" "}
                  <li>TestBed 추가</li>{" "}
                </Link>
              </ul>
            </li>
          )}
          <Link to="/login">
            <span>{userEmail || "로딩 중..."}</span>
          </Link>
          <Link to="/login">
            <li className={Styles.logOut} onClick={logOut}>
              Logout
            </li>
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
