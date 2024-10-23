"use client";

import { useDispatch } from "react-redux";
import styles from "./page.module.scss";
import { AppDispatch } from "@/app/store";
import { signIn } from "@/app/features/usersSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("yana@gmail.com");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <main>
      <div className={`${styles.wrapperLogin} wrapper`}>
        <form
          action="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            const res: any = await dispatch(signIn({ email, password }));

            if (res.payload) {
              if (res.payload.statusCode == 200) {
                router.push("/profile");
              }
            }
          }}
        >
          <input
            required
            type="email"
            className="formFields"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
          <input
            required
            type="password"
            className="formFields"
            placeholder="password"
            onChange={(e) => setPassword(() => e.target.value)}
          />
          <button className="button">Войти</button>
        </form>
      </div>
    </main>
  );
};

export default Login;
