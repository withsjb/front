import React from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Problem.module.css";
import Modal from "../component/Modal";

export default function page1() {
  return (
    <div className={Styles.main}>
      <Navbar />

      <div className={Styles.problem}>
        <div className={Styles.container}>
          <h2>문제1</h2>

          <h3>
            다음에 빈 칸들어갈 말로 가장 알맞은 것은? 객관식 ( )을 하지않는 경우
            공격자(해커)가 Telnet등을 이용하여 접속 가능여부 확인후 각종
            공격(무작위 대입 공격, 사전 대입 공격 등)을 통해 root 계정 정보를
            획득 하고 시스템 계정 정보 유출, 파일 및 디렉터리 변조 등의
            침해사고를 발생시킬수 있다.
          </h3>
          <p>
            1. 온라인 서비스 제한
            <br /> 2. 원격 접속 제한
            <br /> 3. 백신 설치 <br />
            4. 패스워드 정책 설정
          </p>
          <Modal />
        </div>
      </div>
    </div>
  );
}
