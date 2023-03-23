const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  workers: [],
  status: "pending",
};

export const getWorkers = createAsyncThunk(
  "workers/getWorkers",
  async (_, thunkAPI) => {
    const res = await fetch("/api/workers").then((data) => data.json());
    return res;
  }
);

export const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    setFixedWorkers: (state, action) => {
      const workers = state.workers;
      const jobPositions = action.payload.jobPositions;
      const teams = action.payload.teams;
      const bosses = action.payload.bosses;

      const fixedWorkers = workers.map((worker) => {
        return {
          ...worker,
          JobPositions: jobPositions.find(
            (jobPosition) => jobPosition.jobPositionID === worker.jobPositionID
          ),
          Teams: teams.find((team) => team.teamID === worker.teamID),
          Bosses: bosses.find((boss) => boss.workerID === worker.bossID),
        };
      });
      state.workers = fixedWorkers;
    },

    addWorker: (state, action) => {
      const {
        workerID,
        surname,
        name,
        jobPositionID,
        bossID,
        baseSalary,
        bonusSalary,
        teamID,
        employedSince,
        JobPositions,
        Bosses,
        Teams,
      } = action.payload;

      const worker = {
        workerID,
        surname,
        name,
        jobPositionID,
        bossID,
        teamID,
        baseSalary,
        bonusSalary,
        employedSince,
        JobPositions,
        Bosses,
        Teams,
      };

      state.workers.push(worker);
    },
    removeWorker: (state, action) => {
      const { workerID } = action.payload;
      const filteredWorkers = state.workers.filter(
        (worker) => worker.workerID !== workerID
      );

      state.workers = filteredWorkers;
    },
    editWorker: (state, action) => {
      const {
        workerID,
        surname,
        name,
        jobPositionID,
        bossID,
        teamID,
        baseSalary,
        bonusSalary,
        employedSince,
        JobPositions,
        Bosses,
        Teams,
      } = action.payload;

      const editedWorker = {
        workerID,
        surname,
        name,
        jobPositionID,
        bossID,
        teamID,
        baseSalary,
        bonusSalary,
        employedSince,
        JobPositions,
        Bosses,
        Teams,
      };

      const filteredWorkers = state.workers.map((worker) => {
        if (worker.workerID === workerID) return editedWorker;
        else return worker;
      });

      state.workers = filteredWorkers;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWorkers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getWorkers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.workers = action.payload;
      })
      .addCase(getWorkers.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const selectAllWorkers = (state) => state.workers;
export const {
  addWorker,
  removeWorker,
  editWorker,
  setFixedWorkers,
  setWorkersStatus,
} = workersSlice.actions;
export default workersSlice.reducer;
