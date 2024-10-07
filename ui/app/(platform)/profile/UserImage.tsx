import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { updateUserPhoto } from "@/app/features/usersSlice";
import Image from "next/image";

const UserImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.users.activeUser);

  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: any) => {
    console.log("Changing the file");
    setFile(() => event.target.files[0]);
  };

  useEffect(() => {
    const handleUpload = () => {
      console.log("Uploading the file");

      if (!file) return;

      const storageRef = ref(storage, `${file.name}`);

      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log("Uploaded a photo!", snapshot);
          dispatch(
            updateUserPhoto({
              id: user?.id,
              newData: { photoURL: snapshot.metadata.fullPath },
            })
          ).then(async () => {
            const userJSON = sessionStorage.getItem("user");
            if (userJSON) {
              const user = JSON.parse(userJSON);
              sessionStorage.setItem(
                "user",
                JSON.stringify({
                  ...user,
                  photoURL: snapshot.metadata.fullPath,
                })
              );
            }
          });
        })
        .catch((error) => {
          console.error("Upload failed", error);
        });
    };
    handleUpload();
  }, [file, dispatch, user]);

  const handleDelete = async () => {
    const res = await dispatch(
      updateUserPhoto({
        id: user?.id,
        newData: { photoURL: null },
      })
    );
    if (res) {
      const userJSON = sessionStorage.getItem("user");
      if (userJSON) {
        const user = JSON.parse(userJSON);
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...user, photoURL: null })
        );
      }

      console.log("Photo has been deleted");
    }
  };

  return (
    <div className={styles.profileImage}>
      {user?.photoURL && (
        <img
          src={`https://firebasestorage.googleapis.com/v0/b/vocal-studio-8e5a9.appspot.com/o/${user?.photoURL}?alt=media&token=02a3aaf8-064c-41a6-8226-9bea6244370b`}
          alt="Profile"
        />
      )}

      <div className={styles.newImageSetting}>
        <label className={styles.customFileUpload}>
          <input
            type="file"
            className={styles.image}
            onChange={handleFileChange}
            accept="image/*"
          />
          <div>Загрузить {user?.photoURL && "новое"} изображение</div>
        </label>
      </div>

      {user?.photoURL && (
        <button onClick={handleDelete} className="button">
          Удалить текущее изображение
        </button>
      )}
    </div>
  );
};

export default UserImage;
