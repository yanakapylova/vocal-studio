"use client";

import styles from "./page.module.scss";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";

const Profile = () => {
  return (
    <main>
      <div></div>
      <div className={`wrapper ${styles.wrapperProfile}`}>
        <UserInfo />
        <UserImage />
      </div>
    </main>
  );
};

export default Profile;
