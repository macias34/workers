const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  teams: [],
  status: "pending",
};

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  const res = await fetch("/api/teams").then((data) => data.json());
  return res;
});

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    addTeam: (state, action) => {
      const { teamID, teamName, address } = action.payload;

      const team = {
        teamID,
        teamName,
        address,
      };

      state.teams.push(team);
    },
    removeTeam: (state, action) => {
      const { teamID } = action.payload;
      const filteredTeams = state.teams.filter(
        (team) => team.teamID !== teamID
      );

      state.teams = filteredTeams;
    },
    editTeam: (state, action) => {
      const { teamID, teamName, address } = action.payload;

      const editedTeam = {
        teamID,
        teamName,
        address,
      };

      const filteredTeams = state.teams.map((team) => {
        if (team.teamID === teamID) return editedTeam;
        else return team;
      });

      state.teams = filteredTeams;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTeams.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { addTeam, editTeam, removeTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
