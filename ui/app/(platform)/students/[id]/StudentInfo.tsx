import styles from "./page.module.scss";

export const StudentInfo = ({ data, toggleState }: any) => {
  return (
    <div className={styles.student}>
      <div className={styles.field}>
        <div className={styles.fieldName}>Имя:</div>
        <div className={styles.fieldValue}>{data.name}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Фамилия:</div>
        <div className={styles.fieldValue}>{data.surname}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>E-mail:</div>
        <div className={styles.fieldValue}>{data.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Дата рождения:</div>
        <div className={styles.fieldValue}>{data.birthdate}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Роль:</div>
        <div className={styles.fieldValue}>
          {data.role == "student" ? "Ученик" : "Учитель"}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Группа</div>
        <div className={styles.fieldValue}>{data.groups[0].name}</div>
      </div>

      <button
        className="button"
        onClick={() => {
          toggleState();
        }}
      >
        Редактировать профиль
      </button>
    </div>
  );
};
