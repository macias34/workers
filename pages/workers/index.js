import Table from "@/src/components/Table/Table";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import Search from "@/src/components/UI/Search/Search";
import { workerColumns } from "@/src/helpers/tableHelpers";
import { handleInput } from "@/src/helpers/searchHelpers";
import { useDispatch, useSelector } from "react-redux";
import { removeWorker } from "@/src/features/workers/workersSlice";
import Loading from "@/src/components/Loading/Loading";
import { removeBoss } from "@/src/features/bosses/bossesSlice";
import FetchFailed from "@/src/components/FetchFailed/FetchFailed";
import { showNotification } from "@/src/features/notification/notificationSlice";
import SectionTitle from "@/src/components/SectionTitle/SectionTitle";

const Workers = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const { workers, status } = useSelector((state) => state.workers);

  const setNotification = ({ message, type }) => {
    dispatch(showNotification({ message, type }));
  };

  const dispatchRemoveWorker = (workerID) => {
    dispatch(removeWorker({ workerID }));
    dispatch(removeBoss({ workerID }));
  };

  const columns = useMemo(() =>
    workerColumns(setNotification, dispatchRemoveWorker)
  );

  const keysToFilter = ["surname", "name"];

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało się pobrać pracowników." />;
    case "pending":
      return <Loading message="Ładowanie pracowników.." />;
    case "fulfilled": {
      return (
        <>
          <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
            <Link className=" text-sky-400" href="/workers/add">
              Dodaj pracownika
            </Link>
          </div>

          <Search
            onInput={(e) => handleInput(e, setSearchInput)}
            label="Wyszukaj pracownika"
          />
          <Table
            columns={columns}
            data={workers}
            searchValue={searchInput}
            keysToFilter={keysToFilter}
          />
        </>
      );
    }
  }
};

export default Workers;
