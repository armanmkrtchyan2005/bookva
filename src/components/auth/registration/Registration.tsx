"use client";

import Link from "next/link";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import styles from "./Registration.module.css";
import { IRegistration, IRegistrationErrors } from "./Registration.interface";

const EMAIL_REGEXP =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const initialState: IRegistration = {
  email: "",
  surname: "",
  name: "",
  fatherName: "",
  birthday: "",
  nickname: "",
  password: "",
  confirm: "",
  agree: false,
};

export const Registration = () => {
  const [registration, setRegistration] = useState(initialState);
  const [errors, setErrors] = useState<IRegistrationErrors>({});

  const detectError = useCallback((): boolean => {
    const errors: IRegistrationErrors = {};
    if (EMAIL_REGEXP.test(registration.email)) {
      errors.email = "Напашите корректный email";
    }

    if (!registration.surname.trim()) {
      errors.surname = ""; //??????????????????????????????
    }
    return false;
  }, []);

  const isBtnDisabled = useMemo(detectError, [registration, detectError]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegistration((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(registration);
  };

  return (
    <div className={styles.container}>
      <div className={styles.registration_container}>
        <h1>Регистрация</h1>
        <nav className="auth_nav justify_center">
          <Link href={"/auth/login"}>Вход</Link>
        </nav>
        <form className={styles.registration} onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="E-mail*"
              autoComplete="username"
              name="email"
              value={registration.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Фамилия*"
              name="surname"
              value={registration.surname}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Имя*"
              name="name"
              value={registration.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Отчество"
              name="fatherName"
              value={registration.fatherName}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="date"
              placeholder="Дата рождения*"
              name="birthday"
              value={registration.birthday}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Псевдоним"
              name="nickname"
              value={registration.nickname}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Придумайте пароль*"
              name="password"
              value={registration.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Повторите пароль*"
              name="confirm"
              value={registration.confirm}
              onChange={handleChange}
            />
            <p>Минимальное количество символов - 6</p>
          </div>

          <div className="radio-wrapper">
            <input
              name="agree"
              type="radio"
              id="agree"
              value={+registration.agree}
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
      </div>
    </div>
  );
};
