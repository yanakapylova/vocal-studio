import Link from "next/link";

const navItemsList = {
  "": "О студии",
  team: "Наша команда",
  media: "Галерея",
  contacts: "Контакты",
  login: "Войти"
};

export const NavGeneral = () => {
  return (
    <div className="menu">
      {Object.keys(navItemsList).map((key: string, index: number) => {
        const name: string = navItemsList[key as keyof typeof navItemsList];
        return (
          <Link key={index} href={"/" + key}>
            <div className="menuItem">{name}</div>
          </Link>
        );
      })}
    </div>
  );
};
