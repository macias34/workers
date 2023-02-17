import Link from "next/link";
import Table from "@/src/components/Table/Table";
import Search from "@/src/components/UI/Search/Search";
import { useState, useMemo, useEffect } from "react";
import { handleTeamsDelete } from "@/src/helpers/teamsHelpers";
import ErrorAlert from "@/src/components/UI/ErrorAlert/ErrorAlert";
import { teamsColumns } from "@/src/helpers/tableHelpers";
import { handleInput } from "@/src/helpers/searchHelpers";
import { useDispatch, useSelector } from "react-redux";
import { removeTeam } from "@/src/features/teams/teamsSlice";
import Loading from "@/src/components/Loading/Loading";
import FetchFailed from "@/src/components/FetchFailed/FetchFailed";
import { showNotification } from "@/src/features/notification/notificationSlice";

const Teams = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const keysToFilter = ["teamName", "address"];

  const { teams, status } = useSelector((state) => state.teams);

  const dispatchRemoveTeam = (teamID) => {
    dispatch(removeTeam({ teamID }));
  };

  const setNotification = ({ message, type }) => {
    dispatch(showNotification({ message, type }));
  };

  const columns = useMemo(() =>
    teamsColumns(dispatchRemoveTeam, setNotification)
  );

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało się pobrać zespołów." />;
    case "pending":
      return <Loading message="Ładowanie zespołów.." />;
    case "fulfilled":
      return (
        <>
          <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
            <Link className=" text-sky-400" href="/teams/add">
              Dodaj zespół
            </Link>
          </div>

          <Search
            onInput={(e) => handleInput(e, setSearchInput)}
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
  }
};

export default Teams;
