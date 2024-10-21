import styles from "./page.module.scss";

const Media = () => {
  const mediaList = [
    "https://www.youtube.com/embed/GM8N5wum-Jw",
    "https://www.youtube.com/embed/YWmeWtIF83E",
    "https://www.youtube.com/embed/CEY3XnHizAA",
    "https://www.youtube.com/embed/WNMZnKRCgQ4",
    "https://www.youtube.com/embed/QGOhNeNx_jg",
  ];

  return (
    <main>
      <div className={`${styles.wrapperMedia} wrapper grid-with-pictures`}>
        {mediaList.map((src) => (
          <div key={src} className={styles.card}>
            <iframe
              width="560"
              height="315"
              src={src}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ))}
      </div>
      <div></div>
    </main>
  );
};

export default Media;
