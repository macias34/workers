import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { jobPositionsSchema } from "@/src/validation/formSchemas";
import {
  submitAddJobPosition,
  submitEditJobPosition,
} from "@/src/requests/jobPositionsRequests";
import { formInitialValues } from "@/src/constants/jobPositionsConstants";
import { useRouter } from "next/router";
import { useGetJobPositionByIDQuery } from "@/src/features/API_jobPositions";

const EditJobPosition = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState(formInitialValues);

  const {
    data: jobPositionData,
    error: jobPositionErr,
    isLoading: jobPositionIsLoading,
  } = useGetJobPositionByIDQuery(id ? id : 1, {
    refetchOnMountOrArgChange: true,
  });

  if (jobPositionErr) router.push("/jobPositions/notFound");

  const [salary, setSalary] = useState({ min: 0, max: 1000000 });
  const AddJobPositionSchema = jobPositionsSchema(salary);
  const submitForm = async (values) => {
    await submitEditJobPosition(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/jobPositions");
        }
      });
  };

  useEffect(() => {
    if (jobPositionData) {
      setInitialValues(jobPositionData);
    }
  }, [jobPositionData]);

  return (
    <div className="h-full flex flex-col items-center justify-evenly">
      <h1 className="text-4xl  font-semibold text-emerald-400">Edytuj etat</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddJobPositionSchema}
        enableReinitialize={true}
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
          <Button color="green">Edytuj etat</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditJobPosition;
