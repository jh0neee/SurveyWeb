import React, { useState, useRef } from "react";

import "../styles/Check.css";

const Check = () => {
  const checkId = useRef(1); // 추후 변경
  //const [checkOption, setcheckOption] = useState([]) //배열 안에 추가 버튼을 눌렀을 때 check 객체가 새롭게 추가된다
  const [check, setCheck] = useState([{ id: 0, value: "옵션 입력해주세요" }]); // 배열말고 애초부터 객체로 구성한다면?

  const onChangeCheck = (e, index) => {
    if (check !== undefined) {
      let new_checkArray = [...check];
      new_checkArray[index].value = e.target.value;
      setCheck(new_checkArray);
    }
  };

  const onClickCheck = () => {
    const option = {
      id: checkId.current,
      value: "",
    };
    setCheck([...check, option]);
    checkId.current += 1;
  };

  return (
    <React.Fragment>
      <div className="check-option">
        {check.map((item, index) => (
          <div key={item.id} className="check-item">
            <input
              value={item.value}
              onChange={(e) => onChangeCheck(e, index)}
            />
            <span
              onClick={() => {
                setCheck(check.filter((option) => option.id !== item.id));
              }}
            >
              ❌
            </span>
          </div>
        ))}
      </div>
      <span onClick={onClickCheck}>옵션추가</span>
    </React.Fragment>
  );
};

export default Check;
