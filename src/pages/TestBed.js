import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editLink, setEditLink] = useState({ id: "", title: "", url: "" });

  useEffect(() => {
    fetchLinks();
  }, []);

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
    <div>
      <h1>링크 관리</h1>
      <h2>링크 목록</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
            <button onClick={() => setEditLink(link)}>수정</button>
            <button onClick={() => handleDeleteLink(link._id)}>삭제</button>
          </li>
        ))}
      </ul>
      <h2>새 링크 추가</h2>
      <input
        type="text"
        placeholder="제목"
        value={newLink.title}
        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="URL"
        value={newLink.url}
        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
      />
      <button onClick={handleAddLink}>추가</button>
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
            onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
          />
          <button onClick={handleEditLink}>저장</button>
        </>
      )}
    </div>
  );
}

export default App;
