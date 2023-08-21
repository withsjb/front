import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileText, setfileText] = useState();

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await axios.get("/api/testbedfile");
      setFileList(response.data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("zipfile", selectedFile);
      formData.append("filetext", fileText);

      try {
        await axios.post("/api/testbedfile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSelectedFile(null);
        fetchFileList();
      } catch (error) {
        console.error("Error uploading zip file:", error);
      }
    }
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`/api/testbedfile/${filename}`);
      fetchFileList();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <h1>압축 파일 업로드 및 삭제</h1>
      <input type="file" name="zipfile" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="파일 설명 입력"
        value={fileText}
        onChange={(event) => setfileText(event.target.value)}
      />
      <button onClick={handleUpload}>압축 파일 업로드</button>
      <h2>업로드된 파일 목록</h2>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            {file.filename}

            <a href={`/api/testbedfile/${file.filename}`} download>
              다운로드
            </a>
            {file.filetext}
            <button onClick={() => handleDelete(file.filename)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
