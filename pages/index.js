import Link from "next/link";

const Home = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-10 text-3xl">
      <span className="text-emerald-400">
        Aplikacja do zarządzania pracownikami, etatami i zespołami.
      </span>
      <span className="text-emerald-400">
        Aby przemieszczać się po aplikacji używaj nawigacji po lewo :)
      </span>
      <span className="font-semibold text-sky-400">
        Maciej Radzimirski 4 Ti
      </span>
    </div>
  );
};

export default Home;
