import { teamsSchema } from "@/src/validation/formSchemas";
import { submitAddTeams } from "@/src/requests/teamsRequests";
import { teamsValues } from "@/src/constants/formInitialValues";
import { useRouter } from "next/router";
import Input from "../../UI/Input/Input";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { useDispatch } from "react-redux";
import { addTeam } from "@/src/features/teams/teamsSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const AddTeam = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const submitForm = async (values) => {
    await submitAddTeams(values)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/teams");
          dispatch(addTeam(data));
          dispatch(
            showNotification({
              type: "success",
              message: "Udało się dodać nowy zespół!",
            })
          );
        }
      });
  };

  return (
    <FormikWrapper
      initialValues={teamsValues}
      submitForm={submitForm}
      validationSchema={teamsSchema}
      label="Dodaj zespół"
    >
      <div className="flex gap-10 w-full">
        <Input name="teamName" label="Podaj nazwę zespołu" />
        <Input name="address" label="Podaj adres" />
      </div>
    </FormikWrapper>
  );
};

export default AddTeam;
