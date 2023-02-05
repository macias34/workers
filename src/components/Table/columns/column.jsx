import Link from "next/link";
import { useMemo } from "react";

export const workersColumns = () => {
  return [
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
      accessor: "jobPositionID",
    },
    {
      Header: "Szef",
      accessor: "bossID",
    },
    {
      Header: "Zatrudniony od",
      accessor: "employedSince",
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
      accessor: "teamID",
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
            onClick={() => handleWorkerDelete(cell.row.values.workerID)}
            href="/"
          >
            Usuń
          </span>
        </div>
      ),
    },
  ];
};
