import { Form, Formik } from "formik";
import Button from "../UI/Button/Button";

const FormikWrapper = ({
  children,
  submitForm,
  initialValues,
  validationSchema,
  label,
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-20 font-semibold text-emerald-400">{label}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitForm(values)}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        <Form className="flex flex-col items-center gap-10">
          <div className="flex flex-col flex-wrap gap-5 items-center w-full">
            {children}
          </div>
          <Button color="green">{label}</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikWrapper;
