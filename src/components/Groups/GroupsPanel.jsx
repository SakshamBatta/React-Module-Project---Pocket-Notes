/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./GroupsPanel.css";
import { GroupContext } from "../../Context/GroupContext";

export default function GroupsPanel() {
  const {
    groups,
    activeGroup,
    setActiveGroup,
    getInitials,
    isMobile,
    setShowRightPanel,
    setShowLeftPanel,
  } = useContext(GroupContext);

  return (
    <>
      <div className="group-collection">
        {groups.map((grp) => (
          <div
            key={grp.id}
            className="group-div"
            onClick={() => {
              setActiveGroup(grp);
              if (isMobile) {
                setShowLeftPanel(false);
                setShowRightPanel(true);
              }
            }}
            style={{
              backgroundColor: grp === activeGroup ? "#DCDCDC" : "transparent",
            }}
          >
            <div className="inner-grp-div">
              <p className="group-logo" style={{ backgroundColor: grp.color }}>
                {getInitials(grp.name).toUpperCase()}
              </p>
              <h3 className="group-name">{grp.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
