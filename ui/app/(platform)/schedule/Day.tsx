import styles from "./page.module.scss";
import { EventsList } from "./EventsList";
import { weekdays } from "./constants";

export const Day = ({
  day,
  dayofweek,
  isToday,
  eventsForThisDay,
  user,
}: any) => (
  <div className={styles.day} data-week={weekdays[dayofweek]} data-date={day}>
    <div className={`${styles.date} ${isToday(day) ? styles.today : ""}`}>
      {day}
    </div>

    <EventsList events={eventsForThisDay} user={user} />
  </div>
);
