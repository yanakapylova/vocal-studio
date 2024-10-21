import { fetchGroups } from "@/app/features/groupsSlice";
import { createSchedule } from "@/app/features/schedulesSlice";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.scss";

const AddScheduleEvent = () => {
  const [place, setPlace] = useState("");
  const [groups, setGroups] = useState<number[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");
  const groupsList = useSelector((state: RootState) => state.groups.entities);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  return (
    <form
      className="addScheduleEvent"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          createSchedule({
            type,
            date,
            time,
            place,
            durationMin: 90,
            activity: note,
            groups,
          })
        );
      }}
    >
      <h2>Добавить событие</h2>

      <div id="groups">
        <span>Выберите группы:</span>
        {groupsList.map((groupItem) => {
          return (
            <div key={groupItem.id}>
              <input
                type="checkbox"
                id={`group-${groupItem.id}`}
                value={groupItem.id}
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
          <div>Тип события</div>
          <select
            name="type"
            id="type"
            required
            onChange={(e) => setType(e.target.value)}
            defaultValue={""}
            className="formFields"
          >
            <option value="" disabled>
              -- Не выбрано --
            </option>
            <option value="additional">Репетиция</option>
            <option value="concert">Концерт</option>
          </select>
        </div>
        <div>
          <div>Дата</div>
          <input
            type="date"
            required
            className="formFields"
            onChange={(e) =>
              setDate(
                e.target.value.slice(8) + "-" + e.target.value.slice(5, 7)
              )
            }
          />
        </div>
        <div>
          <div>Время</div>
          <input
            type="time"
            required
            className="formFields"
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.details}>
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

        <div>
          <div>Заметка</div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
            className="formFields"
          />
        </div>
      </div>
      <button className="button">Добавить</button>
    </form>
  );
};

export default AddScheduleEvent;
