import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../styles/Filedetail.module.css";

const FileDetail = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [concept, setConcept] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);

  const { fileId } = useParams();
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchFile();
    fetchTerms();
    fetchPhotos();
  }, []);

  const fetchFile = () => {
    axios
      .get(`/api/linux/files/${fileId}`)
      .then((response) => {
        setFile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchTerms = () => {
    axios
      .get("/api/terms")
      .then((response) => {
        setTerms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPhotos = () => {
    axios
      .get(`/api/linux/files/${fileId}/addphoto`)
      .then((response) => {
        const photoURLs = response.data.photos.map((photo) => {
          if (photo) {
            return `/api/uploads/${photo}`;
          } else {
            return ""; // 빈 문자열로 처리
          }
        });
        setPhotos(photoURLs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddContentAndPhoto = () => {
    const formData = new FormData();
    if (photo) {
      // 이미지 파일이 선택되었을 경우에만 FormData에 추가
      formData.append("photo", photo);
    }
    formData.append("concept", concept);
    formData.append("content", content);
    addContentAndPhoto(formData);
  };

  const addContentAndPhoto = (formData) => {
    axios
      .post(`/api/linux/files/${fileId}/addcontent`, formData)
      .then((response) => {
        console.log(response.data);
        setConcept("");
        setContent("");
        setPhoto("");
        fetchFile();
        fetchPhotos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const findMatchingTerm = (word) => {
    const matchingTerm = terms.find(
      (term) => term.term.toLowerCase() === word.toLowerCase()
    );
    return matchingTerm;
  };

  const showDefinition = (term, e) => {
    setModalContent(term.definition);
    const { clientX, clientY } = e;
    setModalPosition({ top: clientY + 10, left: clientX });
    setShowModal(true);
  };

  const hideDefinition = () => {
    setShowModal(false);
  };

  const handleNewEntrySubmit = (event) => {
    event.preventDefault();
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  const sortedEntries = file.concept.map((conceptItem, index) => ({
    concept: conceptItem,
    content: file.content[index],
    photo: photos[index] || "", // 이미지가 없을 경우에는 빈 문자열로 설정
  }));

  return (
    <div className={Styles.filebody}>
      <h2>{file.name}</h2>
      <input
        type="text"
        placeholder="컨셉 입력"
        value={concept}
        onChange={(event) => setConcept(event.target.value)}
      />
      <input
        type="text"
        placeholder="컨텐츠 입력"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileSelect}
      />

      <button onClick={handleAddContentAndPhoto}>컨텐츠 및 사진 추가</button>

      <div className={Styles.filecard}>
        {sortedEntries.map((entry, index) => (
          <div key={index} className={Styles.contentItem}>
            <div className={Styles.fileconceptdiv}>{entry.concept}</div>
            <div className={Styles.filediv}>
              {entry.content.split(" ").map((word, wordIndex) => {
                const term = findMatchingTerm(word);
                if (term) {
                  return (
                    <span
                      key={wordIndex}
                      style={{ color: "blue" }}
                      onMouseOver={(e) => showDefinition(term, e)}
                      onMouseOut={hideDefinition}
                    >
                      {word}{" "}
                    </span>
                  );
                } else {
                  return word + " ";
                }
              })}
            </div>
            <div className={Styles.photobox}>
              {entry.photo !== "null" && entry.photo ? (
                <div className={Styles.photoItem}>
                  <img
                    className={Styles.photos}
                    src={entry.photo}
                    alt={`Photo ${index + 1}`}
                  />
                </div>
              ) : (
                <div className={Styles.photoItem} style={{ display: "none" }} />
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div
          className={Styles.filemodal}
          style={{ top: modalPosition.top, left: modalPosition.left }}
        >
          {modalContent}
        </div>
      )}
    </div>
  );
};

export default FileDetail;
