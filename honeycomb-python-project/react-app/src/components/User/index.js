import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './User.module.css';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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
    <div>
      <h1 className={styles.profileUsernameHeading}>{user.username}'s profile</h1>
      <div className={styles.profileUserInformation}>
        <img className={styles.profileImage} src={user.profile_img_url}></img>
        <p className={styles.profileUsername}>{user.username}</p>
        <p className={styles.profileEmail}>{user.email}</p>
        {/* Display school where user.school_id === school.id */}
      </div>
      <div className={styles.profileEditContainer}>
        <button className={styles.profileEditButton}>Edit Profile</button>
      </div>
      <div className={styles.profileMemberClubs}>
        <h2 className={styles.profileMemberClubsHeading}>Member</h2>
        {/* List clubs that the user is a member of here */}
        {/* joins table? where user.id === tablename users.id*/}
      </div>
    </div>

  );
}
export default User;
