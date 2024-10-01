import Link from "next/link";
import { NavPlatform } from "../nav/NavPlatform";

export const HeaderPlatform = () => {
  return (
    <header>
      <Link href="/">
        <img className="logo" src="/img/logo.jpg" alt="" />
      </Link>
      <NavPlatform />
    </header>
  );
};
