import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";

const NavBar = () => {
  // to update with session user
  const loggedIn = true;

  let sessionLinks;
  if (loggedIn) {
    sessionLinks = (
      <>
        {/* <ProfileButton /> */}
        {/* <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li> */}
        <li>
          <NavLink to='/clubs' exact={true} activeClassName='active'>
            Clubs
          </NavLink>
        </li>
        <li>
          <LogoutButton />
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
          <NavLink to="/sign-up" exact={true} activeClassName="active">
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
