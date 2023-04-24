import React from "react";

import Styles from "../styles/Libook.module.css";

export default function Libook() {
  return (
    <>
      <div className={Styles.body}>
        <section>
          <div className={Styles.libook}>
            <img src="images/os/linux.png" />
          </div>
        </section>
      </div>
    </>
  );
}
