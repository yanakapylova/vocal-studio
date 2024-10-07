import Link from "next/link";
import { NavGeneral } from "../nav/NavGeneral";
import Image from "next/image";

export const HeaderGeneral = () => {
  return (
    <header>
      <Link href="/">
        <Image
          className="logo"
          src="/img/logo.jpg"
          alt=""
          width={45}
          height={45}
        />
      </Link>
      <NavGeneral />
    </header>
  );
};
