import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "../styles/testbed.module.css";
import Navbar from "../component/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretRight,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([]); //usestate로 변수 2개 설정 가능한듯
  const [userEmail, setUserEmail] = useState();
  const [role, setRole] = useState(null);
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editLink, setEditLink] = useState({ id: "", title: "", url: "" });

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (cookies.jwt) {
        try {
          const { data } = await axios.post(
            "/api",
            {},
            {
              withCredentials: true,
            }
          );
          if (data.status) {
            setUserEmail(data.user);
            setRole(data.role);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserEmail();
  }, [cookies]);

  const fetchLinks = async () => {
    try {
      const response = await axios.get("/api/testbedfile");
      setLinks(response.data);
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleAddLink = async () => {
    try {
      await axios.post("/api/testbedfile", newLink);
      setNewLink({ title: "", url: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const handleEditLink = async () => {
    try {
      await axios.put(`/api/testbedfile/${editLink.id}`, editLink);
      setEditLink({ id: "", title: "", url: "" });
      fetchLinks();
    } catch (error) {
      console.error("Error editing link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      await axios.delete(`/api/testbedfile/${id}`);
      fetchLinks();
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={Styles.tbedbody}>
        <h1 className={Styles.tbedtitle}>
          <i className={Styles.icon}>
            <FontAwesomeIcon icon={faClipboardList} />
          </i>{" "}
          Testbed File List
        </h1>
        <ul className={Styles.tbedul}>
          {links.map((link) => (
            <li className={Styles.tbedli} key={link._id}>
              <i className={Styles.checkicon}>
                <FontAwesomeIcon icon={faSquareCheck} />
              </i>
              <a
                className={Styles.tbedlink}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.title}
              </a>
              {/* 수정 버튼 */}
              {/* 
              <button
                className={Styles.teditbtn}
                onClick={() =>
                  setEditLink(
                    editLink.id === link._id
                      ? { id: "", title: "", url: "" }
                      : link
                  )
                }
              >
              
                Edit{" "}
                
                <i className={Styles.icon}>
                  <FontAwesomeIcon icon={faGear} />
                </i>
              </button>
              */}
              {/* 삭제 버튼 */}
              {role === "admin" && (
                <button
                  className={Styles.tdeletebtn}
                  onClick={() => handleDeleteLink(link._id)}
                >
                  Delete{" "}
                  <i className={Styles.icon}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </i>
                </button>
              )}
            </li>
          ))}
        </ul>

        {role === "admin" && (
          <div className={Styles.tbedadd}>
            <h3 className={Styles.tbedh3}>
              Add New Link{" "}
              <i className={Styles.linkicon}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </i>
            </h3>
            {/* 새 링크 입력 필드 */}
            <input
              className={Styles.linkaddtilte}
              type="text"
              placeholder="제목"
              value={newLink.title}
              onChange={(e) =>
                setNewLink({ ...newLink, title: e.target.value })
              }
            />
            <br></br>
            <input
              className={Styles.linkaddtext}
              type="text"
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            />{" "}
            <br></br>
            <button className={Styles.linkaddbtn} onClick={handleAddLink}>
              {" "}
              Add Link{" "}
              <i className={Styles.icon}>
                <FontAwesomeIcon icon={faUpload} />
              </i>
            </button>
          </div>
        )}
        {/* 수정 중인 링크 입력 필드 */}
        {editLink.id && (
          <>
            <h2>링크 수정</h2>
            <input
              type="text"
              placeholder="제목"
              value={editLink.title}
              onChange={(e) =>
                setEditLink({ ...editLink, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL"
              value={editLink.url}
              onChange={(e) =>
                setEditLink({ ...editLink, url: e.target.value })
              }
            />
            <button onClick={handleEditLink}>저장</button>
            {/* 수정 취소 버튼 */}
            <button onClick={() => setEditLink({})}>취소</button>
          </>
        )}
      </div>
    </>
  );
}

export default App;
