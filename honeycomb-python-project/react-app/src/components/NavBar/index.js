import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import styles from "./NavBar.module.css";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/logo.png"
const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)

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



  let sessionLinks;
  if (sessionUser) {
    if (sessionUser.profile_img_url) {
      sessionLinks = (
        <>
          <li>
            <NavLink to='/clubs' exact={true} activeClassName='active'>
              Clubs
            </NavLink>
          </li>
          <li>
              <img   onClick={openMenu} className={styles.profileImg} src={sessionUser.profile_img_url}></img>
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
            <NavLink to='/clubs' exact={true} activeClassName='active'>
              Clubs
            </NavLink>
          </li>
          <li>
            <button onClick={openMenu} className={styles.profile_btn}>
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
    }
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


  const history = useHistory();
  const routeChange = () =>{
      console.log("onclick");
      let path = `/`;
      history.push(path);
  }


  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarUl}>
        <li>
          {/* <NavLink to="/" exact={true} activeClassName="active">
            Honeycomb Logo
          </NavLink> */}
          <img class={styles.logo} src={logo}></img>
        </li>
        <div className={styles.loginSignupDiv}>
          {sessionLinks}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
