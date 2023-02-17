const Home = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-10 text-3xl text-center min-[320px]:max-[800px]:justify-start min-[320px]:max-[800px]:mt-20 min-[320px]:max-[800px]:text-xl">
      <span className="text-emerald-400">
        Aplikacja do zarządzania pracownikami, etatami i zespołami.
      </span>
      <span className="text-emerald-400">
        Aby przemieszczać się po aplikacji używaj nawigacji na górze :)
      </span>
      <span className="font-semibold text-sky-400">
        Maciej Radzimirski 4 Ti
      </span>
    </div>
  );
};

export default Home;
