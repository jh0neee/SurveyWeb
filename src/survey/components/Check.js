import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkAction } from "../../store/check";

import "../styles/Check.css";

const Check = (props) => {
  const { checkQuestionId } = props;

  const dispatch = useDispatch();
  const checkOptions = useSelector((state) => state.check.checkOptions);

  const onClickCheck = (id) => {
    dispatch(checkAction.CREATE_CHECK(id));
  };

  const onChangeCheck = (e, id, index) => {
    dispatch(checkAction.CHANGE_CHECK({ optValue: e.target.value, id, index }));
  };

  const onDeleteCheck = (optArray, id, item) => {
    dispatch(checkAction.DELETE_CHECK({ optArray, id, item }));
  };

  return (
    <React.Fragment>
      <div className="check-option">
        {checkOptions.map((elem) =>
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
