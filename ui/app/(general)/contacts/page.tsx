import styles from "./page.module.scss";



const Contacts = () => {
  return (
    <main>
    <div className={styles.wrapperContacts}>
        <div className={styles.text}>
          <p>
            <b>Как нас найти?</b>
          </p>
          <div>
            РБ, г. Могилев,
            <br />
            ул. Первомайская, 34,
            <br />
            Могилевский городской центр культуры и досуга
          </div>
          <p>
            <b>Как с нами связаться?</b>
          </p>
          <a href="tel:375297444468">
            <div>📞 +375 (29) 744-44-68</div>
          </a>
        </div>
        <iframe
          className={styles.map}
          src="https://yandex.ru/map-widget/v1/?um=constructor%3Abf6a2ad35113445ac100b31a189cc2e804764c5e96f7404e3c62b90a9eb507ad&amp;source=constructor"
          width="500"
          height="400"
          title="map"
        />

    </div>

    <div></div>
  </main>
  );
};

export default Contacts;
