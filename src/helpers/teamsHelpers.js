import { removeTeams } from "../requests/teamsRequests";

export const handleTeamsDelete = async (
  dispatchRemoveTeam,
  setNotification,
  id
) => {
  const res = await removeTeams(id).then((res) => res.json());

  if (res.error) {
    setNotification({ message: res.error, type: "error" });
    return;
  }
  setNotification({ message: "Udało się usunąć zespół!", type: "success" });
  dispatchRemoveTeam(id);
};
