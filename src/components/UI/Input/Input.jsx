import { ErrorMessage, Field } from "formik";

const Input = ({ type, label, name, onInput }) => {
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  switch (type) {
    case "date": {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label className="text-emerald-400">{label}</label>
          <Field
            name={name}
            type="date"
            className="w-full px-5 py-2 flex items-center justify-center text-lg text-center text-white h-fit bg-transparent border-2 border-emerald-400 outline-none"
          />
          <p className="text-sm text-red-400 font-semibold">
            <ErrorMessage name={name} />
          </p>
        </div>
      );
    }

    default: {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label className="text-emerald-400">{label}</label>
          <Field
            name={name}
            onKeyDown={handleEnter}
            type="text"
            className="w-full px-5 py-2 text-lg text-center border-2 border-emerald-400 bg-transparent outline-none"
            placeholder={label}
            onInput={onInput}
          />
          <p className="text-sm text-red-400 font-semibold">
            <ErrorMessage name={name} />
          </p>
        </div>
      );
    }
  }
};

export default Input;
