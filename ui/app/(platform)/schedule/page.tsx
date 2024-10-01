"use client";

import styles from "./page.module.scss";
import { getDaysInMonth, getFirstDayOfMonth } from "./getDaysInMonth.js";
import ScheduleMeaning from "./ScheduleMeaning";
import { dynamicSort } from "./sortArrayByElementsProperty";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { deleteSchedule, getSchedule } from "@/app/features/schedulesSlice";
import { AddScheduleTabs } from "./AddSchedule";

const Schedule = () => {
  const months = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const user = useSelector((state: RootState) => state.users.activeUser);
  const schedule = useSelector((state: RootState) => state.schedule.current);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.id) {
      dispatch(getSchedule(user?.id));
    }
  }, [user, dispatch]);

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const generateCalendar = () => {
    const calendar: any = [];
    const weekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    const emptyDaysCount = (firstDayOfWeek + 6) % 7;

    // первая строка: названия дней недели
    weekdays.forEach((weekDay, index) => {
      calendar.push(
        <div key={1000 - index} className={styles.weekDays}>
          {weekDay}
        </div>
      );
    });

    // пустые дни в начале календаря
    for (let day = 0; day < emptyDaysCount; day++) {
      calendar.push(<div key={day - emptyDaysCount}></div>);
    }

    let dayofweek = emptyDaysCount;
    for (let day = 1; day <= daysInMonth; day++) {
      console.log(schedule);

      const permanentEventsForThisDay = schedule.filter((item) => {
        if (item.type === "permanent") {
          return item.date === weekdays[dayofweek];
        }
      });

      const additionalEventsForThisDay = schedule.filter((item) => {
        if (item.type !== "permanent") {
          let [eventDay, eventMonth] = item.date.split("-");

          if (eventDay[0] === "0") {
            eventDay = eventDay[1];
          }

          if (eventMonth[0] === "0") {
            eventMonth = eventMonth[1];
          }

          return (
            day.toString() === eventDay &&
            (currentMonth + 1).toString() === eventMonth
          );
        }
      });

      const eventsForThisDay = [
        ...permanentEventsForThisDay,
        ...additionalEventsForThisDay,
      ];

      calendar.push(
        <div
          key={day - 1}
          className={styles.day}
          data-week={weekdays[dayofweek]}
          data-date={day}
        >
          <div
            className={
              day === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? `${styles.date} ${styles.today}`
                : styles.date
            }
          >
            {day}
          </div>

          {eventsForThisDay.sort(dynamicSort("time")).map((item, index) => {
            const classNames: Record<string, string> = {
              permanent: styles.permanent,
              additional: styles.additional,
              concert: styles.concert,
            };

            const className = classNames[item.type] || "unknown";

            return (
              <div className={className} key={index}>
                <div className={styles.info}>
                  <div className={styles.time}>{item.time}</div>
                  <div className={styles.infoBox}>
                    {user?.role == "teacher" && (
                      <div className={styles.groups}>
                        {item.groups?.map((group) => {
                          return <div>{group.name}</div>;
                        })}
                      </div>
                    )}
                    <div className={styles.activity}>{item.activity}</div>
                    <div className={styles.place}>{item.place}</div>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => dispatch(deleteSchedule(item.id))}
                  >
                    &times; {/* Символ крестика */}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );

      dayofweek++;
      if (dayofweek >= weekdays.length) {
        dayofweek = 0;
      }
    }

    return calendar;
  };

  return (
    <main>
      <div className={`${styles.wrapperSchedule} wrapper`}>
        <ScheduleMeaning />

        <div className={styles.navigation}>
          <button className={styles.arrow} onClick={goToPrevMonth}>
            ❮
          </button>
          <span>{`${months[currentMonth + 1]}, ${currentYear}`}</span>
          <button className={styles.arrow} onClick={goToNextMonth}>
            ❯
          </button>
        </div>

        <div className={styles.calendarGrid}>
          {schedule && generateCalendar()}
        </div>
      </div>
      {user?.role === "teacher" && <AddScheduleTabs />}
    </main>
  );
};

export default Schedule;
