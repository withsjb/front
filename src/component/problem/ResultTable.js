import React, { useEffect, useState } from "react";
import Styles from "../../styles/result.module.css";
import { getServerData } from "../../helper/helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/result`, (res) => {
      setData(res);
    });
  });

  return (
    <div>
      <table>
        <thead className={Styles.tableheader}>
          <tr>
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr className={Styles.tablebody} key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achived || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
