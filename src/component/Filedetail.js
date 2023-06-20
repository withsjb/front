import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../styles/Filedetail.module.css";

const FileDetail = () => {
  const [file, setFile] = useState(null);
  const [concept, setConcept] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [concepts, setConcepts] = useState([]);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [timerId, setTimerId] = useState();

  const { fileId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFile();
    fetchTerms();
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (file) {
      const extractedConcepts = file.concept.filter(
        (concept) => concept.trim() !== ""
      );
      setConcepts(extractedConcepts);
    }
  }, [file]);

  const fetchFile = () => {
    axios
      .get(`/api/linux/files/${fileId}`)
      .then((response) => {
        const fetchedFile = response.data;
        if (fetchedFile.concept === null) {
          fetchedFile.concept = []; // concept가 null인 경우 빈 배열로 초기화
        }
        setFile(fetchedFile);
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
            return "";
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
      formData.append("photo", photo);
    }

    if (concept.trim() === "") {
      formData.append("concept", ""); // 새로운 컨셉 추가
    } else {
      formData.append("concept", concept);
    }

    if (content.trim() === "") {
      formData.append("content", "");
    } else {
      formData.append("content", content);
    }

    addContentAndPhoto(formData);
    if (concept.trim() === "" && content.trim() !== "") {
      setConcept("null"); // 컨셉 값이 비어있을 때 "null"로 업데이트
    }
  };

  const addContentAndPhoto = (formData) => {
    axios
      .post(`/api/linux/files/${fileId}/addcontent`, formData)
      .then((response) => {
        console.log(response.data);
        setFile(response.data);
        setConcept("");
        setContent("");
        setPhoto("");
        fetchPhotos();
        if (updatedIndex !== -1) {
          setConcepts((prevConcepts) => {
            const updatedConcepts = [...prevConcepts];
            if (concept.trim() === "") {
              updatedConcepts.splice(updatedIndex, 0, "null");
            } else {
              updatedConcepts.splice(updatedIndex, 0, concept);
            }
            return updatedConcepts;
          });
        }
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
    return matchingTerm ? matchingTerm.definition : "";
  };

  const showDefinition = (term, e) => {
    const matchingTerm = findMatchingTerm(term);
    if (matchingTerm) {
      setModalContent(matchingTerm);

      const wordElement = e.currentTarget;
      const wordParentElement = wordElement.parentElement;
      const { right, top } = wordElement.getBoundingClientRect();
      const modalLeft = right + 10;
      const modalTop = top;

      const adjustedModalLeft = modalLeft - wordElement.offsetWidth;
      setModalPosition({ left: adjustedModalLeft, top: modalTop });
      setShowModal(true);
    } else {
      hideDefinition(); // 추가된 부분: 일치하는 정의가 없는 경우 모달을 숨깁니다.
    }
  };

  const hideDefinition = (event) => {
    const modalElement = document.getElementById("modal");
    const isMouseOverModal =
      modalElement && modalElement.contains(event.target);
    if (!isMouseOverModal) {
      setShowModal(false);
    }
  };

  const scrollToConcept = (conceptIndex) => {
    const conceptElement = document.getElementById(`concept-${conceptIndex}`);
    if (conceptElement) {
      conceptElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  if (!file) {
    return <div>Loading...</div>;
  }

  const sortedEntries = file.concept.map((conceptItem, index) => ({
    concept: conceptItem,
    content: file.content[index],
    photo: photos[index] || "",
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
      <textarea
        className={Styles.contentbox}
        placeholder="컨텐츠 입력"
        value={content}
        onChange={(event) => {
          const value = event.target.value;
          const formattedValue = value.replace(/\r?\n/g, "\n");
          setContent(formattedValue);
        }}
      />

      <input
        type="file"
        accept="image/jpeg, image/jpg, image/png"
        onChange={handleFileSelect}
      />

      <button onClick={handleAddContentAndPhoto}>컨텐츠 및 사진 추가</button>

      <div className={Styles.conceptList}>
        <ul>
          {concepts.map((concept, index) => (
            <li key={index} onClick={() => scrollToConcept(index + 1)}>
              {concept}
            </li>
          ))}
        </ul>
      </div>
      <div className={Styles.filecard}>
        {sortedEntries.map((entry, index) => (
          <div key={index} className={Styles.contentItem}>
            {entry.concept.trim() !== "" && index !== updatedIndex && (
              <div
                className={Styles.fileconceptdiv}
                id={`concept-${index + 1}`}
              >
                {entry.concept !== "null" && entry.concept}
              </div>
            )}
            {entry.concept.trim() !== "" && index === updatedIndex && (
              <div
                className={Styles.fileconceptdiv}
                id={`concept-${index + 1}`}
              >
                {entry.concept}
              </div>
            )}
            <div className={Styles.filediv}>
              {entry.content.split("<br/>").map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  onMouseEnter={(e) => showDefinition(line, e)}
                  onMouseLeave={hideDefinition}
                >
                  {line.split(" ").map((word, wordIndex) => {
                    const matchingTerm = findMatchingTerm(word);
                    if (matchingTerm) {
                      return (
                        <span
                          key={wordIndex}
                          style={{ color: "blue" }}
                          onMouseEnter={(e) => showDefinition(word, e)}
                          onMouseLeave={hideDefinition}
                        >
                          {word}
                        </span>
                      );
                    } else {
                      return <span key={wordIndex}>{word}</span>;
                    }
                  })}
                </div>
              ))}
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
          className={Styles.modal}
          style={{ top: modalPosition.top, left: modalPosition.left }}
          onClick={hideDefinition}
        >
          {modalContent}
        </div>
      )}
    </div>
  );
};

export default FileDetail;
