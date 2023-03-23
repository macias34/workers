import Link from "next/link";
import dayjs from "dayjs";
import { handleWorkerDelete } from "./workersHelpers";
import { handleJobPositionsDelete } from "./jobPositionsHelpers";
import { handleTeamsDelete } from "./teamsHelpers";

export const sortData = (data) => {
  return [...data].sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]]);
};

export const filterDataToTable = (sortedData, keysToFilter, searchValue) => {
  if (searchValue.length === 0) return sortedData;
  const filteredData = sortedData.filter((filtered) => {
    if (
      keysToFilter.some((key) =>
        filtered[key].toLowerCase().includes(searchValue)
      ) ||
      keysToFilter.some((key) =>
        searchValue.includes(filtered[key].toLowerCase())
      )
    )
      return filtered;
  });

  return filteredData;
};

export const workerColumns = (setNotification, dispatchRemoveWorker) => {
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
      accessor: "JobPositions",
      Cell: ({ row }) =>
        row.values.JobPositions ? row.values.JobPositions.positionName : "",
    },
    {
      Header: "Szef",
      accessor: "Bosses",
      Cell: ({ row }) =>
        row.values.Bosses
          ? row.values.Bosses.surname + " " + row.values.Bosses.name
          : "",
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
      Cell: ({ row }) => (row.values.Teams ? row.values.Teams.teamName : ""),
    },
    {
      Header: "Akcje",
      Cell: ({ cell }) => (
        <div className="flex gap-5 justify-center">
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
                setNotification,
                dispatchRemoveWorker,
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
  ];
};

export const jobPositionsColumns = (
  setJobPositionError,
  dispatchRemoveJobPosition
) => {
  return [
    {
      Header: "Id",
      accessor: "jobPositionID",
    },
    {
      Header: "Nazwa etatu",
      accessor: "positionName",
    },
    {
      Header: "Płaca minimalna",
      accessor: "minSalary",
    },
    {
      Header: "Płaca maksymalna",
      accessor: "maxSalary",
    },

    {
      Header: "Akcje",
      Cell: ({ cell }) => (
        <div className="flex gap-5 justify-center">
          <Link
            className="text-sky-400"
            href={`/jobPositions/edit/${cell.row.values.jobPositionID}`}
          >
            Edytuj
          </Link>
          <span
            className="text-red-400 cursor-pointer"
            onClick={() =>
              handleJobPositionsDelete(
                setJobPositionError,
                dispatchRemoveJobPosition,
                cell.row.values.jobPositionID
              )
            }
            href="/"
          >
            Usuń
          </span>
        </div>
      ),
    },
  ];
};

export const teamsColumns = (setNotification, dispatchRemoveTeam) => {
  return [
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
                setNotification,
                dispatchRemoveTeam,
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
  ];
};
