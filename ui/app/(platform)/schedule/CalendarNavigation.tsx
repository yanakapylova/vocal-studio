import styles from "./page.module.scss";

export const CalendarNavigation = ({
  goToPrevMonth,
  goToNextMonth,
  currentMonth,
  currentYear,
  months,
}: any) => {
  return (
    <div className={styles.navigation}>
      <button className={styles.arrow} onClick={goToPrevMonth}>
        ❮
      </button>
      <span>{`${months[currentMonth]}, ${currentYear}`}</span>
      <button className={styles.arrow} onClick={goToNextMonth}>
        ❯
      </button>
    </div>
  );
};
