import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useState } from "react";
import { jobPositionsSchema } from "@/src/validation/formSchemas";
import { submitAddJobPosition } from "@/src/requests/jobPositionsRequests";
import { formInitialValues } from "@/src/constants/jobPositionsConstants";
import { useRouter } from "next/router";

const AddJobPosition = () => {
  const router = useRouter();

  const initialValues = formInitialValues;
  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddJobPositionSchema = jobPositionsSchema(salary);
  const submitForm = async (values) => {
    await submitAddJobPosition(values)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/jobPositions");
        }
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-20 font-semibold text-emerald-400">
        Dodaj etat
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddJobPositionSchema}
      >
        <Form className="flex flex-col items-center gap-10">
          <div className="flex flex-col flex-wrap gap-5 items-center w-full">
            <div className="flex gap-10 w-full">
              <Input name="positionName" label="Wpisz nazwę etatu" />
            </div>
            <div className="flex gap-10 w-full">
              <Input name="minSalary" label="Podaj płacę minimalną" />
              <Input name="maxSalary" label="Podaj płacę maksymalną" />
            </div>
          </div>
          <Button color="green">Dodaj etat</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddJobPosition;
