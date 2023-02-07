import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Formik, Form } from "formik";
import { useState } from "react";
import { teamsSchema } from "@/src/validation/formSchemas";
import { submitAddTeams } from "@/src/requests/teamsRequests";
import { formInitialValues } from "@/src/constants/teamsConstants";
import { useRouter } from "next/router";

const AddTeam = () => {
  const router = useRouter();

  const initialValues = formInitialValues;
  const AddTeamSchema = teamsSchema();
  const submitForm = async (values) => {
    await submitAddTeams(values)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("/teams");
        }
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-20 font-semibold text-emerald-400">
        Dodaj zespół
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={AddTeamSchema}
      >
        <Form className="flex flex-col items-center gap-10">
          <div className="flex flex-col flex-wrap gap-5 items-center w-full">
            <div className="flex gap-10 w-full">
              <Input name="teamName" label="Podaj nazwę zespołu" />
              <Input name="address" label="Podaj adres" />
            </div>
          </div>
          <Button color="green">Dodaj zespół</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTeam;
