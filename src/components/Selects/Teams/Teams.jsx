import { useGetTeamsQuery } from "@/src/features/API/API_teams";
import { useSelector } from "react-redux";
import FetchFailed from "../../FetchFailed/FetchFailed";
import Loading from "../../Loading/Loading";
import Select from "../../UI/Select/Select";

const Teams = () => {
  const { teams, status } = useSelector((state) => state.teams);

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało się pobrać zespołów." />;
    case "pending":
      return <Loading message="Ładowanie zespołów.." />;
    case "fulfilled": {
      const fixedTeams = teams.map((team) => {
        const fixedTeam = {};
        fixedTeam.label = team.teamName;
        fixedTeam.id = parseInt(team.teamID);

        return fixedTeam;
      });
      return (
        <Select name="teamID" options={fixedTeams} label="Wybierz zespoł" />
      );
    }
  }
};

export default Teams;
