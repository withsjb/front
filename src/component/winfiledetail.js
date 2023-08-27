import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "../styles/Filedetail.module.css";

const FileDetail = () => {
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
      .get(`http://localhost:4000/win/files/${fileId}`)
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
      .get("http://localhost:4000/terms")
      .then((response) => {
        setTerms(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPhotos = () => {
    axios
      .get(`http://localhost:4000/win/files/${fileId}/addphoto`)
      .then((response) => {
        const photoURLs = response.data.photos.map((photo) => {
          if (photo) {
            return `http://localhost:4000/uploads/${photo}`;
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
      .post(`http://localhost:4000/win/files/${fileId}/content`, formData)
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

  //수정파트
  // 수정 버튼을 누를 때 실행되는 함수
  const handleEdit = (index) => {
    setEditingIndex(index);

    // 수정한 내용을 복사해서 상태에 저장
    setEditedConcepts([...file.concept]);
    setEditedContents([...file.content]);
    setEditedPhotos([...file.photo]);

    // 현재 concept와 photo를 상태에 저장
    setEditedConcept(editedConcepts[index]);
    setEditedPhoto(editedPhotos[index]);
  };

  // 수정 내용 저장 및 서버 업데이트 함수
  const saveEditedContent = async (index) => {
    try {
      const updatedContent = editedContents[index]; // 수정한 컨텐츠 가져오기
      const updatedConcept = editedConcepts[index]; // 수정한 컨셉 가져오기
      const updatedPhoto = editedPhotos[index]; // 수정한 사진 가져오기

      const formData = new FormData();
      formData.append("content", updatedContent);
      formData.append("concept", updatedConcept);
      if (updatedPhoto) {
        formData.append("photo", updatedPhoto);
      }

      const response = await axios.put(
        `http://localhost:4000/win/files/${fileId}/content/${index}`,
        formData
      );

      if (response.status === 200) {
        setFile(response.data);
        setEditingIndex(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //삭제파트
  const handleDelete = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/win/files/${fileId}/content/${index}`
      );

      if (response.status === 200) {
        console.log({ index });
        const updatedFile = response.data;
        setFile(updatedFile);

        // 해당 인덱스의 컨셉 가져오기
        const concept = concepts[index];

        if (concept !== null) {
          // 이후 코드에서 concept 사용

          // 해당 인덱스의 컨셉을 null로 설정
          setConcepts((prevConcepts) => {
            const updatedConcepts = [...prevConcepts];
            updatedConcepts[index] = "";
            return updatedConcepts;
          });
          fetchFile();
        } else {
          console.log("Concept is already null at index", index);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

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
            {entry.concept !== null && entry.concept.trim() !== "" && (
              <div
                className={Styles.fileconceptdiv}
                id={`concept-${index + 1}`}
              >
                {entry.concept}
              </div>
            )}

            {editingIndex === index ? (
              <div className={Styles.editContainer}>
                {/* 수정 입력 필드 */}

                <input
                  type="text"
                  value={editedConcepts[index]}
                  onChange={(e) => {
                    const updatedEditedConcepts = [...editedConcepts];
                    updatedEditedConcepts[index] = e.target.value;
                    setEditedConcepts(updatedEditedConcepts);
                  }}
                />

                <textarea
                  value={editedContents[index]}
                  onChange={(e) => {
                    const updatedEditedContents = [...editedContents];
                    updatedEditedContents[index] = e.target.value;
                    setEditedContents(updatedEditedContents);
                  }}
                />

                {/* Concept 수정 입력 필드 */}

                {/* Photo 수정 입력 필드 */}
                <input
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  onChange={(e) => {
                    const newPhoto = e.target.files[0] || null;
                    const updatedPhotos = [...editedPhotos];
                    updatedPhotos[index] = newPhoto;
                    setEditedPhotos(updatedPhotos);
                  }}
                />

                <button onClick={() => saveEditedContent(index)}>Save</button>
              </div>
            ) : (
              <div className={Styles.someOtherClass}>
                {/* 이 부분은 조건이 거짓일 때 보여줄 내용 */}
                <button
                  className={Styles.someOther}
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(index)}>Delete</button>
                {editingIndex === index && (
                  <div className={Styles.editContainer}>
                    {/* 수정 입력 필드 */}
                    <textarea
                      value={editedContents[index]}
                      onChange={(e) => {
                        const updatedEditedContents = [...editedContents];
                        updatedEditedContents[index] = e.target.value;
                        setEditedContents(updatedEditedContents);
                      }}
                    />

                    {/* Concept 수정 입력 필드 */}
                    <input
                      type="text"
                      value={editedConcept}
                      onChange={(e) => setEditedConcept(e.target.value)}
                    />

                    {/* Photo 수정 입력 필드 */}
                    <input
                      type="file"
                      accept="image/jpeg, image/jpg, image/png"
                      onChange={(e) => setEditedPhoto(e.target.files[0])}
                    />

                    <button onClick={() => saveEditedContent(index)}>
                      Save
                    </button>
                  </div>
                )}
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
