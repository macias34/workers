import { removeTeams } from "../requests/teamsRequests";

export const handleTeamsDelete = async (teams, setShowError, setTeams, id) => {
  const filteredTeams = teams.filter((team) => team.teamID !== id);
  const res = await removeTeams(id).then((res) => res.json());

  if (res.error) {
    setShowError({ show: true, message: res.error });

    setTimeout(() => {
      setShowError({ show: false, message: res.error });
    }, 2000);
    return;
  }

  setTeams(filteredTeams);
};
