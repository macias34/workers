import { useSelector } from "react-redux";
import FetchFailed from "../../FetchFailed/FetchFailed";
import Loading from "../../Loading/Loading";
import Select from "../../UI/Select/Select";

const Bosses = ({ id }) => {
  const { workers, status } = useSelector((state) => state.workers);

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało się pobrać szefów." />;
    case "pending":
      return <Loading message="Ładowanie szefów.." />;
    case "fulfilled": {
      const fixedWorkers = workers.map((worker) => {
        const fixedWorker = {};
        fixedWorker.label = worker.surname + " " + worker.name;
        fixedWorker.id = parseInt(worker.workerID);

        return fixedWorker;
      });
      const removeCurrentFromBosses = () =>
        fixedWorkers.filter((worker) => parseInt(id) !== worker.id);
      return (
        <Select
          name="bossID"
          options={id ? removeCurrentFromBosses() : fixedWorkers}
          label="Wybierz szefa"
        />
      );
    }
  }
};

export default Bosses;
