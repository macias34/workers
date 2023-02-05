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
