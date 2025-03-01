import "./Home.css";
import Plus from "../../assets/plus-btn.png";
import BgImg from "../../assets/bg-img.png";
import Lock from "../../assets/Vector.png";
import GroupsPanel from "../Groups/GroupsPanel";
import { useContext, useEffect } from "react";
import Modal from "../Modal/Modal";
import { GroupContext } from "../../Context/GroupContext";
import Notes from "../Notes/Notes";
import { toast } from "react-toastify";

export default function Home() {
  const {
    showModal,
    setShowModal,
    groups,
    setGroups,
    activeGroup,
    isMobile,
    setIsMobile,
    showLeftPanel,
    setShowLeftPanel,
    showRightPanel,
    setShowRightPanel,
  } = useContext(GroupContext);

  // localStorage.removeItem("groups");

  useEffect(() => {
    const storedGroups = localStorage.getItem("groups");
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 480;
      setIsMobile(mobileView);
      if (!mobileView) {
        setShowLeftPanel(true);
        setShowRightPanel(true);
      } else {
        setShowLeftPanel(true);
        setShowRightPanel(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addGroup = (newGroup) => {
    const existingGroup = groups.some((group) => group.name === newGroup.name);

    if (existingGroup) {
      return toast.error("Group already exists!", { position: "top-right" });
    }
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    localStorage.setItem("groups", JSON.stringify(updatedGroups));
  };

  return (
    <>
      <div className="container">
        {showLeftPanel && (
          <div className="left-panel">
            <span className="pn-heading">Pocket Notes</span>
            <GroupsPanel />
            <div className="add-grp">
              <img
                src={Plus}
                alt=""
                className="plus-img"
                onClick={() => setShowModal(true)}
              />
            </div>
            {isMobile && showModal && (
              <Modal
                closeModal={() => setShowModal(false)}
                addGroup={addGroup}
              />
            )}
          </div>
        )}
        {showRightPanel && (
          <div className="right-panel">
            {activeGroup ? (
              <Notes />
            ) : (
              <div className="bg-div">
                <img src={BgImg} alt="" className="bg-img" />
                <span className="bg-heading">Pocket Notes</span>
                <p className="bg-para">
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone
                </p>
                <div className="footer">
                  <img src={Lock} alt="" className="footer-img" />
                  <span className="footer-text">end-to-end encrypted</span>
                </div>
              </div>
            )}
            {showModal && (
              <Modal
                closeModal={() => setShowModal(false)}
                addGroup={addGroup}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
