import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.module.css';

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
      <h1>{user.username}'s profile</h1>
      <div>
        {/* Display profile image */}
        <img className={} src={user.profile_img_url}></img>
        <p>{user.username}</p>
        <p>{user.email}</p>
        {/* Display school where user.school_id === school.id */}
      </div>
      <div>
        <button>Edit Profile</button>
      </div>
      <div>
        <h2>Member</h2>
        {/* List clubs that the user is a member of here */}
        {/* joins table? where user.id === tablename users.id*/}
      </div>
    </div>

  );
}
export default User;
