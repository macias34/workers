import Input from "../../UI/Input/Input";
import { jobPositionsSchema } from "@/src/validation/formSchemas";
import { submitAddJobPosition } from "@/src/requests/jobPositionsRequests";
import { useRouter } from "next/router";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { jobPositionsValues } from "@/src/constants/formInitialValues";
import { useDispatch } from "react-redux";
import { addJobPosition } from "@/src/features/jobPositions/jobPositionsSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const AddJobPosition = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const submitForm = async (values) => {
    await submitAddJobPosition(values)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(addJobPosition(data));
          router.push("/jobPositions");
          dispatch(
            showNotification({
              type: "success",
              message: "Udało się dodać nowy etat!",
            })
          );
        }
      });
  };

  return (
    <FormikWrapper
      submitForm={submitForm}
      validationSchema={jobPositionsSchema}
      initialValues={jobPositionsValues}
      label="Dodaj etat"
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

export default AddJobPosition;
