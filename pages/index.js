import Link from "next/link";

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-20 text-4xl">
      <Link className="text-emerald-400" href="/workers">
        Pracownicy
      </Link>
      <Link className="text-sky-400" href="/etaty">
        Etaty
      </Link>
      <Link className="text-yellow-400" href="/zespoly">
        Zespoły
      </Link>
    </div>
  );
};

export default Home;
