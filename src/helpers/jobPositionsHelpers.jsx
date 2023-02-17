import { removeJobPosition } from "../requests/jobPositionsRequests";

export const handleJobPositionsDelete = async (
  setNotification,
  dispatchRemoveJobPosition,
  id
) => {
  const res = await removeJobPosition(id).then((res) => res.json());

  if (res.error) {
    setNotification({ message: res.error, type: "error" });
    return;
  }

  setNotification({ message: "Udało się usunąć etat!", type: "success" });
  dispatchRemoveJobPosition(id);
};
