import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css';


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
    return <Redirect to='/' />;
  }

  return (
    <form className="signup__form__container" onSubmit={onSignUp}>
      <div className="signup__errors__container">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="signup__username__container">
        <input className="signup__username" type='text' name='username' onChange={updateUsername} value={username}/>
      </div>
      <div className="signup__email__container">
        <input className="signup__email" type='text' name='email' onChange={updateEmail} value={email}/>
      </div>
      <div className="signup__password__container">
        <input className="signup__password" type='password' name='password' onChange={updatePassword} value={password}/>
      </div>
      <div className="signup__confirm__password__container">
        <input className="signup__confirm__password" type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true} />
      </div>
      <button className="signup__submit" type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
