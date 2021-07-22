import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp, login } from '../../../store/session';

import styles from './SignUp.module.css'
// import './signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login('demo@aa.io', 'password'))
    if(demoUser) {
      setErrors(demoUser);
    }
  }

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
    return <Redirect to='/'/>;
  }

  return (
    <>
      <div className={styles.signup__form__entire__container}>
      <div className={styles.signup__errors__container}>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <form className={styles.signup__form__container} onSubmit={onSignUp}>
          <h1 className={styles.signup__heading}>Sign up</h1>
          <div className={styles.signup__username__container}>
            <input placeholder="Username" className={styles.signup__username} type='text' name='username' onChange={updateUsername} value={username}/>
          </div>
          <div className={styles.signup__email__container}>
            <input placeholder="Email" className={styles.signup__email} type='text' name='email' onChange={updateEmail} value={email}/>
          </div>
          <div className={styles.signup__password__container}>
            <input placeholder="Password" className={styles.signup__password} type='password' name='password' onChange={updatePassword} value={password}/>
          </div>
          <div className={styles.signup__confirm__password__container}>
            <input placeholder="Confirm password" className={styles.signup__confirm__password} type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} />
          </div>
          <button className={styles.signup__submit} type='submit'>Sign Up</button>
          <p className={styles.signup__already__have__account}>Already have an account? <span><Link to="/login" className={styles.signup__login}>Log In</Link></span></p>
          <button onClick={demoLogin} className={`${styles.login__no__account__demo} link-button`}>Log in as a <span>Demo user</span></button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
