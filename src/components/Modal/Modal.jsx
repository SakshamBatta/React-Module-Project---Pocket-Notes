/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import "./Modal.css";
import { GroupContext } from "../../Context/GroupContext";

export default function Modal({ closeModal, addGroup }) {
  const { newGroup, setNewGroup, selectedColor, setSelectedColor } =
    useContext(GroupContext);

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const handleSubmit = () => {
    addGroup({
      id: Date.now().toString(),
      name: newGroup,
      color: selectedColor,
    });
    setNewGroup("");
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-bg")) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [closeModal]);
  return (
    <>
      <div className="modal-bg">
        <div className="modal-container">
          <span className="modal-heading">Create New group</span>
          <div className="input-box">
            <p className="input-label">Group Name</p>
            <input
              type="text"
              placeholder="Enter group name"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="group-input"
            />
          </div>
          <div className="color-pallete">
            <p className="color-heading">Choose colour</p>
            {colors.map((color) => (
              <span
                key={color}
                className={`color-box ${
                  color === selectedColor ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              ></span>
            ))}
          </div>
          <button onClick={handleSubmit} className="modal-btn">
            Create
          </button>
        </div>
      </div>
    </>
  );
}
