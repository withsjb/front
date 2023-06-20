import React, { useState, useRef } from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Roadmap.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Roadmap() {
  const MAX_SECTION_COUNT = 5;
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef(null);
  const isAnimating = useRef(false);

  const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY);

    if (delta > 0 && currentSection < MAX_SECTION_COUNT - 1) {
      setCurrentSection((prevSection) => prevSection + 1);
      scrollToNextSection();
    }
  };

  const scrollToNextSection = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const sectionHeight = window.innerHeight;
    const targetScrollTop = sectionHeight * (currentSection + 1);
    const duration = 800;
    const start = containerRef.current.scrollTop;
    const distance = targetScrollTop - start;
    let startTime = null;

    const scrollAnimation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const scrollAmount = easeInOutQuad(
        elapsedTime,
        start,
        distance,
        duration
      );
      containerRef.current.scrollTop = scrollAmount;

      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation);
      } else {
        isAnimating.current = false;
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  // 이동 속도 조절을 위한 이징 함수
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  return (
    <>
      <Navbar />
      <div className={Styles.roadbody}>
        <video className={Styles.videoBackground} autoPlay muted loop>
          <source src="/videos/road10.mp4" type="video/mp4" />
        </video>
        <div
          className={Styles.roadmapdiv}
          ref={containerRef}
          onWheel={handleScroll}
        >
          <section className={Styles.section}>
            <div>
              <h1>Introduce</h1>
              <p>
                여러분들이 저희 사이트를 통해 알아갈 수 있는것을 설명하는
                로드맵입니다.
                <br />
                진행 순서를 표시하는 역할도 하니 로드맵 순서를 따라 진행하시는걸
                추천드립니다.
              </p>
            </div>
          </section>
          <section className={Styles.section}>
            <div>
              <h1>개념 설명</h1>
              <p>
                운영체제의 기본적인 개념들에 대해 무엇이 있는지 설명합니다
                여러분들이 공부하는데 있어 기본적으로 알아야 할 것들을
                개발진들이 모와놓았습니다.
              </p>

              <Link to="/test">
                <button className={Styles.roadbtn}>개념 보러가기</button>
              </Link>
            </div>
          </section>
          <section className={Styles.section}>
            <div>
              <h1>설치가이드</h1>
              <p>
                여러분들이 리눅스를 설치하는것을 도와드립니다. 강좌를 보고 보다
                쉽게 리눅스 가상환경을 구현할 수 있습니다.
              </p>
            </div>
          </section>
          <section className={Styles.section}>
            <div>
              <h1>vi 편집기 사용법</h1>
              <p>
                여러분들에 컴퓨터의 가상 환경 실습을 책임져줄 vi 편집기의 설치
                및 사용법을 알려드립니다.
              </p>
              <div className={Styles.roadimgbox}>
                <img
                  className={Styles.roadimg}
                  src="images/viinstall3.jpg"
                ></img>
                <img
                  className={Styles.roadimg}
                  src="images/viinstall2.jpg"
                ></img>
              </div>
            </div>
          </section>
          <section className={Styles.section}>
            <div>
              <h1>문제 풀이</h1>
              <p>
                여러분들이 공부한 개념을 학습하여 자신의 것이 되었는지 확인할
                시간입니다. 여러분의 실력을 테스트해주세여!
              </p>
              <Link to="/quizmain">
                <button className={Styles.roadbtn}>문제 풀이</button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
