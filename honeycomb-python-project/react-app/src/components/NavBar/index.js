import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import honey from '../../images/honey.png';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // to update with session user
  // const loggedIn = true;

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  console.log('===============================>', sessionUser)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/clubs' exact={true} activeClassName='active'>
            Clubs
          </NavLink>
        </li>
        <li>
          <button onClick={openMenu} className={styles.profile_btn} >
            {/* <img className={styles.bee} src={honey}></img> */}
            {/* <i className="fab fa-forumbee fa-2x"></i> */}
          </button>
          {showMenu && (
            <ul className={styles.profile_dropdown}>
              <li className={styles.user_info}>{sessionUser.username}</li>
              <li className={styles.user_info}>
                <NavLink exact to={`/users/${sessionUser.id}`}>My Profile</NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>

            </ul>
          )}
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarUl}>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Honeycomb Logo
          </NavLink>
        </li>
        <div className={styles.loginSignupDiv}>
          {sessionLinks}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
