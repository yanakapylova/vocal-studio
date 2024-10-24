import Image from "next/image";
import styles from "./page.module.scss";

const UserImage = ({ user }: any) => {
  return (
    <div className={styles.profileImage}>
      {user?.photoURL && <Image src={user?.photoURL} alt="Profile" />}

      <div className={styles.newImageSetting}>
        <label className={styles.customFileUpload}>
          <input
            type="file"
            className={styles.image}
            // onChange={(e) => updatePhotoURL(e, "update")}
            accept="image/*"
          />
          <div>Загрузить {user?.photoURL && "новое"} изображение</div>
        </label>
      </div>

      {user?.photoURL && (
        <button
          onClick={() => {
            console.log("Изображение удалено");
          }}
          className="button"
        >
          Удалить текущее изображение
        </button>
      )}
    </div>
  );
};

export default UserImage;
