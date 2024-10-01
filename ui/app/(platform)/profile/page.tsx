"use client";

import styles from "./page.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";

const Profile = () => {
  const user = useSelector((state: RootState) => state.users.activeUser);

  return (
    <main>
      <div></div>
      <div className={`wrapper ${styles.wrapperProfile}`}>
        <UserInfo user={user} />
        <UserImage user={user} />
      </div>
    </main>
  );
};

export default Profile;
