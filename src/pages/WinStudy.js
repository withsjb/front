import React, { useEffect, useState } from "react";
import Styles from "../styles/LinStudy.module.css";
import Navbar from "../component/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faFile } from "@fortawesome/free-solid-svg-icons";

const FileLoader = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [windowFiles, setLinuxFiles] = useState([]);
  const [groupedDataAccount, setGroupedDataAccount] = useState([]);
  const [groupedDataService, setGroupedDataService] = useState([]);
  const [groupedDatafiledele, setGroupedDatafiledele] = useState([]);
  const [activeGroup, setActiveGroup] = useState({
    section: null,
    index: null,
  });

  const handlePartClick = (section, index) => {
    if (activeGroup.section === section && activeGroup.index === index) {
      setActiveGroup({ section: null, index: null }); // 동일한 항목을 클릭하면 비활성화
    } else {
      setActiveGroup({ section, index }); // 다른 항목을 클릭하면 활성화
    }
  };

  const handleSectionClick = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const fetchLinuxFiles = () => {
    axios
      .get("/api/win/files")
      .then((response) => {
        setLinuxFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchLinuxFiles();
  }, []);

  const filterAndGroupFiles = (keyword) => {
    const filteredFiles = windowFiles.filter((item) =>
      item.name.includes(keyword)
    );

    filteredFiles.sort((a, b) => {
      const numberA = parseInt(a.name.replace(/[^0-9]/g, ""), 10);
      const numberB = parseInt(b.name.replace(/[^0-9]/g, ""), 10);
      return numberA - numberB;
    });

    const groups = [];
    for (let i = 0; i < filteredFiles.length; i += 5) {
      groups.push(filteredFiles.slice(i, i + 5));
    }

    return groups;
  };

  useEffect(() => {
    setGroupedDataAccount(filterAndGroupFiles("보안관리"));
    setGroupedDataService(filterAndGroupFiles("서비스관리"));
    setGroupedDatafiledele(filterAndGroupFiles("로그관리"));
  }, [windowFiles]);

  return (
    <>
      <Navbar />
      <div className={Styles.root}>
        <div className={Styles.contentContainer}>
          <div className={Styles.sidebar}>
            <div className={Styles.sidebardiv}>
              <h2
                className={Styles.intro}
                onClick={() => handleSectionClick("보안관리")}
              >
                <i className={Styles.ulicon}>
                  <FontAwesomeIcon icon={faFile} />
                </i>{" "}
                보안관리
              </h2>
              {visibleSection === "보안관리" &&
                groupedDataAccount.map((group, groupIndex) => (
                  <h3
                    key={groupIndex}
                    onClick={() => handlePartClick("보안관리", groupIndex)}
                  >
                    보안관리 Part {groupIndex + 1}
                  </h3>
                ))}

              <h2
                className={Styles.intro}
                onClick={() => handleSectionClick("서비스관리")}
              >
                <i className={Styles.ulicon}>
                  <FontAwesomeIcon icon={faFile} />
                </i>{" "}
                서비스 관리
              </h2>
              {visibleSection === "서비스관리" &&
                groupedDataService.map((group, groupIndex) => (
                  <h3
                    key={groupIndex}
                    onClick={() => handlePartClick("서비스관리", groupIndex)}
                  >
                    서비스 관리 Part {groupIndex + 1}
                  </h3>
                ))}

              <h2
                className={Styles.intro}
                onClick={() => handleSectionClick("로그관리")}
              >
                <i className={Styles.ulicon}>
                  <FontAwesomeIcon icon={faFile} />
                </i>{" "}
                파일 및 디렉터리 관리
              </h2>
              {visibleSection === "로그관리" &&
                groupedDatafiledele.map((group, groupIndex) => (
                  <h3
                    key={groupIndex}
                    onClick={() => handlePartClick("로그관리", groupIndex)}
                  >
                    파일 및 디렉터리 관리 Part {groupIndex + 1}
                  </h3>
                ))}
            </div>
          </div>
          <i className={Styles.hicon}>
            {" "}
            <FontAwesomeIcon icon={faFileLines} />
          </i>{" "}
          <h2 className={Styles.testh2}>Window File List</h2>
          {groupedDataAccount.map((group, groupIndex) => (
            <div className={Styles.listdiv} key={groupIndex}>
              <ul
                className={Styles.filelist}
                style={{
                  display:
                    activeGroup.section === "보안관리" &&
                    activeGroup.index === groupIndex
                      ? "block"
                      : "none",
                }}
              >
                {group.map((item) => (
                  <li className={Styles.file} key={item._id}>
                    <Link
                      className={Styles.filelink}
                      to={`/window/user/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* "서비스관리" 및 "로그관리" 섹션도 비슷하게 구성될 것입니다. */}
          {groupedDataService.map((group, groupIndex) => (
            <div className={Styles.listdiv} key={groupIndex}>
              <ul
                className={Styles.filelist}
                style={{
                  display:
                    activeGroup.section === "서비스관리" &&
                    activeGroup.index === groupIndex
                      ? "block"
                      : "none",
                }}
              >
                {group.map((item) => (
                  <li className={Styles.file} key={item._id}>
                    <Link
                      className={Styles.filelink}
                      to={`/window/user/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {groupedDatafiledele.map((group, groupIndex) => (
            <div className={Styles.listdiv} key={groupIndex}>
              <ul
                className={Styles.filelist}
                style={{
                  display:
                    activeGroup.section === "로그관리" &&
                    activeGroup.index === groupIndex
                      ? "block"
                      : "none",
                }}
              >
                {group.map((item) => (
                  <li className={Styles.file} key={item._id}>
                    <Link
                      className={Styles.filelink}
                      to={`/window/user/${item._id}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={Styles.footer}>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default FileLoader;
