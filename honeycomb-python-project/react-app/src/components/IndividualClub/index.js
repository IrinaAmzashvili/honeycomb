import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub, deleteClub } from '../../store/clubs';
import { getMemberships, joinClub, leaveClub } from '../../store/membership';
import styles from './IndividualClub.module.css'

const IndividualClub = () => {
    const { id } = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    const user = useSelector(state => state.session.user)
    const memberships = useSelector((state) => Object.values(state.memberships))
    const member = memberships.find(joinedClub => joinedClub?.id === +id)
    const dispatch = useDispatch()
    const history = useHistory()

    // get all memberships
    useEffect(() => {
        dispatch(getMemberships(user.id))
    }, [dispatch])

    // join/leave club
    const handleMembership = (e) => {
        e.preventDefault()
        // if user is a member, leave club on click, else join club on click
        if (member) {
            dispatch(leaveClub(id))
            // setMemberStatus(false)
        } else {
            dispatch(joinClub(id))
            // setMemberStatus(true)
        }
    }

    // delete club
    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await dispatch(deleteClub(id))
        // if successfully deleted, redirect
        if (res['message']) {
            history.push('/clubs')
        }
    }

    useEffect(() => {
        dispatch(getSingleClub(parseInt(id)))
    }, [dispatch, id])

    return (
        <>
            <div className={styles.clubInfoContainer}>
                <p className={styles.clubName}>{club?.name}</p>
                <p className={styles.clubDescription}>{club?.description}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
                <button className={styles.joinClubButton} onClick={handleMembership}>{member ? 'Leave Club' : 'Join Club'}</button>
            </div>
        </>
    )
}

export default IndividualClub;
