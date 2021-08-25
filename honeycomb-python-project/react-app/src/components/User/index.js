import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './User.module.css';
import { getSchool } from '../../store/schools';
import { getMemberships } from '../../store/membership';
import { useDispatch, useSelector } from 'react-redux';
import UserModal from '../EditUserModal'
function User() {
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const userSchool = useSelector(state => Object.values(state.school))
  const memberships = useSelector((state) => Object.values(state.memberships));

  useEffect(() => {
    dispatch(getSchool())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMemberships(sessionUser.id))
  }, [dispatch, sessionUser.id])

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
      <h1 className={styles.profileUsernameHeading}>{user.username}'s profile</h1>
      <div className={styles.profileUserInformation}>
        <img className={styles.profileImage} src={user.profile_img_url} alt='user profile'></img>
        <div className={styles.profileStuffContainer}>
          <p className={styles.profileUsername}>{user.username}</p>
          <p className={styles.profileEmail}>{user.email}</p>
          <p className={styles.profileSchool}>{userSchool[0]?.name}</p>
          <UserModal />
        </div>
      </div>
      <div className={styles.profileMemberClubs}>
        <h2 className={styles.profileMemberClubsHeading}>Member</h2>
        {memberships.map(member => (
          <div className={styles.profileMemberContainer}>
            <img className={styles.profileMemberImg} src={member.img_url} alt='user membership clubs'></img>
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
  );
}
export default User;
