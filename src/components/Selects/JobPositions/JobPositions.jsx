import { handleJobPostionChange } from "@/src/helpers/workersHelpers";
import { useGetJobPositionsQuery } from "@/src/features/API/API_jobPositions";
import Select from "../../UI/Select/Select";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import FetchFailed from "../../FetchFailed/FetchFailed";
import { useFormikContext } from "formik";
import { useEffect } from "react";

const JobPositions = ({ setSalary }) => {
  const { jobPositions, status } = useSelector((state) => state.jobPositions);

  const { values } = useFormikContext();
  console.log(values);
  const { jobPositionID } = values;

  useEffect(() => {
    handleJobPostionChange(jobPositionID, jobPositions, setSalary);
  }, [jobPositionID]);

  switch (status) {
    case "rejected":
      return <FetchFailed message="Nie udało się pobrać etatów." />;
    case "pending":
      return <Loading message="Ładowanie etatów.." />;
    case "fulfilled": {
      const fixedJobPositions = jobPositions.map((jobPosition) => {
        const fixedJobPosition = {};
        fixedJobPosition.label = jobPosition.positionName;
        fixedJobPosition.id = parseInt(jobPosition.jobPositionID);

        return fixedJobPosition;
      });
      return (
        <Select
          // onChange={(e) => handleJobPostionChange(e, jobPositions, setSalary)}
          name="jobPositionID"
          options={fixedJobPositions}
          label="Wybierz etat"
        />
      );
    }
  }
};

export default JobPositions;
