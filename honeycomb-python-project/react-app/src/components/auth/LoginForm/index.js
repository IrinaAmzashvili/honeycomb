import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import styles from './Login.module.css'
// import './login.css'

const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
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
    const demoUser = await dispatch(login('demo@aa.io', 'password'))
    if(demoUser) {
      setErrors(demoUser);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className={styles.login__form__container}>
      <div className={styles.login__errors__container}>
        {errors.map((error, ind) => (
          <div className={styles.inner__errors__error} key={ind}>{error}</div>
        ))}
      </div>
      <form className={styles.login__form} onSubmit={onLogin}>
        <h1 className={styles.login__form__heading}>Sign In</h1>
        <div className={styles.login__email__container}>
          <input className={styles.login__email} name='email' type='text' placeholder='Email' value={email} onChange={updateEmail}/>
        </div>
        <div className={styles.login__password__container}>
          <input className={styles.login__password} name='password' type='password' placeholder='Password' value={password} onChange={updatePassword}/>
        </div>
        <button className={styles.login__submit__button} type='submit'>Login</button>
        <p className={styles.login__no__account}>Don't have an account yet? <Link to="/signup" className={styles.login__create__here}><span>Create one here</span></Link></p>
      </form>
    </div>
    <form onSubmit={demoLogin}>
      <button className={styles.login__no__account__demo}>Login as a <span>Demo user</span></button>
    </form>
    </>
  );
};

export default LoginForm;
