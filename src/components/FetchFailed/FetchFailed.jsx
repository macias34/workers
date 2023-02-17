import Button from "@/src/components/UI/Button/Button";
const FetchFailed = ({ message }) => {
  return (
    <div className="h-screen w-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="text-red-400 text-3xl">{message}</h1>
    </div>
  );
};

export default FetchFailed;
