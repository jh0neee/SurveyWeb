import { createSlice } from "@reduxjs/toolkit";

const initialsurveyState = {
  questionItem: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState: initialsurveyState,
  reducers: {
    CREATE_SURVEY(state, action) {
      state.questionItem.push(action.payload);
    },
    DELETE_SURVEY(state, action) {
      const id = action.payload;
      state.questionItem = state.questionItem.filter((surv) => surv.id !== id);
    },
  },
});

export const surveyAction = surveySlice.actions;

export default surveySlice.reducer;
