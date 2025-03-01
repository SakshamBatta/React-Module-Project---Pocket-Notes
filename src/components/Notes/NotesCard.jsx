import { useContext } from "react";
import { GroupContext } from "../../Context/GroupContext";
import "./NotesCard.css";

export default function NotesCard() {
  const { activeGroup, notes } = useContext(GroupContext);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date
      .toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", " •");
  };
  return (
    <>
      <div className="notes-card-container">
        {notes[activeGroup.id]?.map((note) => (
          <div key={note.id} className="note-card">
            <p className="note-text">{note.text}</p>
            <span className="note-date">{formatDate(note.createdAt)}</span>
          </div>
        ))}
      </div>
    </>
  );
}
