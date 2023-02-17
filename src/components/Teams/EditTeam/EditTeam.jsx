import { useState, useEffect } from "react";
import { teamsSchema } from "@/src/validation/formSchemas";
import { submitEditTeams } from "@/src/requests/teamsRequests";
import { useRouter } from "next/router";
import Input from "../../UI/Input/Input";
import FormikWrapper from "../../FormikWrapper/FormikWrapper";
import { teamsValues } from "@/src/constants/formInitialValues";
import { useDispatch, useSelector } from "react-redux";
import { editTeam } from "@/src/features/teams/teamsSlice";
import { showNotification } from "@/src/features/notification/notificationSlice";

const EditTeam = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState(teamsValues);

  const { teams } = useSelector((state) => state.teams);

  const submitForm = async (values) => {
    await submitEditTeams(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch(editTeam(data));
          router.push("/teams");
          dispatch(
            showNotification({
              message: "Udało się edytować zespół!",
              type: "success",
            })
          );
        }
      });
  };

  useEffect(() => {
    if (teams && id) {
      const teamData = teams.find((team) => team.teamID == id);
      setInitialValues(teamData);

      if (!teamData) router.push("/teams/notFound");
    }
  }, [teams]);

  return (
    <FormikWrapper
      submitForm={submitForm}
      initialValues={initialValues}
      validationSchema={teamsSchema}
      label="Edytuj zespół"
    >
      <div className="flex gap-10 w-full">
        <Input name="teamName" label="Podaj nazwę zespołu" />
        <Input name="address" label="Podaj adres" />
      </div>
    </FormikWrapper>
  );
};

export default EditTeam;
