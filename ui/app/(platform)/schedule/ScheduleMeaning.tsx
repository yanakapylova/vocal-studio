import styles from "./page.module.scss";

const ScheduleMeaning = () => {
  return (
    <div className={styles.meaning}>
      <div className={styles.permanent}>
        <div>Постоянные репетиции - </div>
        <div className={styles.meaningColorBlocks}></div>
      </div>
      <div className={styles.additional}>
        <div>Дополнительные репетиции - </div>
        <div className={styles.meaningColorBlocks}></div>
      </div>
      <div className={styles.concert}>
        <div>Концерты - </div>
        <div className={styles.meaningColorBlocks}></div>
      </div>
    </div>
  );
};

export default ScheduleMeaning;
