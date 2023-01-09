import React, { useState } from "react";

import Dropdown from "./Dropdown";
import Button from "./Button";
import "./DropBox.css";

const options = [
    { id: 1, item: "객관식" },
    { id: 2, item: "주관식" },
    { id: 3, item: "체크박스" },
  ];

  const DropBox = () => {
  const [selectedOpt, setSelectedOpt] = useState("");

  return (
    <div className="container">
      <Dropdown selectedOpt={selectedOpt} setSelectedOpt={setSelectedOpt} options={options} />
      <Button>+ 추가</Button>
    </div>
  );
};

export default DropBox;
