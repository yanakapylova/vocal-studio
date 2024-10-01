"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";

export const NavPlatform = () => {
  const user = useSelector((state: RootState) => state.users.activeUser);
  const router = useRouter();

  const handleSignOut = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
    router.push("/");
  };
  return (
    <div className="menu">
      {user?.role == "teacher" && (
        <Link href={"/students"}>
          <div className="menuItem">Ученики</div>
        </Link>
      )}
      {/* <Link href={"/chat"}>
        <div className="menuItem">Чат</div>
      </Link> */}
      <Link href={"/schedule"}>
        <div className="menuItem">Расписание</div>
      </Link>

      <div className={`${styles.user} menuItem`}>
        <Link href={"/profile"}>
          <div className={styles.greeting}>Привет, {user?.name}!▼</div>
        </Link>
        <div className={styles.userMenu}>
          <button className="button" onClick={handleSignOut}>
            <div className={styles.menuItem}>Выйти</div>
          </button>
        </div>
      </div>
    </div>
  );
};
