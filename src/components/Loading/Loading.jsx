import ReactLoading from "react-loading";

const Loading = ({ message }) => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <ReactLoading type="bubbles" color="#FACC15" />
      <span className="text-yellow-400 text-xl font-semibold">{message}</span>
    </div>
  );
};

export default Loading;
