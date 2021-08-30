import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp, login } from "../../../store/session";
import { getAllSchools } from "../../../store/schools";
import Select from "react-select";
import styles from "./SignUp.module.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [image, setImage] = useState(null);
  const user = useSelector((state) => state.session.user);
  const schools = useSelector((state) => Object.values(state.school));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    let school_id = userSchool.value;
    if (password === repeatPassword) {
      const form_data = new FormData();
      const newUser = {
        username,
        email,
        school_id,
        profile_img_url: image,
        password,
      };
      for (let key in newUser) {
        form_data.append(key, newUser[key]);
      }
      const data = await dispatch(signUp(form_data));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Passwords Do not match"]);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login("demo@aa.io", "password"));
    if (demoUser) {
      setErrors(demoUser);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const schoolNames = () => {
    let list = [];
    for (const school of schools) {
      let obj = {};
      obj["label"] = school.name;
      obj["value"] = school.id;
      list.push(obj);
    }
    return list;
  };

  return (
    <div className={styles.signup__form__entire__container}>
      <form className={styles.signup__form__container} onSubmit={onSignUp}>
        <h1 className={styles.signup__heading}>Sign up</h1>
        <div className={styles.signup__errors__container}>
          {errors.map((error, ind) => (
            <div className={styles.errors} key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className={styles.signup__username__container}>
          <label htmlFor="username">
            <input
              id="username"
              placeholder="Username"
              className={styles.signup__username}
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            />
          </label>
        </div>
        <div className={styles.signup__email__container}>
          <label htmlFor="signupEmail">
            <input
              id="signupEmail"
              placeholder="Email"
              className={styles.signup__email}
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            />
          </label>
        </div>
        <div className={styles.signup__password__container}>
          <label htmlFor="signupPassword">
            <input
              id="signupPassword"
              placeholder="Password"
              className={styles.signup__password}
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            />
          </label>
        </div>
        <div className={styles.signup__confirm__password__container}>
          <label htmlFor="signupPasswordConfirm">
            <input
              id="signupPasswordConfirm"
              placeholder="Confirm password"
              className={styles.signup__confirm__password}
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
            />
          </label>
        </div>
        <div className={styles.signup__school}>
          <label htmlFor="schoolSelect">
            <Select
              id="schoolSelect"
              className={styles.signup__selection}
              placeholder="Select School"
              options={schoolNames()}
              onChange={setUserSchool}
            />
          </label>
        </div>
        <div className={styles.signup__image__container}>
          <label htmlFor="signupImgUrl">
            <p className={styles.profileImgLabel}>Profile image:</p>
            <input
              id="signupImgUrl"
              placeholder="Profile Image Url"
              className={styles.signup__image}
              type="file"
              name="profile_img_url"
              accept="image/*"
              onChange={updateImage}
            />
          </label>
        </div>
        <button className={`cta_button ${styles.signup__submit}`} type="submit">
          Sign Up
        </button>
        <p className={styles.signup__already__have__account}>
          Already have an account?{" "}
          <span>
            <Link to="/login" className={styles.signup__login}>
              Log In
            </Link>
          </span>
        </p>
        <button
          onClick={demoLogin}
          className={`${styles.login__no__account__demo} link-button`}
        >
          Log in as a <span>Demo user</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
