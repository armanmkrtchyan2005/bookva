"use client";

import React, { ChangeEvent, FormEventHandler, useMemo, useState } from "react";
import styles from "./Login.module.css";
import Link from "next/link";

const EMAIL_REGEXP =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    agree: false,
  });

  const isBtnDisabled = useMemo(
    () => !(EMAIL_REGEXP.test(login.email) && login.password && login.agree),
    [login]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(login);
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>Авторизация</h1>
        <form className={styles.login} onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="username"
              name="email"
              value={login.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Пароль"
              autoComplete="current-password"
              name="password"
              value={login.password}
              onChange={handleChange}
            />
          </div>
          <div className="radio-wrapper">
            <input
              name="agree"
              type="radio"
              id="agree"
              value={+login.agree}
              onChange={handleChange}
            />
            <label htmlFor="agree">
              Согласен на обработку персональных данных
            </label>
          </div>
          <div
            style={{
              width: "300px",
              height: "100px",
              backgroundColor: "var(--gray)",
            }}
          >
            Captcha
          </div>
          <button className="btn btn-orange" disabled={isBtnDisabled}>
            Войти
          </button>
        </form>
        <nav className="auth_nav">
          <Link href={"/auth/registration"}>Регистрация</Link>
          <Link href={"/auth/forgot"}>Забыли пароль?</Link>
        </nav>
      </div>
    </div>
  );
};
