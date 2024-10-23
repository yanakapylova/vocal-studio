import Link from "next/link";
import { NavGeneral } from "../nav/NavGeneral";

export const HeaderGeneral = () => {
  return (
    <header>
      <Link href="/">
        <img className="logo" src="/img/logo.jpg" alt="" />
      </Link>
      <NavGeneral />
    </header>
  );
};
