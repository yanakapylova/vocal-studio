import { useSelector } from "react-redux";
import styles from "./page.module.scss";
import { RootState } from "@/app/store";

const UserInfo = () => {
  const user = useSelector((state: RootState) => state.users.activeUser);

  return (
    <div className={styles.profileSettings}>
      <div className={`${styles.field} ${styles.name}`}>
        <div>
          {user?.name} {user?.surname} {user?.fathername}
        </div>
        <div className={styles.role}>
          {user?.role == "student"
            ? "Ученик"
            : user?.role == "teacher"
            ? "Учитель"
            : ""}
        </div>
      </div>

      <div className={styles.field}>
        <b>Дата рождения:</b> {user?.birthdate}
      </div>

      <div className={styles.field}>
        <b>Номер телефона:</b> {user?.phone}
      </div>

      <div className={styles.field}>
        <b>Учреждение образования:</b> {user?.school}
      </div>

      <div className={styles.field}>
        <b>Адрес:</b> {user?.address}
      </div>

      <div className={styles.field}>
        <b>Группа:</b> {user?.groups[0].name}
      </div>
    </div>
  );
};

export default UserInfo;
