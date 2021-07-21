import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleClub, deleteClub } from "../../store/clubs";
import { getMemberships, joinClub, leaveClub } from "../../store/membership";
import styles from "./IndividualClub.module.css";

const IndividualClub = () => {
  const { id } = useParams();
  const club = useSelector((state) => state.clubs.singleClub);
  const sessionUser = useSelector((state) => state.session.user);
  const memberships = useSelector((state) => Object.values(state.memberships));
  const member = memberships.find((joinedClub) => joinedClub?.id === +id);
  const dispatch = useDispatch();
  const history = useHistory();

  // get all memberships
  useEffect(() => {
    dispatch(getMemberships(sessionUser.id));
  }, [dispatch]);

  // join/leave club
  const handleMembership = (e) => {
    e.preventDefault();
    // if user is a member, leave club on click, else join club on click
    if (member) {
      dispatch(leaveClub(id));
      // setMemberStatus(false)
    } else {
      dispatch(joinClub(id));
      // setMemberStatus(true)
    }
  };

  // delete club
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await dispatch(deleteClub(id));
    // if successfully deleted, redirect
    if (res["message"]) {
      history.push("/clubs");
    }
  };

  useEffect(() => {
    dispatch(getSingleClub(parseInt(id)));
  }, [dispatch, id]);

  return (
    <>
      <div className={styles.redCrossBar}></div>
      <div className={styles.clubInfoContainer}>
        <div class={styles.container}>
          <div class={styles.image}>
            <img className={styles.clubImage} src={club?.img_url} />
          </div>
          <div class={styles.clubinfo}>
            <p className={styles.clubName}>{club?.name}</p>
            <button className={styles.joinButton} onClick={handleMembership}>
              {member ? "Leave Club" : "Join Club"}
            </button>
            <p>Organized by (name here)</p>
            <p className={styles.clubDescription}>{club?.description}</p>
            {sessionUser.id === club?.host_id && (
              <div>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualClub;
