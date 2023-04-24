import React from "react";
import styled from "styled-components";
import Navbar from "../component/Navbar";
import Styles from "../styles/Linuxstudy.module.css";
import Side from "../component/Side";

const MiddleDiv = styled.div`
  div {
    height: 100%;
  }
`;

const Middle = () => {
  return (
    <MiddleDiv>
      <Navbar />
      <Side />
      <div className={Styles.body}>
        <h2>root 계정 원격 접속 제한</h2>
        <div className={Styles.card}>
          <form>
            <h2 id="1">학습개요</h2>
            <p>
              보통의 경우 서버실에서 콘솔(Console)로 작업을 하는 것보다
              사무실에서 Telnet, SSH 등을 이용하여 원격 연결 후 작업하는 경우가
              대부분입니다. 원격 로그인을 할 때 편의상 root 계정으로 바로
              로그인을 허용하고 사용하는 경우가 많으며 이는 보안상 문제가 발생할
              수 있습니다. 그 이유는 공격자(해커 등)들은 기본적으로 먼저 서버에
              Open 되어 있는 Port를 확인 후 Telnet나 SSH로 원격 접속이 가능한
              경우 각종 공격(무작위 대입 공격, 사전 대입 공격 등)을 통해 root
              계정 정보를 획득할 경우 시스템 계정 정보 유출, 파일 및 디렉터리
              변조 등의 침해사고를 발생시킬수 있습니다. **따라서** 시스템 정책에
              **root 계정**의 원격 터미널 접속 차단 설정이 적용되어 있는지
              점검을 통해 외부 비인가자의 root 계정 접근 시도를 원천적으로
              차단해보는 시간을 가지도록 하겠습니다. 판단 기준은 다음과
              같습니다. 보안 양호 : 원격 터미널 서비스를 사용하지 않거나, 사용시
              root 직접 접속을 차단한 경우. 보안 취약 : 원격 터미널 서비스 사용
              시 root 직접 접속을 허용한 경우.
            </p>
            <h2 id="2">점검 및 조치</h2>
            <h2>Telnet</h2>
            <p>
              점검은 다음과 같습니다. #cat /etc/pam.d/login cat 명령을 통해
              /etc/pam.d/login 설정을 확인합니다. auth requied
              /lib/security/pam_securetty.so 와 같이 설정되있는 것을
              확인해볼수있습니다. ※ /etc/securetty : Telnet 접속 시 root 접근
              제한 설정 파일“/etc/securetty” 파일 내 *pts/x 관련 설정이 존재하는
              경우 PAM 모듈 설정과 관계없이 root계정 접속을 허용하므로 반드시
              "securetty" 파일에서 pts/x 관련 설정 제거 필요합니다. #cat
              /etc/securetty pts/0 ~ pts/x 원격접속 제한을 위해 관련 설정이
              존재하지 않아야 합니다.
              <aside>
                💡 /etc/securetty는 root가 로그인이 가능한 터미널 목록(tty)을
                정의 해둔 것입니다.
              </aside>
              Telnet 접속 시 root 계정 로그인 제한은 /etc/securetty 파일에서
              설정합니다. /etc/securetty 파일은 root 계정이 로그인 가능한
              터미널의 종류를 나열한 파일로 [그림2]와 같이 터미널 리스트가
              등록되어 있습니다. 등록되어 있는 터미널 리스트의 내용은 아래와
              같으며, 각 터미널 옆에 있는 숫자는 동시에 연결할 수 있는 수를
              의미합니다.
              <aside>
                💡 1) console : 서버의 로컬 장치에서 연결되어 있는 입출력 장치
                2) pts/ (Pseudo-Terminal Slave) : 원격지에서 서버에 접속했을 때
                열리는 터미널 (참고: ptmx는 원격 접속을 위한 일종의 가상 tty로
                ptmx, ptm(Master), pts(Slave)로 구성) 3) vc/ (Virtual Console) :
                Xmanager와 같이 X Window를 이용하여 접속 4) tty/
                (TeleTYpewriter) : 서버와 직접 연결된 키보드 등을 통한 시리얼
                통신 포트
              </aside>
              vi 등 편집기 명령어를 이용하여 /etc/securetty 파일 열어 등록되어
              있는 터미널 리스트 중 pts/로 시작하는 모든 내용을 주석 또는 삭제한
              후 저장합니다. 이 설정을 통해 텔넷을 통한 원격접속을
              막을수있습니다. (#을 통해 주석 처리한 모습)
            </p>
            <h2 id="3">[SSH] (설치내용추가해야함) </h2>
            <p>
              점검은 다음과 같습니다. #cat /etc/sshd_config cat 명령을 통해
              /etc/pam.d/login 설정을 확인합니다. /etc/sshd_conifg 파일은
              ****SSH 관련 설정을 할수있습니다.**** PermitRootLogin은 root
              계정으로 로그인 시 허용 여부를 설정하는 값입니다. PermitRootLogin
              yes를 주석 처리하고 PermitRootLogin no로 설정함으로서 ssh을 통한
              원격 접속을 막을수 있습니다.
            </p>

            <h2 id="4">조치 요약</h2>
            <h2> [Telnet 서비스 사용시 원격제한 방법]</h2>
            <p>
              Step 1) “/etc/securetty” 파일에서 pts/0 ~ pts/x 설정 제거 또는,
              주석 처리Step 2) “/etc/pam.d/login” 파일 수정 또는, 신규 삽입
              (수정 전) #auth required /lib/security/pam_securetty.so (수정 후)
              auth required /lib/security/pam_securetty.so [SSH 서비스 사용시
              사용시 원격제한 방법 ] Step 1) vi 편집기를 이용하여
              “/etc/ssh/sshd_config” 파일 열기 Step 2) 아래와 같이 주석 제거
              또는, 신규 삽입 (수정 전) #PermitRootLogin Yes (수정 후)
              PermitRootLogin No 보안 컨설턴트 입장에서 매 서버마다 이러한 보안
              권장사항이 잘 이루어 져 있는지 일일히 확인하는 일은 너무
              비효율적이고 시간이 많이 걸릴 것 입니다. 그래서 이러한 과정을
              자동으로 해주어 효율적이고 시간을 줄여주는 방법을 사용합니다. 바로
              shell script를 돌려서 이러한 과정을 자동으로 해결하는 것입니다.
              shell script는 이러한 과정을 자동화 시킬 수 있습니다. 우리는
              이러한 과정을 자동화 시킬 수 있는 sell script를 매 챕터마다 하나씩
              만들어 볼 것입니다. - shell script:
              [유닉스](https://terms.naver.com/entry.nhn?docId=855454&ref=y)
              계열의 셸(shell)에서 사용되는 명령어들의 조합으로 구성되고
              운영체제의 명령 해석이기에 의해 실행되는 스크립트. shell script는
              여러가지 명령어들로 이루어져 있고 그 명령어들의 기반으로
              스크립트가 실행되는 구조입니다. Shell script 작성법은 다음과
              같습니다. 1. 스크립트 파일 생성: .sh 확장자를 가진 파일을
              생성합니다. 2. 스크립트 작성: 생성한 파일에 스크립트를 작성합니다.
              작성중인 스크립트는 일반적으로 프로그램과 같은 구조를 가지며,
              변수, 조건문, 반복문 등의 제어문과 함께 사용됩니다. 3. 실행 권한
              설정: 작성한 스크립트 파일에 실행 권한을 설정합니다. chmod
              명령어를 사용하여 파일에 실행 권한을 부여합니다. 4. 스크립트 실행:
              스크립트 파일을 실행합니다. 스크립트 파일을 실행하면 셸이 스크립트
              파일을 읽어들이고, 해당 스크립트 파일 안에 정의된 명령어를
              실행합니다. 5. 결과 확인: 스크립트 파일을 실행한 결과를
              확인합니다. 이러한 단계를 거쳐 shell script를 작성할 수 있습니다.
            </p>
            <div className={Styles.problem}>
              <h2>문제</h2>
              <p>
                다음에 빈 칸들어갈 말로 가장 알맞은 것은? 객관식 ( )을 하지않는
                경우 공격자(해커)가 Telnet등을 이용하여 접속 가능여부 확인후
                각종 공격(무작위 대입 공격, 사전 대입 공격 등)을 통해 root 계정
                정보를 획득 하고 시스템 계정 정보 유출, 파일 및 디렉터리 변조
                등의 침해사고를 발생시킬수 있다.
                <label>
                  <input type="checkbox" name="pro1" value="1" />
                  1. 온라인 서비스 제한{" "}
                </label>
                <label>
                  <input type="checkbox" name="pro1" value="2" />
                  2. 원격 접속 제한{" "}
                </label>
                <label>
                  <input type="checkbox" name="pro1" value="3" />
                  3. 백신 설치
                </label>
                <label>
                  <input type="checkbox" name="pro1" value="4" />
                  4. 패스워드 정책 설정{" "}
                </label>
                <button>
                  <input type="submit" value="Submit"></input>
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </MiddleDiv>
  );
};

export default Middle;
