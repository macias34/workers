import Input from "../../UI/Input/Input";
import { useState, useEffect } from "react";
import { jobPositionsSchema } from "@/src/validation/formSchemas";
import { submitEditJobPosition } from "@/src/requests/jobPositionsRequests";
import { useRouter } from "next/router";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { jobPositionsValues } from "@/src/constants/formInitialValues";
import { useDispatch, useSelector } from "react-redux";
import { editJobPosition } from "@/src/features/jobPositions/jobPositionsSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const EditJobPosition = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState(jobPositionsValues);
  const { jobPositions } = useSelector((state) => state.jobPositions);

  const submitForm = async (values) => {
    await submitEditJobPosition(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(editJobPosition(data));
          dispatch(
            showNotification({
              message: "Udało się edytować etat!",
              type: "success",
            })
          );
          router.push("/jobPositions");
        }
      });
  };

  useEffect(() => {
    if (jobPositions && id) {
      const jobPositionData = jobPositions.find(
        (jobPosition) => jobPosition.jobPositionID == id
      );
      setInitialValues(jobPositionData);

      if (!jobPositionData) router.push("/jobPositions/notFound");
    }
  }, [jobPositions]);

  return (
    <FormikWrapper
      submitForm={submitForm}
      initialValues={initialValues}
      validationSchema={jobPositionsSchema}
      label="Edytuj etat"
    >
      <div className="flex gap-10 w-full">
        <Input name="positionName" label="Wpisz nazwę etatu" />
      </div>
      <div className="flex gap-10 w-full">
        <Input name="minSalary" label="Podaj płacę minimalną" />
        <Input name="maxSalary" label="Podaj płacę maksymalną" />
      </div>
    </FormikWrapper>
  );
};

export default EditJobPosition;
