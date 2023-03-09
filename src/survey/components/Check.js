import React, { useRef } from "react";

import "../styles/Check.css";

const Check = (props) => {
  const { checkQuestionId, checkbox, setCheckBox } = props;
  const checkId = useRef(1); // check option Id

  const onChangeCheck = (e, index) => {};

  const onClickCheck = (id) => {
    // 옵션 추가 누르면 checkQuestion의 option에 데이터 추가
    const option = {
      id: checkId.current,
      value: "",
    };
    checkId.current += 1;
    const a = checkbox.filter((opt) => opt.id === checkQuestionId);
    if (a.length !== 0) {
      const new_ChkOpt = a[0][id].concat(option);
      a[0][id] = new_ChkOpt;
      setCheckBox([...checkbox]);
    } else {
      setCheckBox([...checkbox, { id: checkQuestionId, [id]: [option] }]);
    }
  };

  return (
    <React.Fragment>
      <div className="check-option">
        {checkbox.map((elem) =>
          elem.id === checkQuestionId
            ? elem[checkQuestionId].map((item, index) => (
                <div key={item.id} className="check-item">
                  <input
                    value={item.value}
                    placeholder="옵션 입력해주세요"
                    onChange={(e) => onChangeCheck(e, index)}
                  />
                  <span
                    onClick={() => {
                      setCheckBox(
                        checkbox.filter((option) => option.id !== item.id)
                      );
                    }}
                  >
                    ❌
                  </span>
                </div>
              ))
            : null
        )}
      </div>
      <span
        className="add-option"
        onClick={() => onClickCheck(checkQuestionId)}
      >
        옵션추가
      </span>
    </React.Fragment>
  );
};

export default Check;
