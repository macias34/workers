import Navbar from "../UI/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getWorkers,
  setFixedWorkers,
} from "@/src/features/workers/workersSlice";
import { getJobPositions } from "@/src/features/jobPositions/jobPositionsSlice";
import { getTeams } from "@/src/features/teams/teamsSlice";
import Loading from "../Loading/Loading";
import { getBosses } from "@/src/features/bosses/bossesSlice";
import FetchFailed from "../FetchFailed/FetchFailed";
import Notification from "../Notification/Notification";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [activeLocation, setActiveLocation] = useState("");
  const router = useRouter();

  const [fetchStatus, setFetchStatus] = useState("pending");

  const { workers, status: workersStatus } = useSelector(
    (state) => state.workers
  );
  const { jobPositions, status: jobPositionsStatus } = useSelector(
    (state) => state.jobPositions
  );
  const { teams, status: teamsStatus } = useSelector((state) => state.teams);

  const { bosses, status: bossesStatus } = useSelector((state) => state.bosses);

  const statuses = [
    workersStatus,
    jobPositionsStatus,
    teamsStatus,
    bossesStatus,
  ];

  useEffect(() => {
    dispatch(getWorkers()).then(() => {
      dispatch(getTeams()).then(({ payload }) => {
        const teams = payload;
        dispatch(getJobPositions()).then(({ payload }) => {
          const jobPositions = payload;
          dispatch(getBosses()).then(({ payload }) => {
            const bosses = payload;
            dispatch(setFixedWorkers({ jobPositions, teams, bosses }));
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    if (statuses.some((status) => status === "pending"))
      setFetchStatus("pending");
    else if (statuses.every((status) => status === "fulfilled"))
      setFetchStatus("fulfilled");
    else if (statuses.some((status) => status === "rejected"))
      setFetchStatus("rejected");
  }, statuses);

  useEffect(() => {
    dispatch(setFixedWorkers({ jobPositions, teams, bosses }));
  }, [jobPositions, teams, bosses]);

  useEffect(() => {
    const location = router.pathname;
    if (location.includes("workers")) setActiveLocation("workers");
    else if (location.includes("/jobPositions"))
      setActiveLocation("jobPositions");
    else if (location.includes("/teams")) setActiveLocation("teams");
    else setActiveLocation("");
  }, [router.pathname]);

  switch (fetchStatus) {
    case "fulfilled":
      return (
        <div className="flex flex-col  items-center relative">
          <Notification />
          <Navbar active={activeLocation} />
          <div className="py-10  gap-10 flex flex-col items-center">
            {children}
          </div>
        </div>
      );
    case "pending": {
      return <Loading message="Ładowanie projektu.." />;
    }

    case "rejected": {
      return (
        <FetchFailed message="Błąd podczas pobierania danych. Spróbuj odswieżyć stronę." />
      );
    }

    default:
      return <h1 className="text-red-400">Unexpected error happened.</h1>;
  }
};

export default Layout;
