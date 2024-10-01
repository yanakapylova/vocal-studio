"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { createGroup, fetchGroups } from "@/app/features/groupsSlice";
import { createUser, deleteUser, fetchUsers } from "@/app/features/usersSlice";
import { User } from "@/app/features/interfaces/User";
import { Group } from "@/app/features/interfaces/Group";
import Link from "next/link";

const Admin = () => {
  const groupsList = useSelector((state: RootState) => state.groups.entities);
  const usersList = useSelector((state: RootState) => state.users.entities);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (usersList.length > 0 && groupsList.length > 0) {
      groupUsersByGroup(usersList, groupsList);
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
      <div></div>
      <div className={`${styles.wrapperStudents} wrapper`}>
        <div className={styles.students}>
          {usersList &&
            groupsList &&
            Object.keys(groupUsersByGroup(usersList, groupsList)).map(
              (groupName) => {
                const groupedUsers = groupUsersByGroup(usersList, groupsList);

                return groupedUsers[groupName].length == 0 ? (
                  <EmptyGroup groupName={groupName} />
                ) : (
                  <div className={styles.group}>
                    <h2>{groupName}</h2>
                    <ul>
                      {groupedUsers[groupName].map((user: User) => (
                        <li key={user.id}>
                          <Link href={`/students/${user.id}`}>
                            {user.name}{" "}
                            <button
                              onClick={() => dispatch(deleteUser(+user.id))}
                            >
                              X
                            </button>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
            )}
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
