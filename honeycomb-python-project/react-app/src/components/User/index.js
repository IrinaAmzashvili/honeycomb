import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './User.module.css';
// import { getSchool } from '../../store/user';
import { getSchool } from '../../store/schools';
import { getMemberships } from '../../store/membership';
import { useDispatch, useSelector } from 'react-redux';
function User() {
  const clubs = useSelector(state => state.clubs)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const userSchool = useSelector(state => Object.values(state.school))
  const memberships = useSelector((state) => Object.values(state.memberships));
  // const member = memberships.find((joinedClub) => joinedClub?.id === user?.id);

  // console.log('MEMBER INFORMATION', member)


  useEffect(() => {
    dispatch(getSchool())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMemberships(sessionUser.id))
  }, [dispatch])

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
  console.log('USER INFORMATION', userSchool[0])

  return (
    <div className={styles.entireProfileContainer}>
      <h1 className={styles.profileUsernameHeading}>{user.username}'s profile</h1>
      <div className={styles.profileUserInformation}>
        <img className={styles.profileImage} src={user.profile_img_url}></img>
        <div className={styles.profileStuffContainer}>
          <p className={styles.profileUsername}>{user.username}</p>
          <p className={styles.profileEmail}>{user.email}</p>
          <p className={styles.profileSchool}>{userSchool[0]?.name}</p>
          <button className={styles.profileEditButton}>Edit Profile</button>
        </div>
      </div>
      <div className={styles.profileMemberClubs}>
        <h2 className={styles.profileMemberClubsHeading}>Member</h2>
        {memberships.map(member => (
          <div className={styles.profileMemberContainer}>
            {/* {console.log(member)} */}
            <img className={styles.profileMemberImg} src={member.img_url}></img>
            <div>
              <Link to={`/clubs/${member.id}`}>
                <p className={styles.profileMemberName}>{member.name}</p>
              </Link>
              <p className={styles.profileMemberDesc}>{member.description}</p>
            </div>
          </div>
        ))}
        {/* <p>{member?.name}</p> */}

        {/* <p>{member?.name}</p> */}
        {/* <p>{member?.description}</p> */}
        {/* List clubs that the user is a member of here */}
        {/* joins table? where user.id === tablename users.id*/}
      </div>
    </div>
  );
}
export default User;
