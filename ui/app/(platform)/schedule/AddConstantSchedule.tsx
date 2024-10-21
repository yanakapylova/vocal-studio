import { fetchGroups } from "@/app/features/groupsSlice";
import { createSchedule } from "@/app/features/schedulesSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.scss";

export const AddConstantSchedule = () => {
  const [groups, setGroups] = useState<number[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("");
  const [durationMin, setDurationMin] = useState(0);
  const [place, setPlace] = useState("");

  const groupsList = useSelector((state: RootState) => state.groups.entities);

  const weekdays = {
    Понедельник: "ПН",
    Вторник: "ВТ",
    Среда: "СР",
    Четверг: "ЧТ",
    Пятница: "ПТ",
    Суббота: "СБ",
    Воскресенье: "ВС",
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <form
      className="addConstantSchedule"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          createSchedule({
            type: "permanent",
            date,
            time,
            place,
            durationMin,
            activity,
            groups,
          })
        );
      }}
    >

      <div id="groups">
        <span>Выберите группы:</span>
        {groupsList.map((groupItem) => {
          return (
            <div key={groupItem.id}>
              <input
                type="checkbox"
                id={`group-${groupItem.id}`}
                value={groupItem.id}
                // checked={groups.includes(groupItem.id)} // Устанавливаем состояние чекбокса
                onChange={(e) => {
                  // Здесь можно управлять состоянием выбранных групп
                  if (e.target.checked) {
                    setGroups((prev) => [...prev, groupItem.id]); // добавляем выбранную группу
                  } else {
                    setGroups((prev) =>
                      prev.filter((id) => id !== groupItem.id)
                    ); // удаляем группу
                  }
                }}
              />
              <label htmlFor={`group-${groupItem.id}`}>{groupItem.name}</label>
            </div>
          );
        })}
      </div>

      <div className={styles.time}>
        <div>
          <div>День недели</div>
          <select
            id="date"
            required
            onChange={(e) => setDate(e.target.value)}
            defaultValue={""}
            className="formFields"
          >
            <option value="" disabled>
              -- Не выбрано --
            </option>
            {Object.keys(weekdays).map((weekday, index) => {
              return (
                <option
                  value={weekdays[weekday as keyof typeof weekdays]}
                  key={index}
                >
                  {weekday}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <div>Время</div>
          <input
            type="time"
            required
            className="formFields"
            onChange={(e) => setTime(e.target.value)}
          />{" "}
        </div>

        <div>
          <div>Длительность в минутах</div>
          <input
            type="text"
            value={durationMin}
            onChange={(e) => setDurationMin(+e.target.value)}
            required
            className="formFields"
          />
        </div>
      </div>

      <div className={styles.details}>
        <div>
          <div>Тип занятия</div>
          <select
            id="activity"
            required
            onChange={(e) => setActivity(e.target.value)}
            defaultValue={""}
            className="formFields"
          >
            <option value="" disabled>
              -- Не выбрано --
            </option>
            <option value="Вокал">Вокал</option>;
            <option value="Хореография">Хореография</option>;
          </select>
        </div>

        <div>
          <div>Место</div>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            className="formFields"
          />
        </div>
      </div>

      <button className="button">Добавить</button>
    </form>
  );
};
