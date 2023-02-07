import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { teamsSchema } from "@/src/validation/formSchemas";
import { submitEditTeams } from "@/src/requests/teamsRequests";
import { formInitialValues } from "@/src/constants/teamsConstants";
import { useRouter } from "next/router";
import { useGetTeamByIDQuery } from "@/src/features/API_teams";

const EditTeam = () => {
  const router = useRouter();
  const { id } = router.query;

  const [initialValues, setInitialValues] = useState(formInitialValues);

  const {
    data: teamData,
    error: teamErr,
    isLoading: teamIsLoading,
  } = useGetTeamByIDQuery(id ? id : 1, {
    refetchOnMountOrArgChange: true,
  });

  if (teamErr) router.push("/teams/notFound");

  const AddTeamSchema = teamsSchema();
  const submitForm = async (values) => {
    await submitEditTeams(values, id)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/teams");
        }
      });
  };

  useEffect(() => {
    if (teamData) {
      setInitialValues(teamData);
    }
  }, [teamData]);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-20 font-semibold text-emerald-400">
        Edytuj zespół
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddTeamSchema}
        enableReinitialize={true}
      >
        <Form className="flex flex-col items-center gap-10">
          <div className="flex flex-col flex-wrap gap-5 items-center w-full">
            <div className="flex gap-10 w-full">
              <Input name="teamName" label="Podaj nazwę zespołu" />
              <Input name="address" label="Podaj adres" />
            </div>
          </div>
          <Button color="green">Edytuj zespół</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditTeam;
