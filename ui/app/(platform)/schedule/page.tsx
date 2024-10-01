"use client";

import styles from "./page.module.scss";
import { getDaysInMonth, getFirstDayOfMonth } from "./getDaysInMonth.js";
import ScheduleMeaning from "./ScheduleMeaning";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getSchedule } from "@/app/features/schedulesSlice";
import { AddScheduleTabs } from "./AddSchedule";
import { CalendarNavigation } from "./CalendarNavigation";
import { Day } from "./Day";
import { months, weekdays } from "./constants";

const Schedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const user = useSelector((state: RootState) => state.users.activeUser);
  const schedule = useSelector((state: RootState) => state.schedule.current);

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );
  const firstDayOfWeek = useMemo(
    () => getFirstDayOfMonth(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  // Пустые дни в начале календаря
  const emptyDaysCount = useMemo(
    () => (firstDayOfWeek + 6) % 7,
    [firstDayOfWeek]
  );

  // Определяем количество строк в календаре
  const calendarRows = useMemo(
    () => Math.ceil((daysInMonth + emptyDaysCount) / 7),
    [daysInMonth, emptyDaysCount]
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.id) {
      dispatch(getSchedule(user?.id));
    }
  }, [user, dispatch]);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev)); // Обновляем год при переходе на январь
  }, [currentMonth]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev)); // Обновляем год при переходе на декабрь
  }, [currentMonth]);

  const generateCalendar = () => {
    const calendar: any = [];

    const today = new Date();

    const isToday = (day: number) =>
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();

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
      const eventsForThisDay = schedule.filter((item) => {
        if (item.type === "permanent") {
          return item.date === weekdays[dayofweek];
        } else {
          const [eventDay, eventMonth] = item.date
            .split("-")
            .map((v) => v.replace(/^0/, "")); // Убираем ведущие нули
          return (
            day.toString() === eventDay &&
            (currentMonth + 1).toString() === eventMonth
          );
        }
      });

      calendar.push(
        <Day
          key={day - 1}
          day={day}
          dayofweek={dayofweek}
          isToday={isToday}
          eventsForThisDay={eventsForThisDay}
          user={user}
        />
      );

      dayofweek = (dayofweek + 1) % weekdays.length;
    }

    return calendar;
  };

  return (
    <main>
      <div className={`${styles.wrapperSchedule} wrapper`}>
        <ScheduleMeaning />

        <CalendarNavigation
          goToPrevMonth={goToPrevMonth}
          goToNextMonth={goToNextMonth}
          currentMonth={currentMonth}
          currentYear={currentYear}
          months={months}
        />

        <div
          className={styles.calendarGrid}
          style={{
            gridTemplateRows: `30px repeat(${calendarRows}, calc(55vw / 7))`,
          }}
        >
          {schedule && generateCalendar()}
        </div>
      </div>
      {user?.role === "teacher" && <AddScheduleTabs />}
    </main>
  );
};

export default Schedule;
