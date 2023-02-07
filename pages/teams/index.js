import { useGetTeamsQuery } from "@/src/features/API_teams";
import Link from "next/link";
import Table from "@/src/components/Table/Table";
import Search from "@/src/components/UI/Search/Search";
import { useState, useMemo, useEffect } from "react";
import { handleTeamsDelete } from "@/src/helpers/teamsHelpers";
import ErrorAlert from "@/src/components/UI/ErrorAlert/ErrorAlert";

const Teams = () => {
  const keysToFilter = ["teamName", "address"];
  const [teams, setTeams] = useState([]);
  const [teamError, setTeamError] = useState({
    show: false,
    message: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "teamID",
    },
    {
      Header: "Nazwa zespołu",
      accessor: "teamName",
    },
    {
      Header: "Adres zespołu",
      accessor: "address",
    },

    {
      Header: "Akcje",
      Cell: ({ cell }) => (
        <div className="flex gap-5 justify-center">
          <Link
            className="text-sky-400"
            href={`/teams/edit/${cell.row.values.teamID}`}
          >
            Edytuj
          </Link>
          <span
            className="text-red-400 cursor-pointer"
            onClick={() =>
              handleTeamsDelete(
                teams,
                setTeamError,
                setTeams,
                cell.row.values.teamID
              )
            }
            href="/"
          >
            Usuń
          </span>
        </div>
      ),
    },
  ]);

  const { data, error, isLoading } = useGetTeamsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setTeams(data);
    }
  }, [data]);

  if (error) return <h1>Nie udało się pobrać pracowników</h1>;
  else if (isLoading) return <h1>Loading..</h1>;
  else if (data)
    return (
      <>
        <ErrorAlert error={teamError}>{teamError.message}</ErrorAlert>

        <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
          <p>Zespoły</p>
          <Link className=" text-sky-400" href="/teams/add">
            Dodaj zespół
          </Link>
        </div>

        <Search
          onInput={(event) =>
            setSearchInput(event.target.value.replace(/\s/g, "").toLowerCase())
          }
          label="Wyszukaj zespół"
        />
        <Table
          columns={columns}
          data={teams}
          searchValue={searchInput}
          keysToFilter={keysToFilter}
        />
      </>
    );
};

export default Teams;
