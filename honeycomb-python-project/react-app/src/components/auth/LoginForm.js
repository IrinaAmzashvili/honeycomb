import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './login.css'

const LoginForm = () => {
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
    <div className="login__form__container">
      <div className="login__errors__container">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <form className="login__form" onSubmit={onLogin}>
        <h1 className="login__form__heading">Sign In</h1>
        <div className="login__email__container">
          <input className="login__email" name='email' type='text' placeholder='Email' value={email} onChange={updateEmail}/>
        </div>
        <div className="login__password__container">
          <input className="login__password" name='password' type='password' placeholder='Password' value={password} onChange={updatePassword}/>
        </div>
        <button className="login__submit__button" type='submit'>Login</button>
        <p className="login__no__account">Don't have an account yet?</p>
        <Link className="login__create__here">
        <a className="login__create__here">Create one here</a>
        </Link>

      </form>
    </div>
  );
};

export default LoginForm;
