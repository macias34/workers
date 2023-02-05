import Link from "next/link";

import { FaRegAddressCard } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BiBriefcaseAlt } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className="h-full px-10 shadow-2xl shadow-emerald-400 flex flex-col justify-center gap-20 text-3xl fixed left-0">
      <Link className="text-emerald-400" href="/workers" title="Pracownicy">
        <FaRegAddressCard />
      </Link>
      <Link className="text-sky-400" href="/jobPositions" title="Etaty">
        <BiBriefcaseAlt />
      </Link>
      <Link className="text-yellow-400" href="/teams" title="Zespoły">
        <FiUsers />
      </Link>
    </nav>
  );
};

export default Navbar;
