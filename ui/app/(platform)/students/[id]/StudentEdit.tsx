"use client";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchGroups } from "@/app/features/groupsSlice";
import { updateUser } from "@/app/features/usersSlice";
import { useRouter } from "next/navigation";

export const StudentEdit = ({ data, toggleState }: any) => {
  const router = useRouter();

  const [name, setName] = useState(data.name);
  const [surname, setSurname] = useState(data.surname);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);
  const [birthdate, setBirthdate] = useState(data.birthdate);
  const [groups, setGroups] = useState(data.groups);

  const groupsList = useSelector((state: RootState) => state.groups.entities);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const [toBeChanged, setToBeChanged] = useState({});

  return (
    <div className={styles.student}>
      <div className={styles.field}>
        <div className={styles.fieldName}>Имя:</div>
        <div className={styles.fieldValue}>
          <input
            type="text"
            value={name}
            className="formFields"
            onChange={(e) => {
              setName(e.target.value);
              setToBeChanged((prev: any) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Фамилия:</div>
        <div className={styles.fieldValue}>
          <input
            type="text"
            value={surname}
            className="formFields"
            onChange={(e) => {
              setSurname(e.target.value);
              setToBeChanged((prev) => {
                return { ...prev, surname: e.target.value };
              });
            }}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>E-mail:</div>
        <div className={styles.fieldValue}>
          <input
            type="email"
            value={email}
            className="formFields"
            onChange={(e) => {
              setEmail(e.target.value);
              setToBeChanged((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Дата рождения:</div>
        <div className={styles.fieldValue}>
          <input
            type="date"
            value={birthdate}
            className="formFields"
            onChange={(e) => {
              setBirthdate(e.target.value);
              setToBeChanged((prev) => {
                return { ...prev, birthdate: e.target.value };
              });
            }}
          />
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Роль:</div>
        <div className={styles.fieldValue}>
          <select
            value={role}
            className="formFields roleInput"
            onChange={(e) => {
              setRole(e.target.value);
              setToBeChanged((prev) => {
                return { ...prev, role: e.target.value };
              });
            }}
          >
            <option value="student">Ученик</option>
            <option value="teacher">Учитель</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldName}>Группа</div>
        <div className={styles.fieldValue}>
          <select
            onChange={(e) => {
              setGroups([e.target.value]);
              setToBeChanged((prev) => {
                return { ...prev, groups: [e.target.value] };
              });
            }}
            className="formFields"
            value={groups[0]?.id}
          >
            {groupsList.map((groupItem) => {
              return (
                <option key={groupItem.id} value={groupItem.id}>
                  {groupItem.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <button
        className="button"
        onClick={async () => {
          await dispatch(updateUser({ id: data.id, newData: toBeChanged }));

          router.refresh();
          toggleState();
        }}
      >
        Сохранить изменения
      </button>
    </div>
  );
};
