import Link from "next/link";
import Table from "@/src/components/Table/Table";
import Search from "@/src/components/UI/Search/Search";
import { useState, useMemo } from "react";
import ErrorAlert from "@/src/components/UI/ErrorAlert/ErrorAlert";
import { jobPositionsColumns } from "@/src/helpers/tableHelpers";
import { handleInput } from "@/src/helpers/searchHelpers";
import { useDispatch, useSelector } from "react-redux";
import { removeJobPosition } from "@/src/features/jobPositions/jobPositionsSlice";
import Loading from "@/src/components/Loading/Loading";
import FetchFailed from "@/src/components/FetchFailed/FetchFailed";
import { showNotification } from "@/src/features/notification/notificationSlice";

const JobPositions = () => {
  const dispatch = useDispatch();
  const keysToFilter = ["positionName"];
  const [searchInput, setSearchInput] = useState("");
  const { jobPositions, status } = useSelector((state) => state.jobPositions);

  const setJobPositionError = ({ message, type }) => {
    dispatch(showNotification({ message, type }));
  };

  const dispatchRemoveJobPosition = (jobPositionID) => {
    dispatch(removeJobPosition({ jobPositionID }));
  };

  const columns = useMemo(() =>
    jobPositionsColumns(setJobPositionError, dispatchRemoveJobPosition)
  );

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało pobrać się etatów." />;
    case "pending":
      return <Loading message="Ładowanie etatów.." />;
    case "fulfilled": {
      return (
        <>
          <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
            <Link className="text-sky-400" href="/jobPositions/add">
              Dodaj etat
            </Link>
          </div>

          <Search
            onInput={(e) => handleInput(e, setSearchInput)}
            label="Wyszukaj etat"
          />
          <Table
            columns={columns}
            data={jobPositions}
            searchValue={searchInput}
            keysToFilter={keysToFilter}
          />
        </>
      );
    }
  }
};

export default JobPositions;
