import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./User.module.css";
import { getSchool } from "../../store/schools";
import { getMemberships } from "../../store/membership";
import { useDispatch, useSelector } from "react-redux";
import UserModal from "../EditUserModal";
import logo from "../../images/honey-bee-large.png";

function User() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const userSchool = useSelector((state) => Object.values(state.school));
  const school = userSchool.filter((school) => school.id === user.school_id)[0];
  let memberships = useSelector((state) => Object.values(state.memberships));

  // grab hosted clubs
  const hosted = memberships.filter((club) => {
    return club.host_id === sessionUser.id;
  });

  // grab membership clubs
  memberships = memberships.filter((club) => {
    return club.host_id !== sessionUser.id;
  });

  useEffect(() => {
    dispatch(getSchool());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMemberships(sessionUser?.id));
  }, [dispatch, sessionUser.id]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.entireProfileContainer}>
      <h1 className={styles.profileUsernameHeading}>
        {user.username}'s profile
      </h1>
      <div className={styles.profileUserInformation}>
        <div className={styles.profileImageDiv}>
          <img
            className={styles.profileImage}
            src={user.profile_img_url ? user.profile_img_url : logo}
            alt="user profile"
          ></img>
        </div>
        <div className={styles.profileStuffContainer}>
          <p className={styles.profileUsername}>{user.username}</p>
          <p className={styles.profileEmail}>{user.email}</p>
          <p className={styles.profileSchool}>{school?.name}</p>
          <UserModal setUser={setUser} />
        </div>
      </div>
      <hr className={styles.lineBreak}></hr>

      <div className={styles.profileMemberClubs}>
        <div>
          <h2 className={styles.profileMemberClubsHeading}>Host</h2>
          {hosted.map((club, idx) => (
            <div key={idx} className={styles.profileMemberContainer}>
              <div className={styles.clubImgDiv}>
                <img
                  className={styles.profileMemberImg}
                  src={club.img_url}
                  alt="user hosted clubs"
                ></img>
              </div>
              <div>
                <Link to={`/clubs/${club.id}`}>
                  <p className={styles.profileMemberName}>{club.name}</p>
                </Link>
                <p className={styles.profileMemberDesc}>{club.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className={styles.profileMemberClubsHeading}>Member</h2>
          {memberships.map((member, idx) => (
            <div key={idx} className={styles.profileMemberContainer}>
              <div className={styles.clubImgDiv}>
                <img
                  className={styles.profileMemberImg}
                  src={member.img_url}
                  alt="user membership clubs"
                ></img>
              </div>
              <div>
                <Link to={`/clubs/${member.id}`}>
                  <p className={styles.profileMemberName}>{member.name}</p>
                </Link>
                <p className={styles.profileMemberDesc}>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default User;
