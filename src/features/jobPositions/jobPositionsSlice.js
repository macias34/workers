const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  jobPositions: [],
  status: "pending",
};

export const getJobPositions = createAsyncThunk(
  "jobPositions/getJobPositions",
  async () => {
    const res = await fetch("/api/job_positions").then((data) => data.json());
    return res;
  }
);

export const jobPositionsSlice = createSlice({
  name: "jobPositions",
  initialState,
  reducers: {
    addJobPosition: (state, action) => {
      const { jobPositionID, positionName, minSalary, maxSalary } =
        action.payload;

      const jobPosition = {
        jobPositionID,
        positionName,
        minSalary,
        maxSalary,
      };

      state.jobPositions.push(jobPosition);
    },
    removeJobPosition: (state, action) => {
      const { jobPositionID } = action.payload;
      const filteredJobPosition = state.jobPositions.filter(
        (jobPosition) => jobPosition.jobPositionID !== jobPositionID
      );

      state.jobPositions = filteredJobPosition;
    },
    editJobPosition: (state, action) => {
      const { jobPositionID, positionName, minSalary, maxSalary } =
        action.payload;

      const editedJobPosition = {
        jobPositionID,
        positionName,
        minSalary,
        maxSalary,
      };

      const filteredJobPositions = state.jobPositions.map((jobPosition) => {
        if (jobPosition.jobPositionID === jobPositionID)
          return editedJobPosition;
        else return jobPosition;
      });

      state.jobPositions = filteredJobPositions;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getJobPositions.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getJobPositions.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.jobPositions = action.payload;
      })
      .addCase(getJobPositions.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { addJobPosition, editJobPosition, removeJobPosition } =
  jobPositionsSlice.actions;
export default jobPositionsSlice.reducer;
