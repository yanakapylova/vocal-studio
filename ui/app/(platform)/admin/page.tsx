"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { createGroup, fetchGroups } from "@/app/features/groupsSlice";
import { createUser, deleteUser, fetchUsers } from "@/app/features/usersSlice";
import { useRouter } from "next/navigation";

const Admin = () => {
  const user = useSelector((state: RootState) => state.users.activeUser);
  const router = useRouter();

  if (user?.role !== "teacher") {
    router.push("/profile");
  }

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [groups, setGroups] = useState<number[]>([]);
  const [birthdate, setBirthdate] = useState("");

  const [newGroupName, setNewGroupName] = useState("");

  const groupsList = useSelector((state: RootState) => state.groups.entities);
  const usersList = useSelector((state: RootState) => state.users.entities);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main>
      <div></div>
      <div className={`${styles.wrapperAdmin} wrapper`}>
        <form
          id="addGroup"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Название"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            required
            className="formFields"
          />
          <button
            className="button"
            onClick={() => {
              dispatch(createGroup(newGroupName));
            }}
          >
            Добавить группу
          </button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (groups.length > 0) {
              dispatch(
                createUser({ name, surname, email, role, groups, birthdate })
              ).then((res) => {
                const payload: any = res.payload;
                if (payload[0]) {
                  const checkboxes = document.querySelectorAll(
                    "input[type='checkbox']"
                  ) as NodeListOf<HTMLInputElement>;
                  Array.from(checkboxes).map((checkbox) => {
                    checkbox.checked = false;
                  });
                  setName(() => "");
                  setSurname(() => "");
                  setEmail(() => "");
                  setRole(() => "");
                  setGroups(() => []);
                  setBirthdate(() => "");
                }
              });
            }
          }}
          id="addStudent"
        >
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="formFields"
          />
          <input
            type="text"
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="formFields"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="formFields"
          />
          <select
            name="role"
            className="formFields"
            id="role"
            required
            onChange={(e) => {
              return setRole(e.target.value);
            }}
            defaultValue={""}
            style={{ opacity: role ? 1 : 0.5 }}
          >
            <option value="" disabled>
              -- Не выбрано --
            </option>
            <option value="student">Ученик</option>
            <option value="teacher">Учитель</option>
          </select>

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
                  <label htmlFor={`group-${groupItem.id}`}>
                    {groupItem.name}
                  </label>
                </div>
              );
            })}
          </div>

          <input
            type="date"
            required
            className="formFields"
            onChange={(e) => setBirthdate(e.target.value)}
            style={{ opacity: birthdate ? 1 : 0.5 }}
          />
          <button className="button">Добавить пользователя</button>
        </form>

        <div className="students">
          {usersList.map((user) => (
            <div key={user.id}>
              {user.name} {user.surname}
              <button
                onClick={() => dispatch(deleteUser(+user.id))}
                style={{
                  marginLeft: "8px",
                  background: "red",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </main>
  );
};

export default Admin;
