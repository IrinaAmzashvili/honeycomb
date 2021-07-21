import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleClub, deleteClub } from '../../store/clubs';
import { getMemberships, joinClub, leaveClub } from '../../store/membership';
import styles from './IndividualClub.module.css'

const IndividualClub = () => {
    const { id } = useParams();
    const club = useSelector(state => state.clubs.singleClub)
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    // Plan
    // query to get all memberships
    useEffect(() => {
        dispatch(getMemberships(user.id))
    }, [dispatch])

    const memb = useSelector((state) => Object.values(state.memberships))
    console.log('membership store-->', memb)
    // grab current member, find if member, set memberStatus accordingly
    // const memberships = useSelector((state) => state.session.user.memberships)
    // const member = memberships.find(joinedClub => joinedClub === club?.id)
    const member = memb.find(joinedClub => joinedClub === id)
    // const [memberStatus, setMemberStatus] = useState(member ? true : false)
    // const [memberStatus, setMemberStatus] = useState(false)

    // console.log(member ? true : false, memberships, member)
    // useEffect(() => {
    //     // if user is/is not a member, set accordingly
    //     // so button can display the right text
    //     if (member) {
    //         setMemberStatus(true)
    //     } else {
    //         setMemberStatus(false)
    //     }
    // }, [setMemberStatus, member, memberships])

    console.log(member ? 'Leave Club' : 'Join Club')
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
    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteClub(id))
        // include error handling: if result.message is true, proceed (might be an issue that backend True is capitalized)
        history.push('/clubs')
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
