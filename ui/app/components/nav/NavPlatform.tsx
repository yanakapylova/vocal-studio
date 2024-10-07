"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <div className={styles.greeting}>
            Привет, {user?.name}!{" "}
            {user?.photoURL && (
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/vocal-studio-8e5a9.appspot.com/o/${user?.photoURL}?alt=media&token=02a3aaf8-064c-41a6-8226-9bea6244370b`}
                alt="Profile"
              />
            )}
          </div>
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
