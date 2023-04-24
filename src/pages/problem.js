import React from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Problem.module.css";
import Modal from "../component/Modal";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className={Styles.main}>
      <Navbar />
      <div className={Styles.checkproblem}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>10</button>
        <button>11</button>
        <button>12</button>
        <button>13</button>
        <button>14</button>
        <button>15</button>
        <button>16</button>
        <button>17</button>
        <button>18</button>
        <button>19</button>
        <button>20</button>
        <div className={Styles.shortroom}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>

      <div className={Styles.container}>
        <h2>문제1</h2>

        <h3>다음에 빈 칸들어갈 말로 가장 알맞은 것은? </h3>
        <h3 className={Styles.hintarea}>
          💡 객관식 ( )을 하지않는 경우 공격자(해커)가 Telnet 등을 이용하여 접속
          가능여부 확인후 각종 공격(무작위 대입 공격, 사전 대입 공격 등)을 통해
          root 계정 정보를 획득 하고 시스템 계정 정보 유출, 파일 및 디렉터리
          변조 등의 침해사고를 발생시킬수 있다.
        </h3>
        <div className={Styles.problem}>
          <form>
            <span>1.</span>
            <label for="one">온라인 서비스 제한</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>2.</span>
            <label for="one">원격 접속 제한</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>3.</span>
            <label for="one">백신 설치</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>4.</span>
            <label for="one">패스워드 정책 설정</label>
            <input type="checkbox" id="one" name="one" />
          </form>
          <Modal />
          <button className={Styles.btn}>정답 제출</button>
        </div>
      </div>
      <div className={Styles.container}>
        <h2>문제2</h2>

        <h3>다음에 minlen 의미로 알맞은 것은? </h3>

        <div className={Styles.problem}>
          <form>
            <span>1.</span>
            <label for="one">
              이전에 사용하던 패스워드에서 사용한 문자 허용 금지 수 설정
            </label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>2.</span>
            <label for="one">최소 패스워드 길이</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>3.</span>
            <label for="one">대문자 최소 사용 수 설정</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>4.</span>
            <label for="one">특수문자 최소 사용수 설정</label>
            <input type="checkbox" id="one" name="one" />
          </form>
          <Modal />
          <button className={Styles.btn}>정답 제출</button>
        </div>
      </div>

      <div className={Styles.container}>
        <h2>문제3</h2>

        <h3>다음에 빈 칸들어갈 말로 가장 알맞은 것은? </h3>
        <h3 className={Styles.hintarea}>
          💡 ( )설정은 사용자가 로그인을 할 때 몇 번 이상 패스워드를 잘못
          입력했다면 계정을 잠금하는 것을 말한다.
        </h3>
        <div className={Styles.problem}>
          <form>
            <span>1.</span>
            <label for="one">계정 잠금 임계값</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>2.</span>
            <label for="one">패스워드 복합도</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>3.</span>
            <label for="one">대문자 최소 사용 수 </label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>4.</span>
            <label for="one">root 권한 </label>
            <input type="checkbox" id="one" name="one" />
          </form>
          <Modal />
          <button className={Styles.btn}>정답 제출</button>
        </div>
      </div>
      <div className={Styles.container}>
        <h2>문제4</h2>

        <h3>다음에 빈 칸들어갈 말로 가장 알맞은 것은? </h3>
        <h3 className={Styles.hintarea}>
          💡 객관식 ( )을 하지않는 경우 공격자(해커)가 Telnet 등을 이용하여 접속
          가능여부 확인후 각종 공격(무작위 대입 공격, 사전 대입 공격 등)을 통해
          root 계정 정보를 획득 하고 시스템 계정 정보 유출, 파일 및 디렉터리
          변조 등의 침해사고를 발생시킬수 있다.
        </h3>
        <div className={Styles.problem}>
          <form>
            <span>1.</span>
            <label for="one">온라인 서비스 제한</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>2.</span>
            <label for="one">원격 접속 제한</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>3.</span>
            <label for="one">백신 설치</label>
            <input type="checkbox" id="one" name="one" />
            <br />
            <span>4.</span>
            <label for="one">패스워드 정책 설정</label>
            <input type="checkbox" id="one" name="one" />
          </form>
          <Modal />
          <button className={Styles.btn}>정답 제출</button>
        </div>
      </div>

      <div className={Styles.short}>
        <h2>문제1</h2>
        <h3>다음 field②에 들어갈 말로 알맞은 말은? </h3>

        <img src="images/4번문제.jpg" />

        <div className={Styles.answerroom}>
          <form>
            <input
              className={Styles.shortanswer}
              type="text"
              placeholder="정답을 입력해주세요!."
            />
          </form>
          <button className={Styles.btna}>정답 제출</button>
        </div>
      </div>
      <div className={Styles.short}>
        <h2>문제2</h2>
        <h3>다음 파일에 들어갈 권한을 세자리 숫자로 적으시오 (ex: 000) </h3>
        <h3 className={Styles.hintarea}>
          /usr/bin/su 파일은 -rwxr-xr-— 의 권한을 숫자로 표시하시오.
        </h3>
        <div className={Styles.answerroom}>
          <form>
            <input
              className={Styles.shortanswer}
              type="text"
              placeholder="정답을 입력해주세요!."
            />
          </form>
          <button className={Styles.btna}>정답 제출</button>
        </div>
      </div>
      <div className={Styles.short}>
        <h2>문제3</h2>
        <h3>
          원격 컴퓨터의 파일시스템을 로컬 시스템에 마운트하여 마치 로컬
          파일시스템처럼 사용할 수 있는 프로그램을 무엇이라 하는가??{" "}
        </h3>
        <h3 className={Styles.hintarea}>
          A : NFS(Network File System) <br />
          원격 컴퓨터의 파일시스템을 로컬 시스템에 마운트하여 마치 로컬
          파일시스템처럼 사용할 수 있는 프로그램을 NFS라 합니다.
        </h3>
        <div className={Styles.answerroom}>
          <form>
            <input
              className={Styles.shortanswer}
              type="text"
              placeholder="정답을 입력해주세요!."
            />
          </form>
          <button className={Styles.btna}>정답 제출</button>
        </div>
      </div>
    </div>
  );
}
