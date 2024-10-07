"use client";
import styles from "./page.module.scss";

const Chat = () => {
  return (
    <main>
      <div className={`${styles.wrapperChat} wrapper`}>
        <div className="posts"></div>
        <form
          onSubmit={() => {
            console.log("Сообщение отправлено");
          }}
        >
          <textarea className="formFields" placeholder="Напишите сообщение" />
          <button className="button">Отправить</button>
        </form>
      </div>
      <div></div>
    </main>
  );
};

export default Chat;
