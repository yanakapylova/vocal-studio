import Image from "next/image";
import styles from "./page.module.scss";

const teamList = [
  {
    title: "Реентович Кристина Николаевна",
    desc: 'Основатель и руководитель образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
    img: "team1.jpeg",
    link: "team1.html",
  },
  {
    title: "Бельская Анна Анатольевна",
    desc: 'Руководитель образцовой шоу-группы "Тип-топ"',
    img: "team2.png",
    link: "team2.html",
  },
  {
    title: "Хореограф",
    desc: 'Хореограф образцовой шоу-группы "Тип-топ" и эстрадной вокальной студии "Crystal"',
    img: "team3.jpeg",
    link: "team3.html",
  },
];

const TeamComponent = (props: {
  link: string;
  img: string;
  title: string;
  desc: string;
}) => {
  return (
    <a className={styles.card} href={props.link}>
      <div className={styles.image}>
        <Image src={"img/team/" + props.img} alt="" />
      </div>
      <div className={styles.name}>{props.title}</div>
      <div className={styles.desc}>{props.desc}</div>
    </a>
  );
};

const Team = () => {
  return (
    <main>
      <div className={styles.wrapperTeam}>
        {teamList.map((teamMember, key) => (
          <TeamComponent
            key={teamMember.title + key}
            title={teamMember.title}
            desc={teamMember.desc}
            img={teamMember.img}
            link={"#"}
          />
        ))}
      </div>
      <div></div>
    </main>
  );
};

export default Team;
