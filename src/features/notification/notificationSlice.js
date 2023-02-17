const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  show: false,
  message: "",
  type: "error",
};

export const notificationSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      const { type, message } = action.payload;

      state.show = true;
      state.message = message;
      state.type = type;
    },
    hideNotification: (state, action) => {
      state.show = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
