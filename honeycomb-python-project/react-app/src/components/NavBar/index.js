import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";
import logo from "../../images/logo.png"
import bee from "../../images/honey-bee.png"
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

  const [showMenu, setShowMenu] = useState(false);

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



  let sessionLinks;
  if (sessionUser) {

    sessionLinks = (
      <>
        <div className={styles.link_container}>
          <div>
            <li>
              <NavLink to='/clubs/' exact={true} activeClassName='active'>
                Clubs
              </NavLink>
            </li>
          </div>
          <div>
            <li>
              <img onClick={openMenu} className={styles.profileImg} src={sessionUser.profile_img_url ? sessionUser.profile_img_url : bee} alt='user profile button'></img>
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
          </div>
        </div>
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
            <img className={styles.logo} src={logo} alt='Honeycomb logo'></img>
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
