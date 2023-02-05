import Select from "../components/UI/Select/Select";
import { removeWorker } from "@/src/requests/workersRequests";

export const handleJobPostionChange = (e, jobPositions, setSalary) => {
  const jobID = e.target.value;
  if (jobPositions) {
    const currentJob = jobPositions.find(
      (jobPosition) => jobPosition.jobPositionID == jobID
    );

    setSalary({ min: currentJob.minSalary, max: currentJob.maxSalary });
  }
};

export const setInitialSalary = (jobPositions, jobPositionID, setSalary) => {
  if (jobPositions) {
    const initialJobPosition = jobPositions.find(
      (jobPosition) => jobPosition.jobPositionID == jobPositionID
    );
    setSalary({
      min: initialJobPosition.minSalary,
      max: initialJobPosition.maxSalary,
    });
  }
};

export const handleWorkerDelete = async (
  workers,
  setShowError,
  setWorkers,
  id
) => {
  const filteredWorkers = workers.filter((worker) => worker.workerID !== id);
  const res = await removeWorker(id).then((res) => res.json());

  console.log(res);

  if (res.error) {
    setShowError({ show: true, message: res.error });

    setTimeout(() => {
      setShowError({ show: false, message: res.error });
    }, 2000);
    return;
  }

  setWorkers(filteredWorkers);
};

export const renderJobPositions = (
  jobPositions,
  jobPositionsIsLoading,
  jobPositionsErr,
  setSalary
) => {
  if (jobPositionsErr) return <h1>Couldn't fetch job positions.</h1>;
  else if (jobPositionsIsLoading) return <h1>Loading job positions.</h1>;
  else if (jobPositions) {
    const fixedJobPositions = jobPositions.map((jobPosition) => {
      const fixedJobPosition = {};
      fixedJobPosition.label = jobPosition.positionName;
      fixedJobPosition.id = parseInt(jobPosition.jobPositionID);

      return fixedJobPosition;
    });
    return (
      <Select
        onChange={(e) => handleJobPostionChange(e, jobPositions, setSalary)}
        name="jobPositionID"
        options={fixedJobPositions}
        label="Wybierz etat"
      />
    );
  }
};

export const renderBosses = (workers, workersIsLoading, workersErr, id) => {
  if (workersErr) return <h1>Couldn't fetch workers.</h1>;
  else if (workersIsLoading) return <h1>Loading workers.</h1>;
  else if (workers) {
    const fixedWorkers = workers.map((worker) => {
      const fixedWorker = {};
      fixedWorker.label = worker.surname + " " + worker.name;
      fixedWorker.id = parseInt(worker.workerID);

      return fixedWorker;
    });
    const filteredWorkers = fixedWorkers.filter(
      (worker) => parseInt(id) !== worker.id
    );
    return (
      <Select name="bossID" options={filteredWorkers} label="Wybierz szefa" />
    );
  }
};

export const renderTeams = (teams, teamsIsLoading, teamsErr) => {
  if (teamsErr) return <h1>Couldn't fetch teams.</h1>;
  else if (teamsIsLoading) return <h1>Loading teams.</h1>;
  else if (teams) {
    const fixedTeams = teams.map((team) => {
      const fixedTeam = {};
      fixedTeam.label = team.teamName;
      fixedTeam.id = parseInt(team.teamID);

      return fixedTeam;
    });
    return (
      <Select name="teamID" options={fixedTeams} label="Wybierz oddział" />
    );
  }
};
