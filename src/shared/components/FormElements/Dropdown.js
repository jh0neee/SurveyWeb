import React, { useState } from "react";

import "./Dropdown.css";

const options = [
  { id: 1, item: "객관식" },
  { id: 2, item: "주관식" },
  { id: 3, item: "체크박스" },
];

const Dropdown = ({ selectedOpt, setSelectedOpt }) => {
  const [isActive, setIsActive] = useState(false);

  const handleDropDown = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="dropbox-container">
      <div className="dropbox-select_btn" onClick={handleDropDown}>
        {selectedOpt === "" ? "선택해" : selectedOpt}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedOpt(option.item);
                setIsActive(false);
              }}
              className="dropdown-option"
            >
              {option.item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
