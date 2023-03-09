import React, { useRef } from "react";

import "../styles/Check.css";

const Check = (props) => {
  const { checkQuestionId, checkOpt, setCheckOpt } = props;
  const checkOptId = useRef(1); // check option Id

  const onChangeCheck = (e, index) => {};

  const onClickCheck = (id) => {
    const option = {
      id: checkOptId.current,
      value: "",
    };
    checkOptId.current += 1;

    // 옵션 추가 누르면 해당하는 CheckOpt의 [checkQuestionId]에 데이터 추가
    const checkOptArray = checkOpt.filter((opt) => opt.id === checkQuestionId);
    if (checkOptArray.length !== 0) {
      const new_ChkOpt = checkOptArray[0][id].concat(option);
      checkOptArray[0][id] = new_ChkOpt;
      setCheckOpt([...checkOpt]);
    } else {
      setCheckOpt([...checkOpt, { id: checkQuestionId, [id]: [option] }]);
    }
  };

  return (
    <React.Fragment>
      <div className="check-option">
        {checkOpt.map((elem) =>
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
                      setCheckOpt(
                        checkOpt.filter((option) => option.id !== item.id)
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
