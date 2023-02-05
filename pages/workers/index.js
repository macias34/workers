import Table from "@/src/components/Table/Table";
import ErrorAlert from "@/src/components/UI/ErrorAlert/ErrorAlert";
import { useGetWorkersQuery } from "@/src/features/API_workers";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { handleWorkerDelete } from "@/src/helpers/workersHelpers";
import Search from "@/src/components/UI/Search/Search";
import dayjs from "dayjs";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [workerError, setWorkerError] = useState({ show: false, message: "" });
  const [searchValue, setSearchValue] = useState("");
  const columns = useMemo(() => [
    {
      Header: "id",
      accessor: "workerID",
    },
    {
      Header: "Nazwisko",
      accessor: "surname",
    },
    {
      Header: "Imie",
      accessor: "name",
    },
    {
      Header: "Etat",
      accessor: "JobPositions",
      Cell: ({ row }) => row.values.JobPositions.positionName,
    },
    {
      Header: "Szef",
      accessor: "Bosses",
      Cell: ({ row }) =>
        row.values.Bosses.surname + " " + row.values.Bosses.name,
    },
    {
      Header: "Zatrudniony od",
      accessor: "employedSince",
      Cell: ({ row }) => dayjs(row.values.employedSince).format("YYYY-MM-DD"),
    },
    {
      Header: "Płaca podstawowa",
      accessor: "baseSalary",
    },
    {
      Header: "Płaca dodatkowa",
      accessor: "bonusSalary",
    },
    {
      Header: "Zespół",
      accessor: "Teams",
      Cell: ({ row }) => row.values.Teams.teamName,
    },
    {
      Header: "Akcje",
      Cell: ({ cell }) => (
        <div className="flex gap-5">
          <Link
            className="text-sky-400"
            href={`/workers/edit/${cell.row.values.workerID}`}
          >
            Edytuj
          </Link>
          <span
            className="text-red-400 cursor-pointer"
            onClick={() =>
              handleWorkerDelete(
                workers,
                setWorkerError,
                setWorkers,
                cell.row.values.workerID
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

  const { data, error, isLoading } = useGetWorkersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setWorkers(data);
    }
  }, [data]);

  if (error) return <h1>Nie udało się pobrać pracowników</h1>;
  else if (isLoading) return <h1>Loading..</h1>;
  else if (data)
    return (
      <>
        <ErrorAlert error={workerError}>{workerError.message}</ErrorAlert>

        <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
          <p>Pracownicy</p>
          <Link className=" text-sky-400" href="/workers/add">
            Dodaj pracownika
          </Link>
        </div>

        <Search
          onInput={(e) => setSearchValue(e.target.value)}
          label="Wyszukaj pracownika"
        />
        <Table columns={columns} data={workers} filterInput={searchValue} />
      </>
    );
};

export default Workers;
