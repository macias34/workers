import { useGetJobPositionsQuery } from "@/src/features/API/API_jobPositions";
import { useState, useEffect } from "react";
import { workerSchema } from "@/src/validation/formSchemas";
import { submitEditWorker } from "@/src/requests/workersRequests";
import { fixWorkerData, setInitialSalary } from "@/src/helpers/workersHelpers";
import Bosses from "../../Selects/Bosses/Bosses";
import JobPositions from "../../Selects/JobPositions/JobPositions";
import Teams from "../../Selects/Teams/Teams";
import { useRouter } from "next/router";
import { useGetWorkerByIDQuery } from "@/src/features/API/API_workers";
import Input from "../../UI/Input/Input";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { workersValues } from "@/src/constants/formInitialValues";
import { useDispatch, useSelector } from "react-redux";
import { editWorker } from "@/src/features/workers/workersSlice";
import { editBoss } from "@/src/features/bosses/bossesSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const EditWorker = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState(workersValues);

  const { jobPositions } = useSelector((state) => state.jobPositions);
  const { workers } = useSelector((state) => state.workers);

  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddWorkerSchema = workerSchema(salary);

  useEffect(() => {
    if (workers && id) {
      const workerData = workers.find((worker) => worker.workerID == id);
      if (!workerData) return router.push("/workers/notFound");
      const fixedWorkerData = fixWorkerData(workerData);
      setInitialValues(fixedWorkerData);
      setInitialSalary(
        jobPositions,
        fixedWorkerData.jobPositionID ? fixedWorkerData.jobPositionID : 1,
        setSalary
      );
    }
  }, [workers]);

  const submitForm = async (values) => {
    await submitEditWorker(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const { workerID, surname, name } = data;
          dispatch(editWorker(data));
          dispatch(editBoss({ workerID, surname, name }));
          router.push("/workers");
          dispatch(
            showNotification({
              message: "Udało się edytować pracownika!",
              type: "success",
            })
          );
        }
      });
  };

  return (
    <FormikWrapper
      submitForm={submitForm}
      initialValues={initialValues}
      validationSchema={AddWorkerSchema}
      label="Edytuj pracownika"
    >
      <div className="flex gap-10 w-full">
        <Input name="surname" label={"Wpisz nazwisko pracownika"} />
        <Input name="name" label={"Wpisz imię pracownika"} />
      </div>
      <div className="flex gap-10 w-full">
        <JobPositions setSalary={setSalary} />
        <Bosses id={id} />
      </div>

      <div className="flex gap-10 w-full">
        <Input name="baseSalary" label="Podaj płacę podstawową" />
        <Input name="bonusSalary" label="Podaj płacę dodatkową" />
      </div>
      <div className="flex gap-10 w-full">
        <Teams />
        <Input name="employedSince" type="date" label="Zatrudniony od" />
      </div>
    </FormikWrapper>
  );
};

export default EditWorker;
