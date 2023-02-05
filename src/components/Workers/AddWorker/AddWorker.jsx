import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useGetJobPositionsQuery } from "@/src/features/API_jobPositions";
import { useGetTeamsQuery } from "@/src/features/API_teams";
import { useGetWorkersQuery } from "@/src/features/API_workers";
import { useState } from "react";
import { workerSchema } from "@/src/validation/formSchemas";
import { submitAddWorker } from "@/src/requests/workersRequests";
import { formInitialValues } from "@/src/constants/workersConstants";
import {
  renderJobPositions,
  renderBosses,
  renderTeams,
} from "@/src/helpers/workersHelpers";
import { useRouter } from "next/router";

const AddWorker = () => {
  const router = useRouter();

  const initialValues = formInitialValues;
  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddWorkerSchema = workerSchema(salary);

  const {
    data: jobPositions,
    error: jobPositionsErr,
    isLoading: jobPositionsIsLoading,
  } = useGetJobPositionsQuery();

  const {
    data: teams,
    error: teamsErr,
    isLoading: teamsIsLoading,
  } = useGetTeamsQuery();

  const {
    data: workers,
    error: workersErr,
    isLoading: workersIsLoading,
  } = useGetWorkersQuery();

  const submitForm = async (values) => {
    await submitAddWorker(values)
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
        Dodaj pracownika
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddWorkerSchema}
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
              {renderBosses(workers, workersIsLoading, workersErr)}
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
          <Button color="green">Dodaj pracownika</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddWorker;
