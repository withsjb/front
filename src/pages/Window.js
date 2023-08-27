import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Styles from "../styles/Linux.module.css";

const App = () => {
  const [linuxFiles, setLinuxFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [newFileConcept, setNewFileConcept] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 파일 목록 가져오기
    fetchWinFiles();
  }, []);

  const fetchWinFiles = () => {
    axios
      .get("http://localhost:4000/win/files")
      .then((response) => {
        setLinuxFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddFile = () => {
    addFile();
  };

  const addFile = () => {
    // 새로운 파일 추가 요청
    axios
      .post("http://localhost:4000/win/files", {
        name: newFileName,
      })
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        const fileId = response.data._id; // 파일 ID 추출 (수정된 부분)
        // 파일 추가 후 파일 목록 갱신
        fetchWinFiles();
        setNewFileName("");

        // useNavigate를 사용하여 파일로 이동
        navigate(`/window/${fileId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={Styles.body}>
      <div>
        <h2 className={Styles.title}>Linux Contents</h2>
        <div className={Styles.inp_form}>
          <input
            className={Styles.input}
            type="text"
            placeholder=" 학습할 내용 제목 입력"
            value={newFileName}
            onChange={(event) => setNewFileName(event.target.value)}
          />

          <button className={Styles.btn} onClick={handleAddFile}>
            {" "}
            추가하기{" "}
          </button>
        </div>
        <div className={Styles.form_con}>
          <ul>
            {linuxFiles.map((file) => (
              <li className={Styles.contents} key={file._id}>
                <button
                  className={Styles.con_btn}
                  onClick={() => navigate(`/window/${file._id}`)}
                >
                  {file.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
