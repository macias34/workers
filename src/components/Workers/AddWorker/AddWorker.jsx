import { useState } from "react";
import { workerSchema } from "@/src/validation/formSchemas";
import { submitAddWorker } from "@/src/requests/workersRequests";
import { useRouter } from "next/router";
import { workersValues } from "@/src/constants/formInitialValues";
import Bosses from "../../Selects/Bosses/Bosses";
import JobPositions from "../../Selects/JobPositions/JobPositions";
import Teams from "../../Selects/Teams/Teams";
import Input from "../../UI/Input/Input";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { useDispatch } from "react-redux";
import { addWorker } from "@/src/features/workers/workersSlice";
import { addBoss } from "@/src/features/bosses/bossesSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const AddWorker = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddWorkerSchema = workerSchema(salary);

  const submitForm = async (values) => {
    await submitAddWorker(values)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/workers");
          dispatch(addWorker(data));
          dispatch(addBoss(data));
          dispatch(
            showNotification({
              type: "success",
              message: "Udało się dodać nowego pracownika!",
            })
          );
        }
      });
  };

  return (
    <FormikWrapper
      submitForm={submitForm}
      initialValues={workersValues}
      validationSchema={AddWorkerSchema}
      label="Dodaj pracownika"
    >
      <div className="flex gap-10 w-full">
        <Input name="surname" label={"Wpisz nazwisko pracownika"} />
        <Input name="name" label={"Wpisz imię pracownika"} />
      </div>
      <div className="flex gap-10 w-full">
        <JobPositions setSalary={setSalary} />
        <Bosses />
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

export default AddWorker;
