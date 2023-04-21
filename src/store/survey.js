import { createSlice } from "@reduxjs/toolkit";

const initialSurveyState = {
  questionItem: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState: initialSurveyState,
  reducers: {
    CREATE_SURVEY(state, action) {
      state.questionItem.push(action.payload);
    },
    CHANGE_INPUT(state, action) {
      const { id, inputValue } = action.payload;

      let copiedQusetionInput = [...state.questionItem];

      const existingSurv = copiedQusetionInput.find((item) => item.id === id);
      existingSurv.question = inputValue;
    },
    DELETE_SURVEY(state, action) {
      const id = action.payload;
      state.questionItem = state.questionItem.filter((surv) => surv.id !== id);
    },
    PULS_CHECK(state, action) {
      const chkopt = action.payload;
      let findIndex = state.questionItem.findIndex(
        (item) => item.id === chkopt.id
      );
      state.questionItem[findIndex].options = chkopt[chkopt.id];
    },
  },
});

export const surveyAction = surveySlice.actions;

export default surveySlice.reducer;
