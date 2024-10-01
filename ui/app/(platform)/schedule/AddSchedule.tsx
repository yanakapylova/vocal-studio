import { useState } from "react";
import styles from "./page.module.scss";
import { AddConstantSchedule } from "./AddConstantSchedule";
import AddScheduleEvent from "./AddScheduleEvent";

export const AddScheduleTabs = () => {
  const [activeTab, setActiveTab] = useState("constant");

  return (
    <div className={styles.addSchedule}>
      <h2>Добавить расписание</h2>

      <div className={styles.tabs}>
        <button
          className={activeTab === "constant" ? styles.active : ""}
          onClick={() => setActiveTab("constant")}
        >
          Постоянное
        </button>
        <button
          className={activeTab === "event" ? styles.active : ""}
          onClick={() => setActiveTab("event")}
        >
          Событие
        </button>
      </div>

      <div className={styles.tab_content}>
        {activeTab === "constant" && <AddConstantSchedule />}
        {activeTab === "event" && <AddScheduleEvent />}
      </div>
    </div>
  );
};
