/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [selectedColor, setSelectedColor] = useState("#B38BFA");
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState({});
  const [notesContent, setNotesContent] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2);
  };
  return (
    <GroupContext.Provider
      value={{
        showModal,
        setShowModal,
        groups,
        setGroups,
        newGroup,
        setNewGroup,
        selectedColor,
        setSelectedColor,
        activeGroup,
        setActiveGroup,
        notes,
        setNotes,
        getInitials,
        notesContent,
        setNotesContent,
        isMobile,
        setIsMobile,
        showLeftPanel,
        setShowLeftPanel,
        showRightPanel,
        setShowRightPanel,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
