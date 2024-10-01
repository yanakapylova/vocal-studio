import styles from "./page.module.scss";

const UserInfo = ({ user }: any) => {
  return (
    <div className={styles.profileSettings}>
      <div className={`${styles.field} ${styles.name}`}>
        <div>
          {user?.name} {user?.surname}
        </div>
        <div className={styles.role}>
          {user?.role == "student" ? "Ученик" : "Учитель"}
        </div>
      </div>

      <div className={styles.field}>
        <b>Дата рождения:</b> {user?.birthdate}
      </div>

      <div className={styles.field}>
        <b>E-mail:</b> {user?.email}
      </div>

      <div className={styles.field}>
        <b>Группа:</b> {user?.groups[0].name}
      </div>
    </div>
  );
};

export default UserInfo;
