import { createSlice } from "@reduxjs/toolkit";

let timeOutID;

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.setNotification(message));
    clearTimeout(timeOutID);
    timeOutID = setTimeout(() => {
      dispatch(notificationSlice.actions.removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
