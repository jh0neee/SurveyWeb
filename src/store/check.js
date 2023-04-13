import { createSlice } from "@reduxjs/toolkit";

const initialCheckState = {
  checkOptions: [],
};

const checkSlice = createSlice({
  name: "check",
  initialState: initialCheckState,
  reducers: {
    CREATE_CHECK(state, action) {
      const id = action.payload;
      const chkObj = state.checkOptions.find((item) => item.id === id);

      if (!chkObj) {
        state.checkOptions.push({ id, [id]: [{ id: Date.now(), value: "" }] });
      } else {
        chkObj[id].push({ id: Date.now(), value: "" });
      }
    },
    CHANGE_CHECK(state, action) {
      const { optValue, id, index } = action.payload;

      if (state.checkOptions !== undefined) {
        let optFindIndex = state.checkOptions.findIndex(
          (item) => item.id === id
        );
        state.checkOptions[optFindIndex][id][index].value = optValue;
      }
    },
    DELETE_CHECK(state, action) {
      const { optArray, id, item } = action.payload;
      let optFindIndex = state.checkOptions.findIndex((item) => item.id === id);
      const deletedArray = optArray[id].filter((opt) => opt.id !== item.id);
      state.checkOptions[optFindIndex][id] = deletedArray;
    },
  },
});

export const checkAction = checkSlice.actions;

export default checkSlice.reducer;
