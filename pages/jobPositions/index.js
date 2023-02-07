import { useGetJobPositionsQuery } from "@/src/features/API_jobPositions";
import Link from "next/link";
import Table from "@/src/components/Table/Table";
import Search from "@/src/components/UI/Search/Search";
import { useState, useMemo, useEffect } from "react";
import { handleJobPositionsDelete } from "@/src/helpers/jobPositionsHelpers";
import ErrorAlert from "@/src/components/UI/ErrorAlert/ErrorAlert";

const JobPositions = () => {
  const keysToFilter = ["positionName"];
  const [jobPositions, setJobPositions] = useState([]);
  const [jobPositionError, setJobPositionError] = useState({
    show: false,
    message: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const columns = useMemo(() => [
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
                jobPositions,
                setJobPositionError,
                setJobPositions,
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
  ]);

  const { data, error, isLoading } = useGetJobPositionsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) {
      setJobPositions(data);
    }
  }, [data]);

  if (error) return <h1>Nie udało się pobrać pracowników</h1>;
  else if (isLoading) return <h1>Loading..</h1>;
  else if (data)
    return (
      <>
        <ErrorAlert error={jobPositionError}>
          {jobPositionError.message}
        </ErrorAlert>

        <div className="flex gap-10 text-4xl pt-5 font-semibold text-emerald-400">
          <p>Etaty</p>
          <Link className=" text-sky-400" href="/jobPositions/add">
            Dodaj etat
          </Link>
        </div>

        <Search
          onInput={(event) =>
            setSearchInput(event.target.value.replace(/\s/g, "").toLowerCase())
          }
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
};

export default JobPositions;
