const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  bosses: [],
  status: "pending",
};

export const getBosses = createAsyncThunk("bosses/getBosses", async () => {
  const res = await fetch("/api/bosses").then((data) => data.json());
  return res;
});

export const bossesSlice = createSlice({
  name: "bosses",
  initialState,
  reducers: {
    addBoss: (state, action) => {
      const { workerID, surname, name } = action.payload;
      const boss = {
        workerID,
        surname,
        name,
      };

      state.bosses.push(boss);
    },
    editBoss: (state, action) => {
      const { workerID, surname, name } = action.payload;
      const editedBoss = {
        workerID,
        surname,
        name,
      };

      const filteredBosses = state.bosses.map((boss) => {
        if (boss.workerID === workerID) return editedBoss;
        else return boss;
      });
      state.bosses = filteredBosses;
    },

    removeBoss: (state, action) => {
      const { workerID } = action.payload;
      const filteredBosses = state.bosses.filter(
        (boss) => boss.workerID !== workerID
      );

      state.teams = filteredBosses;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBosses.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBosses.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.bosses = action.payload;
      })
      .addCase(getBosses.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { addBoss, removeBoss, editBoss } = bossesSlice.actions;
export default bossesSlice.reducer;
