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
      formData.append("concept", ""); // 컨셉이 비어 있을 때도 빈 문자열을 추가합니다.
      setUpdatedIndex(-1);
    } else {
      formData.append("concept", concept);
      setUpdatedIndex(-1);
    }

    if (content.trim() === "") {
      formData.append("content", "");
    } else {
      formData.append("content", content);
    }

    addContentAndPhoto(formData);
    if (concept.trim() === "" && content.trim() !== "") {
      setConcept(""); // 컨셉이 비어 있고 컨텐츠가 추가되었을 때 컨셉 입력 필드를 초기화합니다.
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
          setConcepts((prevConcepts) => [
            ...prevConcepts.slice(0, updatedIndex),
            concept,
            ...prevConcepts.slice(updatedIndex),
          ]);
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
    const definition = findMatchingTerm(term);
    setModalContent(definition);

    const spanElement = document.createElement("span");
    spanElement.style.color = "blue";
    const highlightedText = document.createTextNode(term);
    spanElement.appendChild(highlightedText);

    const wordElement = e.currentTarget; // 클릭된 단어가 있는 요소를 가져옴
    const wordParentElement = wordElement.parentElement; // 단어를 감싸는 상위 요소를 가져옴
    wordParentElement.appendChild(spanElement); // span 요소를 상위 요소에 추가하여 위치 정보를 얻음

    const rect = spanElement.getBoundingClientRect(); // 상위 요소의 위치와 크기 정보를 가져옴
    const { right, top } = rect;
    const modalLeft = right + 10; // 상위 요소의 오른쪽에서 10px 오른쪽으로 이동
    const modalTop = top; // 상위 요소의 상단을 그대로 유지

    wordParentElement.removeChild(spanElement); // 위치 정보를 얻은 후에 span 요소를 제거함

    const adjustedModalLeft = modalLeft - spanElement.offsetWidth; // 모달의 왼쪽 위치를 조정
    setModalPosition({ left: adjustedModalLeft, top: modalTop });
    setShowModal(true);
  };

  const hideDefinition = () => {
    setShowModal(false);
  };

  const handleNewEntrySubmit = (event) => {
    event.preventDefault();
    const contentWithHighlight = content.replace(
      new RegExp(`(${terms.map((term) => term.term).join("|")})`, "gi"),
      "<span style='color: blue'>$&</span>"
    );
    setContent(contentWithHighlight);
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
                {entry.concept}
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
                  dangerouslySetInnerHTML={{
                    __html: line.replace(
                      new RegExp(
                        `(${terms.map((term) => term.term).join("|")})`,
                        "gi"
                      ),
                      "<span style='color: blue'>$&</span>"
                    ),
                  }}
                />
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
