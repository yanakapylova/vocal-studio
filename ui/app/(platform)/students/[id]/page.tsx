import { StudentPage } from "./Student";

interface StudentData {
  params: {
    id: string;
  };
}

export default async function Student({ params }: StudentData) {
  const response = await fetch(
    `http://localhost:3008/users/${params.id}?t=${new Date().getTime()}`
  );

  if (!response.ok) {
    return <div>Студент не найден</div>;
  }

  const data = await response.json();

  return <StudentPage data={data} />;
}
