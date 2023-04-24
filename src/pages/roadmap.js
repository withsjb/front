import React, { useState } from "react";
import Navbar from "../component/Navbar";
import Styles from "../styles/Roadmap.module.css";
import Roadmapdetail from "../component/Roaddetail/Roaddetail";
import Roaddetaila from "../component/Roaddetail/Roaddetaila";
import Roaddetailb from "../component/Roaddetail/Roaddetailb";
import Roaddetailc from "../component/Roaddetail/Roaddetailc";
import Roaddetaild from "../component/Roaddetail/Roaddetaild";

export default function Roadmap() {
  const [visiblea, setVisiblea] = useState(true);
  const [visibleb, setVisibleb] = useState(false);
  const [visiblec, setVisiblec] = useState(false);
  const [visibled, setVisibled] = useState(false);
  const [visiblee, setVisiblee] = useState(false);
  const [bot, setBot] = useState(true);

  return (
    <div className={Styles.body}>
      <Navbar />
      <div className={Styles.road}>
        <div className={Styles.abside}></div>
        <div
          className={Styles.pagea}
          onClick={() => {
            setBot(false);
            setVisiblea(!visiblea);
            setVisibleb(false);
            setVisiblec(false);
            setVisibled(false);
            setVisiblee(false);
          }}
        >
          <h2> stage 1 </h2>
          <br /> <h3>Introduce </h3>
          <p>
            여러분들이 저희 사이트를 통해 알아갈 수 있는것을 설명합니다. 다른
            강좌를 보기전에 참고하시면 이후의 과정이 편해집니다.
          </p>
        </div>
        <div className={Styles.bcside}></div>
        <div
          className={Styles.pageb}
          onClick={() => {
            setBot(false);
            setVisiblea(false);
            setVisibleb(!visibleb);
            setVisiblec(false);
            setVisibled(false);
            setVisiblee(false);
          }}
        >
          <h2> stage 2</h2>
          <br /> <h3>리눅스 구조 </h3>
          <p>
            리눅스의 구조에 무엇이 있는지 설명합니다 여러분들이 공부하는데 있어
            기본적으로 알아야 할 것들을 개발진들이 모와놓았습니다.
          </p>
        </div>

        <div className={Styles.cdside}></div>
        <div
          className={Styles.pagec}
          onClick={() => {
            setBot(false);
            setVisiblea(false);
            setVisibleb(false);
            setVisiblec(!visiblec);
            setVisibled(false);
            setVisiblee(false);
          }}
        >
          <h2>stage 3</h2>
          <br />
          <h3> 설치가이드 페이지</h3>{" "}
          <p>
            여러분들이 리눅스를 설치하는것을 도와드립니다. 강좌를 보고 보다 쉽게
            리눅스 가상환경을 구현할 수 있습니다.
          </p>
        </div>
        <div className={Styles.deside}></div>
        <div
          className={Styles.paged}
          onClick={() => {
            setBot(false);
            setVisiblea(false);
            setVisibleb(false);
            setVisiblec(false);
            setVisibled(!visibled);
            setVisiblee(false);
          }}
        >
          <h2> stage 4</h2>
          <br />
          <h3> vi 편집기 사용법 </h3>{" "}
          <p>여기는 뭐라고 적어야할지 모르겠음 추후 추가예정</p>
        </div>
        <div
          className={Styles.pagee}
          onClick={() => {
            setBot(false);
            setVisiblea(false);
            setVisibleb(false);
            setVisiblec(false);
            setVisibled(false);
            setVisiblee(!visiblee);
          }}
        >
          <h2>stage 5</h2>
          <br />
          <h3>쉘 스크립트 기초 명령어 정리 </h3>
          <p>
            기초 명령어들을 배울 수 있습니다. 여기서 배운 명령어들은 여러분들이
            앞으로 linux를 이용함에 따라 유용하게 쓰일것입니다.
          </p>
        </div>
      </div>

      {bot && <div className={Styles.bot}></div>}
      {visiblea && <Roadmapdetail />}
      {visibleb && <Roaddetaila />}
      {visiblec && <Roaddetailb />}
      {visibled && <Roaddetailc />}
      {visiblee && <Roaddetaild />}
    </div>
  );
}
