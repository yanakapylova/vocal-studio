"use client";
import { useState } from "react";
import { StudentEdit } from "./StudentEdit";
import { StudentInfo } from "./StudentInfo";

export const StudentPage = ({ data }: any) => {
  const [edit, setEdit] = useState(false);

  const toggleState = function () {
    setEdit((prev: any) => !prev);
  };

  return !edit ? (
    <StudentInfo data={data} toggleState={toggleState} />
  ) : (
    <StudentEdit data={data} toggleState={toggleState} />
  );
};
