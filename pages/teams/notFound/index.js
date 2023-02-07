import Button from "@/src/components/UI/Button/Button";
import Link from "next/link";

const teamNotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col gap-20 items-center justify-center">
      <h1 className="text-red-400 text-5xl">Taki zespół nie istnieje.</h1>
      <Button color="green">
        <Link href="/teams">Wróć do listy zespołów.</Link>
      </Button>
    </div>
  );
};

export default teamNotFound;
