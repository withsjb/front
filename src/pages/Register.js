import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../styles/Login.module.css";

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate(); //링크 이동 로그인하면 메인으로 이동되게 36줄 부분으로 "/"로 이동
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" }); //데이터를 보내는 바디 부분
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true } //백에 cors랑 연동되는 부분 서로 다른 도메인에 요청을 보낼때 credential(쿠키첨부)정보 담아서 보내기
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/"); //err 가없어 else 로 빠지면 메인으로 가게
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className={Styles.body}>
      <div className={Styles.container}>
        <h2>Register Account</h2>
        <form className={Styles.forma} onSubmit={(e) => handleSubmit(e)}>
          <div className={Styles.formbox}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className={Styles.formbox}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account ?<Link to="/login"> Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
