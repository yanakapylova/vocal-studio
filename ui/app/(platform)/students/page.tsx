"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchGroups } from "@/app/features/groupsSlice";
import { deleteUser, fetchUsers } from "@/app/features/usersSlice";
import { User } from "@/app/features/interfaces/User";
import { Group } from "@/app/features/interfaces/Group";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Admin = () => {
  const groupsList = useSelector((state: RootState) => state.groups.entities);
  const usersList = useSelector((state: RootState) => state.users.entities);
  const user = useSelector((state: RootState) => state.users.activeUser);

  const [groupedUsers, setGroupedUsers] = useState(null);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (user?.role !== "teacher") {
    router.push("/profile");
  }

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersList.length > 0 && groupsList.length > 0) {
      setGroupedUsers(groupUsersByGroup(usersList, groupsList));
    }
  }, [usersList, groupsList, dispatch]);

  const groupUsersByGroup = (usersList: User[], groupsList: Group[]) => {
    console.log(usersList);
    console.log(groupsList);

    const groups: any = {};

    for (let i = 0; i < groupsList.length; i++) {
      const groupName = groupsList[i].name;

      groups[groupName] = [];
    }

    usersList.forEach((user) => {
      user.groups.forEach((group) => {
        if (group.name) {
          groups[group.name].push(user);
        }
      });
    });

    return groups;
  };

  return (
    <main>
      <div className={`${styles.wrapperStudents} wrapper`}>
        <Link href="/admin">
          <div className={`${styles.addStudent}`}>Добавить ученика</div>
        </Link>

        <div className={styles.students}>
          {groupedUsers &&
            Object.keys(groupedUsers).map((groupName: string) => {
              const group: any[] = groupedUsers[groupName];

              return group.length == 0 ? (
                <EmptyGroup groupName={groupName} />
              ) : (
                <GroupItem groupedUsers={groupedUsers} groupName={groupName} />
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default Admin;

const EmptyGroup = ({ groupName }: any) => {
  return (
    <div className={styles.group}>
      <h2>{groupName}</h2>
      <div>
        <i>В группе нет учеников</i>
      </div>
    </div>
  );
};

const GroupItem = ({ groupedUsers, groupName }: any) => {
  return (
    <div className={styles.group}>
      <h2>{groupName}</h2>
      <GroupList groupedUsers={groupedUsers} groupName={groupName} />
    </div>
  );
};

const GroupList = ({ groupedUsers, groupName }: any) => {
  return (
    <ul>
      {groupedUsers[groupName].map((user: User) => (
        <StudentItem user={user} key={user.id} />
      ))}
    </ul>
  );
};

const StudentItem = ({ user }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li key={user.id}>
      <Link href={`/students/${user.id}`}>{user.name}</Link>
      <button onClick={() => dispatch(deleteUser(+user.id))}>X</button>
    </li>
  );
};
