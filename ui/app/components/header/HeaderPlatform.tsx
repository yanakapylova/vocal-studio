import Link from "next/link";
import { NavPlatform } from "../nav/NavPlatform";
import Image from "next/image";

export const HeaderPlatform = () => {
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
      <NavPlatform />
    </header>
  );
};
