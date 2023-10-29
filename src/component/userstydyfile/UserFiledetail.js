import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../../styles/UserFiledetail.module.css";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const UserFileDetail = () => {
  const [file, setFile] = useState({
    concept: [],
    content: [],
    photo: [],
  });
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
  //수정
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedConcepts, setEditedConcepts] = useState([]);
  const [editedContents, setEditedContents] = useState([]);
  const [editedPhotos, setEditedPhotos] = useState([]);
  const [editedConcept, setEditedConcept] = useState(""); // 수정한 concept
  const [editedPhoto, setEditedPhoto] = useState(null); // 수정한 photo

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
        (concept) => concept !== null && concept.trim() !== ""
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
        console.log(terms);
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
            return `${photo}`;
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

  //수정파트
  // 수정 버튼을 누를 때 실행되는 함수

  // 수정 내용 저장 및 서버 업데이트 함수

  const findMatchingTerm = (word) => {
    const matchingTerm = terms.find(
      (term) => term.term.trim().toLowerCase() === word.trim().toLowerCase()
    );
    /*const matchingTerm = terms.find(
      (term) => term.term.toLowerCase() === word.toLowerCase()
    );*/
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
    concept: conceptItem !== null ? conceptItem : "",
    content: file.content[index],
    photo: photos[index] || "",
  }));

  const TextWithLinks = ({ text }) => {
    const linkRegex = /(http:\/\/|https:\/\/\S+)/g;

    // 링크를 찾아서 분리합니다.
    const parts = text.split(linkRegex);

    const textWithLinks = parts.map((part, index) => {
      if (part.match(linkRegex)) {
        // 링크인 경우, <a> 태그로 감싸서 하이퍼링크로 만듭니다.
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      } else if (part.includes("{") && part.includes("}")) {
        // {word} 형식의 부분을 찾습니다.
        const word = part.replace("{", "").replace("}", "");
        const matchingTerm = findMatchingTerm(word);

        if (matchingTerm) {
          // 매칭되는 용어가 있을 경우 하이퍼링크로 변환합니다.
          return (
            <a
              key={index}
              href={matchingTerm}
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>
          );
        } else {
          // 매칭되는 용어가 없을 경우 그대로 출력합니다.
          return part;
        }
      } else {
        // 일반 텍스트인 경우 그대로 출력합니다.
        return part;
      }
    });

    return <>{textWithLinks}</>;
  };

  return (
    <>
      <Navbar />
      <div className={Styles.filebody}>
        <div className={Styles.logobook}>
          <h2 className={Styles.filetitle}>
            {" "}
            Linux{" "}
            <i className={Styles.icon}>
              <FontAwesomeIcon icon={faChevronRight} />
            </i>
          </h2>
          <h3 className={Styles.filesub}>
            <i className={Styles.icon}>
              <FontAwesomeIcon icon={faBook} />
            </i>{" "}
            {file.name}
          </h3>
        </div>

        <div className={Styles.conceptList}>
          <ul>
            {concepts.map((concept, index) => (
              <li
                className={Styles.sideli}
                key={index}
                onClick={() => scrollToConcept(index + 1)}
              >
                {concept}
              </li>
            ))}
          </ul>
        </div>
        <div className={Styles.filecard}>
          {sortedEntries.map((entry, index) => (
            <div key={index} className={Styles.contentItem}>
              {entry.concept !== null && entry.concept.trim() !== "" && (
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
              <div className={Styles.filetext}>
                {entry.content !== null &&
                  entry.content.split("<br/>").map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      onMouseEnter={(e) => showDefinition(line, e)}
                      onMouseLeave={hideDefinition}
                    >
                      {line.split().map((word, wordIndex) => {
                        /*line.split("") 를 line.split() 이렇게 바꾸니까 띄어쓰기 인식됨 따로 알아봐야할듯*/
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
                          return (
                            <span key={wordIndex}>
                              <TextWithLinks text={word} />
                            </span>
                          );
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
                  <div
                    className={Styles.photoItem}
                    style={{ display: "none" }}
                  />
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
    </>
  );
};

export default UserFileDetail;
