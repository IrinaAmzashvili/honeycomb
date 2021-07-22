import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEvent from './EditEventModal'
import styles from './EditEventModal.module.css';


function EventModal({ eventId}) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className={styles.club_button} onClick={() => setShowModal(true)}>Edit an Event</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditEvent eventId={eventId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EventModal;
