/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { GroupContext } from "../../Context/GroupContext";
import { IoSend } from "react-icons/io5";
import "./Notes.css";
import NotesCard from "./NotesCard";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const {
    notes,
    setNotes,
    activeGroup,
    getInitials,
    notesContent,
    setNotesContent,
    isMobile,
    setShowLeftPanel,
    setShowRightPanel,
  } = useContext(GroupContext);

  const navigate = useNavigate();

  useEffect(() => {
    const storedNotes = localStorage.getItem("groupNotes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [setNotes]);

  useEffect(() => {
    localStorage.setItem("groupNotes", JSON.stringify(notes));
  }, [notes]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && notesContent.trim() !== "") {
      e.preventDefault();
      saveNote();
    }
  };

  const saveNote = () => {
    if (!notesContent.trim()) return;

    const newNote = {
      id: `note${Date.now()}`,
      text: notesContent,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = {
      ...notes,
      [activeGroup.id]: [...(notes[activeGroup.id] || []), newNote],
    };

    setNotes(updatedNotes);
    localStorage.setItem("groupNotes", JSON.stringify(updatedNotes));
    setNotesContent("");
  };

  return (
    <>
      <div className="notes-container">
        <div className="notes-header">
          <div className="notes-header-div">
            {isMobile && (
              <IoIosArrowRoundBack
                className="back-btn"
                onClick={() => {
                  setShowLeftPanel(true);
                  setShowRightPanel(false);
                }}
              />
            )}
            <p
              className="active-group-logo"
              style={{ backgroundColor: activeGroup.color }}
            >
              {getInitials(activeGroup.name).toUpperCase()}
            </p>
            <h3 className="active-group-name">{activeGroup.name}</h3>
          </div>
        </div>
        <div className="notes-content-area">
          <NotesCard />
        </div>
        <div className="notes-text-area">
          <textarea
            type="text"
            placeholder="Enter your text here..........."
            className="notes-input-box"
            value={notesContent}
            onChange={(e) => setNotesContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IoSend
            className="send-icon"
            style={{ color: notesContent.trim() ? "#001f8b" : "gray" }}
            onClick={saveNote}
          />
        </div>
      </div>
    </>
  );
}
