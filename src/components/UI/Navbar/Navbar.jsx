import Link from "next/link";

import { FaRegAddressCard } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiBriefcaseAlt } from "react-icons/bi";

const Navbar = ({ active }) => {
  return (
    <nav
      className={`h-fit w-fit px-10 py-2 rounded-b-3xl  flex justify-center gap-10 text-3xl`}
    >
      <Link
        className={`text-emerald-400 transition hover:bg-[#363636] p-5 rounded-3xl ${
          active === "workers" ? "bg-[#363636]" : ""
        }`}
        href="/workers"
        title="Pracownicy"
      >
        <FaRegAddressCard />
      </Link>
      <Link
        className={`text-sky-400  transition hover:bg-[#363636] p-5 rounded-3xl ${
          active === "jobPositions" ? "bg-[#363636]" : ""
        }`}
        href="/jobPositions"
        title="Etaty"
      >
        <BiBriefcaseAlt />
      </Link>
      <Link
        className={`text-yellow-400  transition hover:bg-[#363636] p-5 rounded-3xl ${
          active === "teams" ? "bg-[#363636]" : ""
        }`}
        href="/teams"
        title="Zespoły"
      >
        <FiUsers />
      </Link>
    </nav>
  );
};

export default Navbar;
