interface Schedule {
  day: string;
  time: string;
  place: string;
  durationMin: string;
  activity: string;
}

interface EventProps {
  styles: any;
  item: Schedule;
}

const Event = ({ styles, item }: EventProps) => {
  return (
    <div className={styles.constantRehearsals}>
      <div className={styles.info}>
        <div className={styles.time}>{item.time}</div>
        <div className={styles.infoBox}>
          <div className={styles.place}>{item.place}</div>
        </div>
      </div>
    </div>
  );
};

export default Event;
