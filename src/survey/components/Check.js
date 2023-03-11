import React, { useRef } from "react";

import "../styles/Check.css";

const Check = (props) => {
  const { checkQuestionId, checkOpt, setCheckOpt } = props;
  const checkOptId = useRef(1); // check option Id

  const onClickCheck = (id) => {
    const option = {
      id: checkOptId.current,
      value: "",
    };
    checkOptId.current += 1;

    // 옵션 추가 누르면 해당하는 CheckOpt의 [checkQuestionId]에 데이터 추가
    const checkOptArray = checkOpt.filter((item) => item.id === id);
    if (checkOptArray.length !== 0) {
      let new_ChkOpt = checkOptArray[0][id].concat(option);
      checkOptArray[0][id] = new_ChkOpt;
      setCheckOpt([...checkOpt]);
    } else {
      setCheckOpt([...checkOpt, { id: checkQuestionId, [id]: [option] }]);
    }
  };

  const onChangeCheck = (e, id, index) => {
    if (checkOpt !== undefined) {
      let optFindIndex = checkOpt.findIndex((item) => item.id === id);
      let copiedOpt = [...checkOpt];
      copiedOpt[optFindIndex][id][index].value = e.target.value;
      setCheckOpt(copiedOpt);
    }
  };

  const onDeleteCheck = (optArray, id, item) => {
    let optFindIndex = checkOpt.findIndex((item) => item.id === id);
    let copiedArray = [...checkOpt];
    const deletedArray = optArray[id].filter((opt) => opt.id !== item.id);
    copiedArray[optFindIndex][id] = deletedArray;
    setCheckOpt(copiedArray);
  };

  return (
    <React.Fragment>
      <div className="check-option">
        {checkOpt.map((elem) =>
          elem.id === checkQuestionId
            ? elem[checkQuestionId].map((item, index) => (
                <div key={`check-item-${item.id}`} className="check-item">
                  <input
                    value={item.value}
                    placeholder="옵션 입력해주세요"
                    onChange={(e) => onChangeCheck(e, checkQuestionId, index)}
                  />
                  <span
                    onClick={() => onDeleteCheck(elem, checkQuestionId, item)}
                  >
                    ❌
                  </span>
                </div>
              ))
            : null
        )}
      </div>
      <span onClick={() => onClickCheck(checkQuestionId)}>옵션추가</span>
    </React.Fragment>
  );
};

export default Check;
