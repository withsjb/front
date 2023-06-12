import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [linuxFiles, setLinuxFiles] = useState([]);
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");
  const [newFileConcept, setNewFileConcept] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에서 파일 목록 가져오기
    fetchLinuxFiles();
  }, []);

  const fetchLinuxFiles = () => {
    axios
      .get("/api/linux/files")
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
      .post("/api/linux/files", {
        name: newFileName,
      })
      .then((response) => {
        console.log(response.data); // 응답 데이터 확인
        const fileId = response.data._id; // 파일 ID 추출 (수정된 부분)
        // 파일 추가 후 파일 목록 갱신
        fetchLinuxFiles();
        setNewFileName("");

        // useNavigate를 사용하여 파일로 이동
        navigate(`/linux/${fileId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Linux Files</h2>
      <input
        type="text"
        placeholder="파일 이름"
        value={newFileName}
        onChange={(event) => setNewFileName(event.target.value)}
      />

      <button onClick={handleAddFile}>추가</button>
      <ul>
        {linuxFiles.map((file) => (
          <li key={file._id}>
            <button onClick={() => navigate(`/linux/${file._id}`)}>
              {file.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
