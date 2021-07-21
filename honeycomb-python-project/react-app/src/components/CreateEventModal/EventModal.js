import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postEvent } from "../../store/Events";


function CreateEvent({ setShowModal }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date_and_time, setDate_and_time] = useState('');
    const [location, setLocation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            name,
            description,
            date_and_time,
            location,
            // add additional variables
        }
        dispatch(postEvent(newEvent))
        setShowModal(false);
    }

    return (

        <>
        </>
    )


}
