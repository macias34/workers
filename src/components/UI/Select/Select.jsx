import { ErrorMessage, Field } from "formik";

const Select = ({ options, label, name, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-emerald-400">{label}</label>
      <Field
        onChange={onChange}
        name={name}
        as="select"
        className="w-full px-5 py-2 text-xl text-center bg-transparent border-2 border-emerald-400 "
      >
        <option value="0" disabled>
          {label}
        </option>
        {options
          ? options.map((option, index) => (
              <option
                key={index}
                className="bg-emerald-600 text-white"
                value={option.id}
              >
                {option.label}
              </option>
            ))
          : ""}
      </Field>
      <p className="text-sm text-red-400 font-semibold">
        <ErrorMessage name={name} />
      </p>
    </div>
  );
};

export default Select;
