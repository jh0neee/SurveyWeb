import { configureStore } from '@reduxjs/toolkit';

import surveyReducer from "./survey";
import checkReducer from "./check";

const store = configureStore({
  reducer: { survey: surveyReducer, check: checkReducer }
});

export default store;