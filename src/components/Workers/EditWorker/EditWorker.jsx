import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useGetJobPositionsQuery } from "@/src/features/API_jobPositions";
import { useGetTeamsQuery } from "@/src/features/API_teams";
import { useGetWorkersQuery } from "@/src/features/API_workers";
import { useState, useEffect } from "react";
import { workerSchema } from "@/src/validation/formSchemas";
import { submitEditWorker } from "@/src/requests/workersRequests";
import { formInitialValues } from "@/src/constants/workersConstants";
import {
  renderJobPositions,
  renderBosses,
  renderTeams,
  setInitialSalary,
} from "@/src/helpers/workersHelpers";
import { useRouter } from "next/router";
import { useGetWorkerByIDQuery } from "@/src/features/API_workers";
import dayjs from "dayjs";

const EditWorker = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState(formInitialValues);

  const {
    data: workerData,
    error: workerErr,
    isLoading: workerIsLoading,
  } = useGetWorkerByIDQuery(id ? id : 1, { refetchOnMountOrArgChange: true });

  if (workerErr) router.push("/workers/notFound");

  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddWorkerSchema = workerSchema(salary);
  const {
    data: jobPositions,
    error: jobPositionsErr,
    isLoading: jobPositionsIsLoading,
  } = useGetJobPositionsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: teams,
    error: teamsErr,
    isLoading: teamsIsLoading,
  } = useGetTeamsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: workers,
    error: workersErr,
    isLoading: workersIsLoading,
  } = useGetWorkersQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (workerData) {
      const fixedWorkerData = structuredClone(workerData);
      delete fixedWorkerData.workerID;
      fixedWorkerData.employedSince = dayjs(
        fixedWorkerData.employedSince
      ).format("YYYY-MM-DD");
      setInitialValues(fixedWorkerData);
      setInitialSalary(
        jobPositions,
        fixedWorkerData.jobPositionID ? fixedWorkerData.jobPositionID : 1,
        setSalary
      );
    }
  }, [workerData]);

  const submitForm = async (values) => {
    await submitEditWorker(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/workers");
        }
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-evenly">
      <h1 className="text-4xl  font-semibold text-emerald-400">
        Edytuj pracownika
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddWorkerSchema}
        enableReinitialize={true}
      >
        <Form className="flex flex-col items-center gap-10">
          <div className="flex flex-col flex-wrap gap-5 items-center">
            <div className="flex gap-10 w-full">
              <Input name="surname" label={"Wpisz nazwisko pracownika"} />
              <Input name="name" label={"Wpisz imię pracownika"} />
            </div>
            <div className="flex gap-10 w-full">
              {renderJobPositions(
                jobPositions,
                jobPositionsIsLoading,
                jobPositionsErr,
                setSalary
              )}
              {renderBosses(workers, workersIsLoading, workersErr, id)}
            </div>

            <div className="flex gap-10 w-full">
              <Input name="baseSalary" label="Podaj płacę podstawową" />
              <Input name="bonusSalary" label="Podaj płacę dodatkową" />
            </div>
            <div className="flex gap-10 w-full">
              {renderTeams(teams, teamsIsLoading, teamsErr)}
              <Input name="employedSince" type="date" label="Zatrudniony od" />
            </div>
          </div>
          <Button color="blue">Edytuj pracownika</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditWorker;
