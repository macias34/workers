import { removeJobPosition } from "../requests/jobPositionsRequests";
export const handleJobPositionsDelete = async (
  jobPositions,
  setShowError,
  setJobPositions,
  id
) => {
  const filteredJobPositions = jobPositions.filter(
    (jobPosition) => jobPosition.jobPositionID !== id
  );
  const res = await removeJobPosition(id).then((res) => res.json());

  if (res.error) {
    setShowError({ show: true, message: res.error });

    setTimeout(() => {
      setShowError({ show: false, message: res.error });
    }, 2000);
    return;
  }

  setJobPositions(filteredJobPositions);
};
