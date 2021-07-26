import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import styles from "./Login.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login("demo@aa.io", "password"));
    if (demoUser) {
      setErrors(demoUser);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={styles.login__form__container}>
        <form className={styles.login__form} onSubmit={onLogin}>
          <h1 className={styles.login__form__heading}>Log In</h1>
          <div className={styles.login__errors__container}>
            {errors.map((error, ind) => (
              <div className={styles.inner__errors__error} key={ind}>
                {error}
              </div>
            ))}
          </div>
          <div className={styles.login__email__container}>
            <label htmlFor='loginEmail'>
              <input
                id='loginEmail'
                className={styles.login__email}
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                />
              </label>
          </div>
          <div className={styles.login__password__container}>
            <label htmlFor='loginPassword'>
              <input
                id='loginPassword'
                className={styles.login__password}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                />
              </label>
          </div>
          <button
            className={`cta_button ${styles.login__submit__button}`}
            type="submit"
          >
            Login
          </button>
          <p className={styles.login__no__account}>
            Don't have an account yet?{" "}
            <Link to="/signup" className={styles.login__create__here}>
              <span>Create one here</span>
            </Link>
          </p>
          <button
            onClick={demoLogin}
            className={`${styles.login__no__account__demo} link-button`}
          >
            Or log in as a <span>Demo user</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
