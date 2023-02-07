import * as Yup from "yup";

export const workerSchema = (salary) => {
  return Yup.object().shape({
    surname: Yup.string()
      .min(1, "Za krótkie nazwisko.")
      .max(50, "Za długie")
      .required("Nazwisko jest wymagane"),

    name: Yup.string()
      .min(1, "Za krótkie imie.")
      .max(50, "Za długie")
      .required("Imie jest wymagane"),

    bossID: Yup.number().positive("Szef jest wymagany.").required(),
    jobPositionID: Yup.number().positive("Etat jest wymagany.").required(),
    employedSince: Yup.date()
      .typeError("Data pod musi być prawidłową datą.")
      .required("Data zatrudnienia jest wymagana."),
    baseSalary: Yup.number()
      .typeError("Płaca pod musi być liczbą.")
      .positive("Płaca pod nie może być ujemna.")
      .min(
        salary.min,
        `Płaca nie jest w widełkach ${salary.min} - ${salary.max}zł`
      )
      .max(
        salary.max,
        `Płaca nie jest w widełkach ${salary.min} - ${salary.max}zł`
      )
      .required("Płaca pod jest wymagana."),
    bonusSalary: Yup.number()
      .typeError("Płaca dod musi być liczbą.")
      .min(0, "Płaca dod nie może być ujemna."),
    teamID: Yup.number().positive("Oddział jest wymagany.").required(),
  });
};

export const jobPositionsSchema = () => {
  return Yup.object().shape({
    positionName: Yup.string()
      .min(1, "Za krótkie nazwa etatu.")
      .max(50, "Za długa nazwa etatu")
      .required("Nazwa etatu jest wymagana."),

    minSalary: Yup.number()
      .typeError("Płaca minimalna musi być liczbą.")
      .positive("Płaca minimalna nie może być ujemna.")
      .required("Płaca minimalna jest wymagana."),
    maxSalary: Yup.number()
      .typeError("Płaca maksymalna musi być liczbą.")
      .moreThan(
        Yup.ref("minSalary"),
        "Minimalna płaca nie może być większa od maksymalnej"
      )
      .required("Płaca maksymalna jest wymagana."),
  });
};

export const teamsSchema = () => {
  return Yup.object().shape({
    teamName: Yup.string()
      .min(1, "Za krótka nazwa zespołu.")
      .max(50, "Za długa nazwa zespołu")
      .required("Nazwa zespołu jest wymagana."),
    address: Yup.string()
      .min(1, "Za krótki adres.")
      .max(50, "Za długi adres.")
      .required("Adres jest wymagany."),
  });
};
