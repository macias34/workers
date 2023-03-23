import { removeWorker } from "@/src/requests/workersRequests";
import dayjs from "dayjs";

export const handleJobPostionChange = (jobID, jobPositions, setSalary) => {
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
  setNotification,
  dispatchRemoveWorker,
  id
) => {
  const res = await removeWorker(id).then((res) => res.json());

  if (res.error) {
    setNotification({ message: res.error, type: "error" });
    return;
  }

  setNotification({ message: "Udało się usunąć pracownika!", type: "success" });
  dispatchRemoveWorker(id);
};

export const fixWorkerData = (workerData) => {
  const fixedWorkerData = structuredClone(workerData);
  delete fixedWorkerData.workerID;
  fixedWorkerData.employedSince = dayjs(fixedWorkerData.employedSince).format(
    "YYYY-MM-DD"
  );

  return fixedWorkerData;
};
