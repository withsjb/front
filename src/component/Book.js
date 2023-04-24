import React from "react";
import Styles from "../styles/Book.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Book() {
  return (
    <>
      <div className={Styles.body}>
        <input type="checkbox" id="chec" className={Styles.checkboxcover} />
        <input type="checkbox" id="page1" className={Styles.checkboxpagea} />
        <input type="checkbox" id="page2" className={Styles.checkboxpageb} />
        <input type="checkbox" id="page3" className={Styles.checkboxpagec} />
        <input type="checkbox" id="page4" className={Styles.checkboxpaged} />

        <div className={Styles.book}>
          <div className={Styles.cover}>
            <label htmlFor="chec"></label>
          </div>

          <div className={Styles.pagea} id="page1">
            <div className={Styles.frontpage}>
              <p>page1</p>
              <label className={Styles.next} htmlFor="page1">
                <i>
                  <FontAwesomeIcon icon={faArrowRight} />
                </i>
              </label>
            </div>
            <div className={Styles.backpage}>
              <img src="images/linxa.jpg" />
              <label className={Styles.prev} htmlFor="page1">
                <i>
                  <FontAwesomeIcon icon={faArrowLeft} />{" "}
                </i>
              </label>
            </div>
          </div>

          <div className={Styles.pageb} id="page2">
            <div className={Styles.frontpage}>
              <h2>Linux는 어떻게 작동하나요?</h2>
              <p>
                OS를 자동차 엔진이라고 생각해 봅시다. 엔진은 자체적으로도
                작동하지만 변속기와 차축 및 바퀴에 연결되면 차를 움직일 수
                있습니다. 엔진이 제대로 작동하지 않으면 자동차는 움직이지 않게
                됩니다. Linux는 UNIX와 유사하게 설계되었으나 발전을 거듭하며
                전화기에서 슈퍼컴퓨터에 이르는 다양한 하드웨어에서 실행되고
                있습니다. 모든 Linux 기반 OS에는 하드웨어 리소스를 관리하는
                Linux 커널과 OS의 나머지를 구성하는 일련의 소프트웨어 패키지가
                포함되어 있습니다. 조직에서는 Linux OS를 Linux 서버에서
                실행하도록 선택할 수 있습니다. OS에는 무엇보다 GNU 툴과 같은
                일부 공통 핵심 구성 요소가 몇 가지 포함되어 있습니다. 이러한
                툴을 사용하여 커널에서 제공하는 리소스를 관리하고 추가
                소프트웨어를 설치하여 성능 및 보안 환경을 설정할 수 있습니다.
                이러한 모든 툴이 결합되어 기능적인 운영 체제를 구성합니다.
                Linux는 오픈소스 OS이므로 소프트웨어 조합은 Linux 배포판마다
                다를 수 있습니다.
              </p>
              <label className={Styles.next} htmlFor="page2">
                <i>
                  <FontAwesomeIcon icon={faArrowRight} />
                </i>
              </label>
            </div>
            <div className={Styles.backpage}>
              <img src="images/shall.png" />
              <label className={Styles.prev} htmlFor="page2">
                <i>
                  {" "}
                  <FontAwesomeIcon icon={faArrowLeft} />
                </i>
              </label>
            </div>
          </div>

          <div className={Styles.pagec} id="page3">
            <div className={Styles.frontpage}>
              <p>
                셸 스크립트(shell script)는 셸이나 명령 줄 인터프리터에서
                돌아가도록 작성되었거나 한 운영 체제를 위해 쓰인 스크립트이다.
                단순한 도메인 고유 언어로 여기기도 한다. 셸 스크립트가 수행하는
                일반 기능으로는 파일 이용, 프로그램 실행, 문자열 출력 등이 있다.
                셸 스크립트라는 말은 유닉스 셸을 위해 쓰인 스크립트를 말하는
                반면, command.com(도스)과 cmd.exe (윈도우) 명령 줄 스크립트는
                보통 배치 파일이라고 불리지만 이 글에는 두 개의 속성 모두를
                논한다. .sh라는 파일 확장자를 가진 파일이 특정 종류의 셸
                스크립트를 가리키는 것이 보통이지만, 대부분의 셸 스크립트는 파일
                확장자를 지니지 않는다.[
              </p>
              <label className={Styles.next} htmlFor="page3">
                <i>
                  <FontAwesomeIcon icon={faArrowRight} />
                </i>
              </label>
            </div>
            <div className={Styles.backpage}>
              <img src="images/cap.jpg" />
              <label className={Styles.prev} htmlFor="page3">
                <i>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </i>
              </label>
            </div>
          </div>

          <div className={Styles.paged} id="page4">
            <div className={Styles.frontpage}>
              <p>yes!!</p>
              <label className={Styles.next} htmlFor="page4">
                <i>
                  <FontAwesomeIcon icon={faArrowRight} />
                </i>
              </label>
            </div>
            <div className={Styles.backpage}>
              <img src="images/cap.jpg" />
              <label className={Styles.prev} htmlFor="page4">
                <i>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </i>
              </label>
            </div>
          </div>

          <div className={Styles.backcover}></div>
        </div>
      </div>
    </>
  );
}
