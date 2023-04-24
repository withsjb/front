import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Slide from "../component/Slidemain";
import Styles from "../styles/Main.module.css";

import React, { Component, useEffect, useState } from "react";

export default function Mainpage() {
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(window.scrollY);
    console.log(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={Styles.body}>
      <Navbar />
      <div className={Styles.main}>
        <div className={Styles.top}>
          <div className={Styles.topglass}>
            <img src="images/hackera.jpg"></img>
          </div>
          <h1 className={Styles.toptex}>welcome</h1>
          <p className={Styles.topp}>
            If you want useful tutorials and fun problems to solve please go
            down
          </p>
        </div>
        <div
          className={Styles.bottoma}
          style={{
            opacity: (position - 572) / 10,
          }}
        >
          <div className={Styles.botaleft}>
            <img src="images/road.png"></img>
          </div>
          <div className={Styles.botaright}>
            <h1>로드맵으로 정해진 교육과정을 만나보세요!</h1>
            <p>
              여러분들이 어떻게 공부를 해야 할지 당황스럽지 않게 로드맵을
              따라가보세요!
            </p>
            <button className={Styles.btn}>로드맵으로</button>
          </div>
        </div>
        <div
          className={Styles.bottoma}
          style={{
            opacity: (position - 954) / 5,
          }}
        >
          <div className={Styles.botbleft}>
            <h1>워게임으로 실력을 향샹시켜보세요!</h1>
            <p>
              여러분들이 지금까지 배워온 지식을 시험해볼 차례입니다. 기출문제를
              풀어보세요!
            </p>
            <button className={Styles.btn}>워게임으로</button>
          </div>
          <div className={Styles.botaright}>
            <img src="images/wargame.png"></img>
          </div>
        </div>
        <div
          className={Styles.bottoma}
          style={{
            opacity: (position - 1718) / 5,
          }}
        >
          <div className={Styles.botaleft}>
            <img src="images/chat2.png"></img>
          </div>
          <div className={Styles.botaright}>
            <h1>자유로운 소통으로 문제를 공유해요!</h1>
            <p>여러분들이 배운 지식을 다른 사람들과 자유롭게 공유해봐요!</p>
            <button className={Styles.btn}>
              <Link to="/"></Link>
              게시판으로
            </button>
          </div>
        </div>
        <div className={Styles.middle}>
          <div className={Styles.middleleft}>
            <Slide />
          </div>
        </div>
        <div className={Styles.cardroom}>
          <div className={Styles.card}>
            <div className={Styles.glass}></div>
            <div className={Styles.text}>
              <h2>기본부터</h2>
              <p>
                복잡하거나 어려운 개념도 이해하기 쉽게 상세한 설명을 제공하고
                단계별로 문제를 풀어가면서 계단을 오르듯 차근차근 성장하는 것을
                느낄 수 있습니다!
              </p>
            </div>
          </div>
          <div className={Styles.card}>
            <div className={Styles.glass}></div>
            <div className={Styles.text}>
              <h2>각각의 OS에 특화</h2>
              <p>
                출제진들의 심혈을 기울인 문제들로 인해 unix window등의 다른
                운영체제 취약점 문제를 풀어볼 수 있습니다.{" "}
              </p>
            </div>
          </div>
          <div className={Styles.card}>
            <div className={Styles.glass}></div>
            <div className={Styles.text}>
              <h2>함께하는 즐거움</h2>
              <p>
                커뮤니티 시스템으로 인한 자유로운 소통으로 입문자들이 전문가들의
                도움을 손쉽게 받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
