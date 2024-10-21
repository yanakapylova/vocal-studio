export const userInfo = (props: any) => {
  // const { name, surname, email, role, groups, birthdate } = props.student;
  const { name } = props.student;
  return <div>{name}</div>;
};
