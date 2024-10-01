import { NavGeneral } from "../nav/NavGeneral";


export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="contacts">
          <div className="name">
            Образцовая шоу-группа "Тип-топ" <br /> и эстрадная студия
            вокала "Crystal"
          </div>
          <div className="address">
            Республика Беларусь, г. Могилёв, <br /> ул. Первомайская, 34
          </div>
          <div className="phone">+375 (29) 744-44-68</div>
          <div className="email">tiptop_crystal@gmail.com</div>
        </div>
        <NavGeneral />
      </div>
    </footer>
  );
};
