import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import Styles from "../styles/Login.module.css";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={Styles.body}>
      <div className={Styles.text_container}>
        <img className={Styles.text_img} src="images/logo1.png"></img>
        <div className={Styles.text_title}>
          {" "}
          가상 공간의 수호자, Cyber Gaurdian
        </div>
        <div className={Styles.text_contents}>
          Cyber Gaurdian은 취약점을 학습하는 사이트로,{" "}
        </div>
        <div>
          {" "}
          전공입문자나 비전공자와 같은 학생들을 대상으로 하여 보안에 대한 지식에
          보다 더 쉽게 접근 가능하고
        </div>
        <div>
          {" "}
          공부하고 실습해보며 커뮤니티에 지식을 나누고 실력을 향상할 수 있는
          공간입니다.
        </div>
      </div>
      <div className={Styles.container}>
        <div className={Styles.title}>
          <h2> Login </h2>
        </div>
        <form className={Styles.forma} onSubmit={(e) => handleSubmit(e)}>
          <div className={Styles.formbox}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder=" abcd@email.co.kr"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={Styles.formbox}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder=" *******"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className={Styles.libtn} type="submit">
            {" "}
            로그인{" "}
          </button>
          <span>
            계정이 없으신가요 ?<Link to="/register"> 등록하기 </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
