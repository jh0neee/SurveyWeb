import React, { useState } from "react";

import "./Dropdown.css";

const Dropdown = ({ selectedOpt, setSelectedOpt, options }) => {
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
          {options.map((option) => 
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
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
