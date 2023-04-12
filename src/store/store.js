import { configureStore } from '@reduxjs/toolkit';

import surveyReducer from "./survey";

const store = configureStore({
  reducer: { survey: surveyReducer }
});

export default store;